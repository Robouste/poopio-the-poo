import { AnchorComp, AudioPlay, GameObj, PosComp, TextComp } from "kaplay";
import { SceneName } from "../enums";
import { SoundTag } from "../enums/sound.enum";
import { GameHelper } from "../game.helper";
import { Bean } from "../objects/bean.class";

export class GameOverScene {
	private _gameOverText: GameObj<TextComp | PosComp | AnchorComp>;
	private _scoreText: GameObj<TextComp | PosComp | AnchorComp>;
	private _gameOverSound: AudioPlay;

	constructor(bean: Bean) {
		GameHelper.addBackground();

		this._gameOverSound = play(SoundTag.GAME_OVER);

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
			pos(this._scoreText.pos.x, this._scoreText.pos.y + 60),
			anchor("center"),
			area(),
			color(255, 255, 255),
		]);

		const textObj = add([
			text("Restart"),
			pos(button.pos.x, button.pos.y + 4),
			color(52, 143, 235),
			anchor("center"),
		]);

		button.onHover(() => {
			setCursor("pointer");
			button.color = new Color(52, 143, 235);
			textObj.color = new Color(255, 255, 255);
		});

		button.onHoverEnd(() => {
			setCursor("default");
			button.color = new Color(255, 255, 255);
			textObj.color = new Color(52, 143, 235);
		});

		button.onClick(() => {
			this._gameOverSound.stop();
			go(SceneName.GAME);
		});
	}
}
