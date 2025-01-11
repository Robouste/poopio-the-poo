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
import { OBSTICLE_GROUND_OFFSET, OBSTICLE_HEIGHT } from "../constants";
import { SceneName } from "../enums";
import { GameSceneTag } from "../enums/game-scene-tag.enum";
import { Music } from "../enums/music.enum";
import { PlayerTag } from "../enums/player-tag.enum";
import { SoundTag } from "../enums/sound.enum";
import { SpriteName } from "../enums/sprite-name.enum";
import { DebugHelper } from "../helpers/debug.helper";
import { Player } from "../objects/player.class";
import { Dragon, Obsticle } from "../types/ennemy.type";
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
	private _difficulty = 1;
	private _levelLabel: GameObj<PosComp | TextComp>;
	private get _difficultySpeed(): number {
		return 300 + this._difficulty * 100;
	}

	constructor() {
		this.addBackground();

		this._levelLabel = add([
			text(`Level: ${this._difficulty}`),
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

		this._player.ref.onCollide(GameSceneTag.OBSTICLE, () =>
			this.gameOver()
		);
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
			sprite(SpriteName.FLOOR_ROCK, {
				tiled: true,
				width: width(),
				height: this._config.platformHeight,
			}),
			pos(0, height() - this._config.platformHeight),
			area(),
			body({ isStatic: true }),
			"ground",
		]);

		add([
			sprite(SpriteName.FLOOR_GRASS, {
				tiled: true,
				width: width(),
				height: 32,
			}),
			pos(0, height() - this._config.platformHeight),
			area(),
			body({ isStatic: true }),
			"ground",
		]);
	}

	private spawnObsticle(): void {
		const spriteName =
			rand(0, 1) > 0.5 ? SpriteName.OBSTICLE_1 : SpriteName.OBSTICLE_2;

		const obsticleDifficulty = getDifficultyConfig(
			this._difficulty
		).obsticle;

		const obsticle = this.makeObsticle(
			spriteName,
			width(),
			obsticleDifficulty.speed
		);

		add(obsticle);

		wait(
			rand(obsticleDifficulty.minWait, obsticleDifficulty.maxWait),
			() => {
				this.spawnObsticle();
			}
		);
	}

	private spawnDragon(): void {
		const dragonDifficulty = getDifficultyConfig(this._difficulty).dragon;

		loop(0.3, () => add(this.makeDragon()), dragonDifficulty.amount);

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
			move(LEFT, 50 * this._difficulty),
			GameSceneTag.Cloud,
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

	private makeObsticle(
		spriteName: string,
		posX: number,
		speed: number
	): Obsticle {
		const spriteWidth = spriteName === SpriteName.OBSTICLE_1 ? 48 : 32;

		const basePosY =
			height() - this._config.platformHeight - OBSTICLE_GROUND_OFFSET;

		const obsticle = make([
			sprite(spriteName, {
				height: OBSTICLE_HEIGHT,
				width: spriteWidth,
			}),
			area(),
			pos(posX, basePosY),
			anchor("botleft"),
			move(LEFT, speed),
			GameSceneTag.OBSTICLE,
			{
				time: 0,
				speed,
			},
		]);

		obsticle.onUpdate(() => {
			if (obsticle.pos.x + spriteWidth < 0) {
				destroy(obsticle);
				return;
			}

			obsticle.time += dt();
			const t = (obsticle.time % 0.5) / 2;

			obsticle.pos = lerp(
				vec2(obsticle.pos.x, obsticle.pos.y - 2),
				vec2(
					obsticle.pos.x,
					height() - this._config.platformHeight - 4
				),
				t
			);
		});

		return obsticle;
	}

	private makeDragon(): Dragon {
		const dragonDifficulty = getDifficultyConfig(this._difficulty).dragon;

		const dragonHeight = 56;
		const minPosY =
			height() -
			this._config.platformHeight -
			OBSTICLE_GROUND_OFFSET -
			OBSTICLE_HEIGHT -
			dragonHeight;

		const dragon = make([
			sprite(SpriteName.DRAGON, {
				height: dragonHeight,
			}),
			area(),
			pos(width(), rand(minPosY - 256, minPosY)),
			health(dragonDifficulty.health),
			z(98),
			GameSceneTag.DRAGON,
			{
				speed: dragonDifficulty.speed,
			},
		]);

		onUpdate(() => {
			if (dragon.pos.x + dragon.width < 0) {
				destroy(dragon);
				return;
			}

			const playerPos = this._player.ref.pos;
			const playerPosY = playerPos.y - this._player.ref.height / 2;

			// prevent dragon from going behind the obsticles
			const posY = Math.min(playerPosY, minPosY);

			dragon.moveTo(
				-100,
				posY,
				getDifficultyConfig(this._difficulty).dragon.speed
			);
		});

		dragon.play("fly");

		dragon.onCollide(PlayerTag.PLAYER, () => {
			dragon.destroy();
			this.gameOver();
		});

		return dragon;
	}

	private incrementDifficultyLevel(): void {
		play(SoundTag.LEVEL_UP);
		this._difficulty++;
		this._levelLabel.text = `Level: ${this._difficulty}`;
		this.animateLevelUpText();

		const newBackgroundColor = this._background.color.darken(40);
		this._background.use(color(newBackgroundColor));

		get(GameSceneTag.OBSTICLE).forEach((obsticle: Obsticle) => {
			obsticle.use(move(LEFT, this._difficultySpeed));
		});

		get(GameSceneTag.Cloud).forEach((cloud: Cloud) => {
			cloud.use(move(LEFT, 50 * this._difficulty));
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
