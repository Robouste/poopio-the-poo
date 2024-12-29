import { SoundTag } from "../enums/sound.enum";
import { GameHelper } from "../game.helper";
import { Bean } from "../objects/bean.class";

export class GameOverScene {
	constructor(bean: Bean) {
		GameHelper.addBackground();

		play(SoundTag.GAME_OVER);

		const gameOverText = add([
			text("Game Over"),
			pos(center()),
			anchor("center"),
		]);

		add([
			text(`Score: ${bean.score}`),
			pos(gameOverText.pos.x, gameOverText.pos.y + 48),
			anchor("center"),
		]);
	}
}
