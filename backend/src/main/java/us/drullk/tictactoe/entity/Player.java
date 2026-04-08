package us.drullk.tictactoe.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

/**
 * Database POJO model representing an authenticated Player.
 */
@Entity
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Player {

	public Player(String oauthKey, String displayName) {
		this.oauthKey = oauthKey;
		this.displayName = displayName;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	private String oauthKey;

	@Setter
	private String displayName;

}
