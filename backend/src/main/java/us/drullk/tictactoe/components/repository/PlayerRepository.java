package us.drullk.tictactoe.components.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.server.ResponseStatusException;
import us.drullk.tictactoe.entity.Player;

import java.util.List;
import java.util.Optional;

public interface PlayerRepository extends CrudRepository<Player, Long> {

	Optional<Player> findByOauthKey(String oauthToken);

	List<Player> findByDisplayName(String displayName);

	default Optional<Player> findByPrincipal(OAuth2User oAuth2User) {
		Integer id = oAuth2User.<Integer>getAttribute("id");

		if (id == null) {
			return Optional.empty();
		}

		return this.findByOauthKey(String.valueOf(id));
	}

    default Player getUserAssertAuthenticated(OAuth2User oAuthUser) {
        Optional<Player> user = this.findByPrincipal(oAuthUser);

        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "OAuth2User does not have credentials");
        }

        return user.get();
    }

}
