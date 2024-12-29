import { AnchorComp, AudioPlay, GameObj, PosComp, TextComp } from "kaplay";
import { PRIMARY_COLOR } from "../constants";
import { SceneName } from "../enums";
import { SoundTag } from "../enums/sound.enum";
import { GameHelper } from "../game.helper";

export class GameOverScene {
	private _gameOverText: GameObj<TextComp | PosComp | AnchorComp>;
	private _scoreText: GameObj<TextComp | PosComp | AnchorComp>;
	private _gameOverSound: AudioPlay;

	constructor(score: number) {
		GameHelper.addBackground();

		this._gameOverSound = play(SoundTag.GAME_OVER);

		this._gameOverText = add([
			text("Game Over"),
			pos(center()),
			anchor("center"),
		]);

		this._scoreText = add([
			text(`Score: ${score}`),
			pos(this._gameOverText.pos.x, this._gameOverText.pos.y + 48),
			anchor("center"),
		]);

		this.addRestartButton();
	}

	private addRestartButton(): void {
		GameHelper.createButton({
			width: 200,
			height: 48,
			primaryColor: new Color(...PRIMARY_COLOR),
			secondaryColor: new Color(255, 255, 255),
			posX: this._scoreText.pos.x,
			posY: this._scoreText.pos.y + 60,
			text: "Restart",
			anchor: "center",
			onClick: () => {
				this._gameOverSound.stop();
				go(SceneName.GAME);
			},
		});
	}
}
