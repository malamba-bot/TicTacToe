package us.drullk.tictactoe.components;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import us.drullk.tictactoe.components.repository.PlayerRepository;
import us.drullk.tictactoe.entity.Player;

import java.io.IOException;
import java.util.Optional;

@Component
public class GithubBasedOAuthUserHandler extends SavedRequestAwareAuthenticationSuccessHandler {

	public final Logger logger = LoggerFactory.getLogger(GithubBasedOAuthUserHandler.class);

	private final PlayerRepository panelUserRepository;

	public GithubBasedOAuthUserHandler(@Value("${auth.target-url}") String targetUrl, PlayerRepository panelUserRepository) {
		this.panelUserRepository = panelUserRepository;

		this.setDefaultTargetUrl(targetUrl);
		this.setAlwaysUseDefaultTargetUrl(true);
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		super.onAuthenticationSuccess(request, response, authentication);

		Object principal = authentication.getPrincipal();
		if (principal instanceof OAuth2User authUser) {
			Optional<Player> userFromToken = this.panelUserRepository.findByPrincipal(authUser);

			if (userFromToken.isEmpty()) {
				Integer oauthKey = authUser.getAttribute("id");
				String name = authUser.getAttribute("login");

				if (oauthKey == null) {
					throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Incomplete OAuth2 credentials");
				}

				this.panelUserRepository.save(new Player(oauthKey.toString(), name));
			}
		} else {
			this.logger.warn("User authenticated without OAuth2User: {}", principal);
		}
	}

}
