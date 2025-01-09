import {
	AnchorComp,
	AreaComp,
	AudioPlay,
	ColorComp,
	EmptyComp,
	GameObj,
	OutlineComp,
	PosComp,
	RectComp,
	SpriteComp,
	TextComp,
} from "kaplay";
import { PLATFORM_HEIGHT, PRIMARY_COLOR } from "../constants";
import { SceneName } from "../enums";
import { Music } from "../enums/music.enum";
import { SoundTag } from "../enums/sound.enum";
import { SpriteName } from "../enums/sprite-name.enum";
import { GameHelper } from "../game.helper";
import { Player } from "../objects/player.class";

enum SceneTag {
	ENNEMY = "ennemy",
	Cloud = "cloud",
}

type Ennemy = GameObj<
	| SpriteComp
	| PosComp
	| AreaComp
	| OutlineComp
	| AnchorComp
	| EmptyComp
	| {
			time: number;
			id: number;
	  }
>;

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

		this._bgm = play(Music.MAIN, {
			volume: 0,
		});

		this.addPlatform();
		this.spawnEnnemy();
		this.spawnClouds();
		this.addScore();

		this._player.ref.onCollide(SceneTag.ENNEMY, () => {
			addKaboom(this._player.ref.pos);
			shake();
			this._bgm.stop();
			go(SceneName.GAME_OVER, {
				score: this.score,
			});
		});
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

	private spawnEnnemy(): void {
		const spriteName =
			rand(0, 1) > 0.5 ? SpriteName.ENNEMY1 : SpriteName.ENNEMY2;

		this.addEnnemy(spriteName, width());

		const minTime = 0.9 - this._difficulty * 0.07;
		const maxTime = 1.5 - this._difficulty * 0.07;

		wait(rand(minTime, maxTime), () => {
			this.spawnEnnemy();
		});
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
			SceneTag.Cloud,
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

	private addEnnemy(spriteName: string, posX: number): Ennemy {
		const spriteWidth = spriteName === SpriteName.ENNEMY1 ? 48 : 32;

		const basePosY = height() - PLATFORM_HEIGHT - 12;

		const ennemy = add([
			sprite(spriteName, {
				height: 48,
				width: spriteWidth,
			}),
			area(),
			outline(4, new Color(0, 0, 0)),
			pos(posX, basePosY),
			anchor("botleft"),
			move(LEFT, this._difficultySpeed),
			SceneTag.ENNEMY,
			{
				time: 0,
			},
		]);

		ennemy.onUpdate(() => {
			if (ennemy.pos.x + spriteWidth < 0) {
				destroy(ennemy);
				return;
			}
			ennemy.time += dt();
			const t = (ennemy.time % 0.5) / 2;

			ennemy.pos = lerp(
				vec2(ennemy.pos.x, ennemy.pos.y - 2),
				vec2(ennemy.pos.x, height() - PLATFORM_HEIGHT - 4),
				t
			);
		});

		return ennemy;
	}

	private incrementDifficultyLevel(): void {
		play(SoundTag.LEVEL_UP);
		this._difficulty++;
		this._levelLabel.text = `Level: ${this._difficulty}`;
		this.animateLevelUpText();

		const newBackgroundColor = this._background.color.darken(40);

		this._background.use(color(newBackgroundColor));

		get(SceneTag.ENNEMY).forEach((ennemy: Ennemy) => {
			ennemy.use(move(LEFT, this._difficultySpeed));
		});

		get(SceneTag.Cloud).forEach((cloud: Cloud) => {
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
}
