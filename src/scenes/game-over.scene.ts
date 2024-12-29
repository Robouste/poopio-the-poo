import { AnchorComp, GameObj, PosComp, TextComp } from "kaplay";
import { SceneName } from "../enums";
import { SoundTag } from "../enums/sound.enum";
import { GameHelper } from "../game.helper";
import { Bean } from "../objects/bean.class";

export class GameOverScene {
	private _gameOverText: GameObj<TextComp | PosComp | AnchorComp>;
	private _scoreText: GameObj<TextComp | PosComp | AnchorComp>;

	constructor(bean: Bean) {
		GameHelper.addBackground();

		play(SoundTag.GAME_OVER);

		this._gameOverText = add([
			text("Game Over"),
			pos(center()),
			anchor("center"),
		]);

		this._scoreText = add([
			text(`Score: ${bean.score}`),
			pos(this._gameOverText.pos.x, this._gameOverText.pos.y + 48),
			anchor("center"),
		]);

		this.addRestartButton();
	}

	private addRestartButton(): void {
		const button = add([
			rect(200, 48),
			outline(4, new Color(255, 255, 255)),
			pos(this._scoreText.pos.x, this._scoreText.pos.y + 48),
			anchor("center"),
			area(),
		]);

		add([
			text("Restart"),
			pos(button.pos.x, button.pos.y + 4),
			color(0, 0, 0),
			anchor("center"),
		]);

		button.onClick(() => go(SceneName.GAME));
	}
}
