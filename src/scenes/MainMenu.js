import {globals} from '../main.js'

export class MainMenu extends Phaser.Scene {

    constructor() {
        super('mainMenuScene');
    }

    create() {
        this.createButton('Local Multiplayer', globals.width * 0.5, globals.board_height * 0.45, {}, this.startLocalGame);

        if (globals.remote_play_domains.has(window.location.hostname)) {
            if (this.hasAuthCookie()) {
                // FIXME write multiplayer adapter into data param
                this.createButton('Remote Multiplayer (Not yet implemented)', globals.width * 0.5, globals.board_height * 0.55, {}, this.startRemoteGame);

                // If running from VS Code Live server, this will fail due to CORS
                //  Not sure how to get around that
                this.checkOnlineStatus(json => console.log(json));
            } else {
                this.createButton('Authenticate with Github to play Remote Multiplayer', globals.width * 0.5, globals.board_height * 0.55, {}, this.openAuth);
            }
        }
    }

    startLocalGame() {
        this.scene.start('playScene', {});
    }

    startRemoteGame() {
        this.scene.start('playScene', {});
    }

    checkOnlineStatus(onResponse) {
        fetch(`${globals.api_url}/actuator/health`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => onResponse(response.json));
    }

    openAuth() {
        window.location.href = `${globals.api_url}/oauth2/authorization/github`;
    }

    hasAuthCookie() {
        return document.cookie.includes('JSESSIONID=');
    }

}
