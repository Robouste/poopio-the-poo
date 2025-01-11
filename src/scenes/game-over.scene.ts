import { AnchorComp, AudioPlay, GameObj, PosComp, TextComp } from "kaplay";
import { PRIMARY_COLOR } from "../constants";
import { SceneName } from "../enums";
import { SoundTag } from "../enums/sound.enum";
import { GameHelper } from "../game.helper";

export class GameOverScene {
	private _gameOverText: GameObj<TextComp | PosComp | AnchorComp>;
	private _scoreText: GameObj<TextComp | PosComp | AnchorComp>;
	private _bestScoreText: GameObj<TextComp | PosComp | AnchorComp>;
	private _gameOverSound: AudioPlay;

	constructor(score: number, bgm: AudioPlay | undefined) {
		GameHelper.addBackground();
		bgm?.stop();

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

		let currentBest = this.getBestScore();
		let scoreBeaten = false;

		if (score > currentBest) {
			this.saveScore(score);
			currentBest = score;
			scoreBeaten = true;
		}

		this._bestScoreText = add([
			text(`Best: ${currentBest}${scoreBeaten ? " (New !)" : ""}`),
			pos(this._scoreText.pos.x, this._scoreText.pos.y + 48),
			anchor("center"),
		]);

		this.addRestartButton();

		wait(1, () => {
			onKeyPress(["space", "escape", "enter"], () => this.restart());
			onTouchStart(() => this.restart());
		});
	}

	private addRestartButton(): void {
		GameHelper.makeButton({
			width: 200,
			height: 48,
			primaryColor: PRIMARY_COLOR,
			secondaryColor: new Color(255, 255, 255),
			posX: this._scoreText.pos.x,
			posY: this._bestScoreText.pos.y + 60,
			text: "Restart",
			anchor: "center",
			onClick: () => this.restart(),
		});
	}

	private restart(): void {
		this._gameOverSound.stop();
		go(SceneName.GAME);
	}

	private saveScore(score: number): void {
		localStorage.setItem("score", score.toString());
	}

	private getBestScore(): number {
		const score = localStorage.getItem("score");
		return score ? parseInt(score, 10) : 0;
	}
}
