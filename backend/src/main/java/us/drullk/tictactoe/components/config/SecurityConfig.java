package us.drullk.tictactoe.components.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import us.drullk.tictactoe.components.GithubBasedOAuthUserHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private final GithubBasedOAuthUserHandler githubBasedOAuthUserHandler;

	public SecurityConfig(GithubBasedOAuthUserHandler githubBasedOAuthUserHandler) {
		this.githubBasedOAuthUserHandler = githubBasedOAuthUserHandler;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(@Value("${auth.target-url}") String targetUrl, HttpSecurity http) throws Exception {
		http.authorizeHttpRequests(authorizeRequests -> authorizeRequests
				.requestMatchers("/", "/error", "/oauth2", "/oauth2/**", "/actuator/health").permitAll()
				.anyRequest().authenticated()
		).csrf(AbstractHttpConfigurer::disable).cors(AbstractHttpConfigurer::disable).oauth2Login(oauthConfig -> oauthConfig
				.loginPage("/oauth2/authorization/github")
				.defaultSuccessUrl(targetUrl, true)
				.successHandler(this.githubBasedOAuthUserHandler)
		).logout(httpSecurityLogoutConfigurer -> httpSecurityLogoutConfigurer
				.invalidateHttpSession(true)
				.deleteCookies("JSESSIONID")
		);

		return http.build();
	}

}
