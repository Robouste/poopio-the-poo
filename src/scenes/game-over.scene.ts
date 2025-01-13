import { AnchorComp, AudioPlay, GameObj, PosComp, TextComp } from "kaplay";
import { Config } from "../configs";
import { SceneName, SoundTag, SpriteName } from "../enums";
import { GameHelper } from "../helpers";

export class GameOverScene {
	private _scoreText: GameObj<TextComp | PosComp | AnchorComp>;
	private _bestScoreText: GameObj<TextComp | PosComp | AnchorComp>;
	private _gameOverSound: AudioPlay;

	constructor(score: number, bgm: AudioPlay | undefined) {
		GameHelper.addBackground(Config.containercolor);
		bgm?.stop();

		this._gameOverSound = play(SoundTag.GAME_OVER);

		const gameOverSprite = add([
			sprite(SpriteName.GAME_OVER, {
				height: 292,
			}),
			pos(center()),
			anchor("center"),
		]);

		this._scoreText = add([
			text(`Score: ${score}`),
			pos(gameOverSprite.pos.x, gameOverSprite.pos.y + 292 / 2 + 48),
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
		const restartButton = add([
			sprite(SpriteName.BUTTON, {
				width: 196,
			}),
			area(),
			pos(width() / 2, this._bestScoreText.pos.y + 96),
			anchor("center"),
		]);

		restartButton.add([
			text("Restart", {
				size: 24,
			}),
			pos(0, 0),
			anchor("center"),
		]);

		restartButton.onHover(() => {
			setCursor("pointer");
			restartButton.use(opacity(0.8));
		});

		restartButton.onHoverEnd(() => {
			setCursor("default");
			restartButton.use(opacity(1));
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
