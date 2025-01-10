import {
	AudioPlay,
	ColorComp,
	EmptyComp,
	GameObj,
	PosComp,
	RectComp,
	SpriteComp,
	TextComp,
} from "kaplay";
import { PLATFORM_HEIGHT, PRIMARY_COLOR } from "../constants";
import { SceneName } from "../enums";
import { GameSceneTag } from "../enums/game-scene-tag.enum";
import { Music } from "../enums/music.enum";
import { PlayerTag } from "../enums/player-tag.enum";
import { SoundTag } from "../enums/sound.enum";
import { SpriteName } from "../enums/sprite-name.enum";
import { GameHelper } from "../game.helper";
import { DebugHelper } from "../helpers/debug.helper";
import { Player } from "../objects/player.class";
import { Obsticle } from "../types/ennemy.type";

type Cloud = GameObj<PosComp | SpriteComp | EmptyComp>;

export class GameScene {
	private _score = 0;
	public get score(): string {
		return this._score.toString();
	}
	public set score(value: number) {
		this._score = value;
	}

	private _background: GameObj<RectComp | PosComp | ColorComp>;
	private _bgm: AudioPlay;
	private _player: Player = new Player();
	private _difficulty = 1;
	private _levelLabel: GameObj<PosComp | TextComp>;
	private get _difficultySpeed(): number {
		return 300 + this._difficulty * 100;
	}

	constructor() {
		this._background = GameHelper.addBackground({ ...PRIMARY_COLOR });
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

	private addPlatform(): void {
		add([
			rect(width(), PLATFORM_HEIGHT),
			pos(0, height() - PLATFORM_HEIGHT),
			outline(4),
			area(),
			body({ isStatic: true }),
			color(127, 200, 250),
			"ground",
		]);
	}

	private spawnObsticle(): void {
		const spriteName =
			rand(0, 1) > 0.5 ? SpriteName.OBSTICLE_1 : SpriteName.OBSTICLE_2;

		this.addObsticle(spriteName, width());

		const minTime = 0.9 - this._difficulty * 0.07;
		const maxTime = 1.5 - this._difficulty * 0.07;

		wait(rand(minTime, maxTime), () => {
			this.spawnObsticle();
		});
	}

	private spawnDragon(): void {
		const dragon = add([
			sprite(SpriteName.DRAGON),
			area(),
			pos(width(), rand(height() * 0.5, height() * 0.75)),
			health(90),
			GameSceneTag.DRAGON,
			{
				speed: this._difficultySpeed,
			},
		]);

		onUpdate(() => {
			const playerPos = this._player.ref.pos;

			dragon.moveTo(
				playerPos.x,
				playerPos.y - this._player.ref.height / 2,
				this._difficultySpeed
			);
		});

		dragon.play("fly");

		dragon.onCollide(PlayerTag.PLAYER, () => {
			dragon.destroy();
			this.gameOver();
		});

		wait(rand(5, 10), () => this.spawnDragon());
	}

	private spawnClouds(): void {
		add([
			sprite(SpriteName.CLOUD, {
				// random size
				height: rand(32, 64),
				width: rand(64, 128),
			}),
			pos(width(), rand(0, height() * 0.75)),
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

	private addObsticle(spriteName: string, posX: number): Obsticle {
		const spriteWidth = spriteName === SpriteName.OBSTICLE_1 ? 48 : 32;

		const basePosY = height() - PLATFORM_HEIGHT - 12;

		const obsticle = add([
			sprite(spriteName, {
				height: 48,
				width: spriteWidth,
			}),
			area(),
			outline(4, new Color(0, 0, 0)),
			pos(posX, basePosY),
			anchor("botleft"),
			move(LEFT, this._difficultySpeed),
			GameSceneTag.OBSTICLE,
			{
				time: 0,
				speed: this._difficultySpeed,
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
				vec2(obsticle.pos.x, height() - PLATFORM_HEIGHT - 4),
				t
			);
		});

		return obsticle;
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
