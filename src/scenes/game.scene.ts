import {
	AudioPlay,
	ColorComp,
	EmptyComp,
	GameObj,
	PosComp,
	SpriteComp,
	TextComp,
} from "kaplay";
import { getDifficultyConfig } from "../configs/difficulty.config";
import {
	getDesktopGameConfig,
	getMobileGameConfig,
} from "../configs/game.config";
import { SceneName } from "../enums";
import { GameSceneTag } from "../enums/game-scene-tag.enum";
import { Music } from "../enums/music.enum";
import { SoundTag } from "../enums/sound.enum";
import { SpriteName } from "../enums/sprite-name.enum";
import { DebugHelper } from "../helpers/debug.helper";
import { Dragon } from "../objects/ennemies/dragon.class";
import { Obsticle } from "../objects/ennemies/obsticle.class";
import { Ground } from "../objects/gound.object";
import { Player } from "../objects/player.class";
import { DifficultyLevel } from "../types/difficulty-level.type";
import { ObsticleComp } from "../types/ennemy.type";
import { GameConfig } from "../types/game-config.type";

type Cloud = GameObj<PosComp | SpriteComp | EmptyComp>;

export class GameScene {
	private _score = 0;
	public get score(): string {
		return this._score.toString();
	}
	public set score(value: number) {
		this._score = value;
	}

	private _config: GameConfig = DebugHelper.isMobile
		? getMobileGameConfig()
		: getDesktopGameConfig();

	private _background: GameObj<ColorComp | SpriteComp>;
	private _bgm: AudioPlay;
	private _player: Player = new Player();
	private _level: DifficultyLevel = add([
		GameSceneTag.LEVEL,
		{
			value: 1,
		},
	]);
	private _levelLabel: GameObj<PosComp | TextComp>;
	private get _difficultySpeed(): number {
		return 300 + this._level.value * 100;
	}

	constructor() {
		this.addBackground();

		this._levelLabel = add([
			text(`Level: ${this._level.value}`),
			pos(24, 60),
		]);
		setGravity(1800);

		this._player.init();

		const bgmVolume = DebugHelper.isDevMode ? 0 : 0.2;

		this._bgm = play(Music.MAIN, {
			volume: bgmVolume,
		});

		this.addPlatform();
		this.spawnObsticle();
		wait(2, () => this.spawnDragon());
		this.spawnClouds();
		this.addScore();
	}

	private addBackground(): void {
		this._background = add([
			sprite(SpriteName.BACKGROUND, {
				height: height(),
				width: width(),
			}),
			color(255, 255, 255),
		]);
	}

	private addPlatform(): void {
		add([
			rect(width(), this._config.platformHeight),
			area(),
			body({ isStatic: true }),
			pos(0, height() - this._config.platformHeight),
			opacity(0),
			GameSceneTag.GROUND,
		]);

		const rock = new Ground("rock");
		rock.add();

		const grass = new Ground("grass");
		grass.add();
	}

	private spawnObsticle(): void {
		const spriteName =
			rand(0, 1) > 0.5 ? SpriteName.OBSTICLE_1 : SpriteName.OBSTICLE_2;

		const obsticleDifficulty = getDifficultyConfig(
			this._level.value
		).obsticle;

		const obsticle = new Obsticle(
			spriteName,
			obsticleDifficulty,
			this._config,
			() => this.gameOver()
		);

		obsticle.add();

		wait(
			rand(obsticleDifficulty.minWait, obsticleDifficulty.maxWait),
			() => {
				this.spawnObsticle();
			}
		);
	}

	private spawnDragon(): void {
		const dragonDifficulty = getDifficultyConfig(this._level.value).dragon;

		loop(
			0.3,
			() => {
				const dragon = new Dragon(
					() => this.gameOver(),
					dragonDifficulty,
					this._config
				);
				dragon.add();
			},
			dragonDifficulty.amount
		);

		wait(rand(dragonDifficulty.minWait, dragonDifficulty.maxWait), () =>
			this.spawnDragon()
		);
	}

	private spawnClouds(): void {
		add([
			sprite(SpriteName.CLOUD, {
				width: rand(64, 256),
			}),
			pos(width(), rand(0, height() - this._config.platformHeight - 256)),
			move(LEFT, 50 * this._level.value),
			GameSceneTag.CLOUD,
		]);

		wait(rand(1, 3), () => this.spawnClouds());
	}

	private addScore(): void {
		const scoreLabel = add([text(this.score), pos(24, 24)]);

		loop(0.01, () => {
			this._score++;
			scoreLabel.text = `Score: ${this.score}`;

			if (this._score % 2000 === 0) {
				this.incrementDifficultyLevel();
			}
		});
	}

	private incrementDifficultyLevel(): void {
		play(SoundTag.LEVEL_UP);
		this._level.value++;
		this._levelLabel.text = `Level: ${this._level.value}`;
		this.animateLevelUpText();

		const newBackgroundColor = this._background.color.darken(40);
		this._background.use(color(newBackgroundColor));

		get(GameSceneTag.OBSTICLE).forEach((obsticle: ObsticleComp) => {
			obsticle.use(move(LEFT, this._difficultySpeed));
		});

		get(GameSceneTag.CLOUD).forEach((cloud: Cloud) => {
			cloud.use(move(LEFT, 50 * this._level.value));
		});
	}

	private animateLevelUpText(): void {
		const levelUpText = add([
			text("Level Up!"),
			pos(center()),
			anchor("center"),
			animate(),
		]);

		levelUpText.animate(
			"pos",
			[vec2(center().x, center().y), vec2(center().x, center().y - 100)],
			{
				duration: 2,
			}
		);

		wait(2, () => levelUpText.destroy());
	}

	private gameOver(): void {
		this._bgm.stop();

		go(SceneName.GAME_OVER, {
			score: this.score,
			bgm: this._bgm,
		});
	}
}
