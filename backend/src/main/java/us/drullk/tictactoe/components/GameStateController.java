package us.drullk.tictactoe.components;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import us.drullk.api.GameApi;
import us.drullk.model.BoardState;
import us.drullk.model.PlayerAction;

@RestController
public class GameStateController implements GameApi {

	// Example request:
	//  curl -X GET localhost:8080/game/state
	@Override
	public ResponseEntity<BoardState> gameStateGet() {
		throw new ResponseStatusException(HttpStatus.NOT_IMPLEMENTED);
	}

	// Example request:
	//  curl -X PATCH localhost:8080/game/state -H "Content-Type: application/json" -d '{ "x-coordinate":1, "y-coordinate":1 }'
	@Override
	public ResponseEntity<BoardState> gameStatePatch(PlayerAction playerAction) {
		throw new ResponseStatusException(HttpStatus.NOT_IMPLEMENTED);
	}

}
