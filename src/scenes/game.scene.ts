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
import { AncientDragon } from "../objects/ennemies/ancient-dragon.class";
import { Dragon } from "../objects/ennemies/dragon.class";
import { Obsticle } from "../objects/ennemies/obsticle.class";
import { Ground } from "../objects/gound.object";
import { Player } from "../objects/player.class";
import { DifficultyLevelComp } from "../types/difficulty-level.type";
import { GameConfigComp } from "../types/game-config.type";

type Cloud = GameObj<PosComp | SpriteComp | EmptyComp>;

export class GameScene {
	private _score = 0;
	public get score(): string {
		return this._score.toString();
	}
	public set score(value: number) {
		this._score = value;
	}

	private _config: GameConfigComp = add([
		DebugHelper.isMobile ? getMobileGameConfig() : getDesktopGameConfig(),
		GameSceneTag.GAME_CONFIG,
	]);

	private _background: GameObj<ColorComp | SpriteComp>;
	private _bgm: AudioPlay;
	private _bgmLevel = DebugHelper.isDevMode ? 1 : 1;
	private _bossMusic: AudioPlay | null = null;
	private _player: Player = new Player();
	private _level: DifficultyLevelComp = add([
		GameSceneTag.LEVEL,
		{
			value: 6,
		},
	]);
	private _levelLabel: GameObj<PosComp | TextComp>;
	private get _difficultySpeed(): number {
		return 300 + this._level.value * 100;
	}

	private get _bgColor(): ColorComp {
		return color(color(255, 255, 255).color.darken(40 * this._level.value));
	}

	constructor() {
		this._background = add([
			sprite(SpriteName.BACKGROUND, {
				height: height(),
				width: width(),
			}),
			this._bgColor,
		]);

		this._levelLabel = add([
			text(`Level: ${this._level.value}`),
			pos(24, 60),
			z(100),
		]);

		setGravity(1800);

		this._player.init();

		this._bgm = play(Music.MAIN, {
			volume: this._bgmLevel,
		});

		this.addPlatform();
		this.spawnObsticle();
		wait(2, () => this.spawnDragon());
		this.spawnBoss();
		this.spawnClouds();
		this.addScore();

		this._player.ref.onDestroy(() => this.gameOver());
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
		const obsticleDifficulty = getDifficultyConfig(
			this._level.value
		).obsticle;

		if (!obsticleDifficulty) {
			wait(1, () => this.spawnObsticle());
			return;
		}

		const spriteName =
			rand(0, 1) > 0.5 ? SpriteName.OBSTICLE_1 : SpriteName.OBSTICLE_2;

		const obsticle = new Obsticle(spriteName, obsticleDifficulty);

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

		if (!dragonDifficulty) {
			wait(1, () => this.spawnDragon());
			return;
		}

		loop(
			0.3,
			() => {
				const dragon = new Dragon(dragonDifficulty);
				dragon.add();
			},
			dragonDifficulty.amount
		);

		wait(rand(dragonDifficulty.minWait, dragonDifficulty.maxWait), () =>
			this.spawnDragon()
		);
	}

	private spawnBoss(): void {
		const shouldSpawn = getDifficultyConfig(this._level.value).isBossLevel;

		if (!shouldSpawn) {
			wait(1, () => this.spawnBoss());
			return;
		}

		loop(
			0.1,
			() => {
				this._bgm.volume -= 0.1;
			},
			10
		);

		wait(1, () => {
			this._bgm.stop();
			this._bossMusic = play(Music.BOSS);
			const boss = new AncientDragon();

			boss.add();

			boss.ref.onDestroy(() => {
				this._bossMusic?.stop();
				this._bgm.play();
				this._bgm.volume = this._bgmLevel;
				this._score += 2000;
				get(GameSceneTag.DRAGON).forEach((dragon) => dragon.destroy());
				this.incrementDifficultyLevel();
			});
		});
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
		const scoreLabel = add([text(this.score), pos(24, 24), z(100)]);

		loop(0.01, () => {
			const currentDifficulty = getDifficultyConfig(this._level.value);

			if (currentDifficulty.isBossLevel) {
				return;
			}

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
		this._background.use(this._bgColor);

		get(GameSceneTag.OBSTICLE).forEach((obsticle) => {
			if (!Obsticle.isObsticle(obsticle)) {
				return;
			}

			obsticle.use(move(LEFT, this._difficultySpeed));
		});

		get(GameSceneTag.CLOUD).forEach((cloud) => {
			const isCloud = (obj: GameObj): obj is Cloud =>
				obj.has(GameSceneTag.CLOUD);

			if (!isCloud(cloud)) {
				return;
			}
			cloud.use(move(LEFT, 50 * this._level.value));
		});
	}

	private animateLevelUpText(): void {
		const levelUpText = add([
			text("Level Up!"),
			pos(center()),
			anchor("center"),
			animate(),
			z(100),
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
