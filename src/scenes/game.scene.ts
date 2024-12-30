import { AudioPlay } from "kaplay";
import { PLATFORM_HEIGHT } from "../constants";
import { SceneName } from "../enums";
import { Music } from "../enums/music.enum";
import { SpriteName } from "../enums/sprite-name.enum";
import { GameHelper } from "../game.helper";
import { Player } from "../objects/player.class";

export class GameScene {
	private _score = 0;
	public get score(): string {
		return this._score.toString();
	}
	public set score(value: number) {
		this._score = value;
	}

	private _bgm: AudioPlay;
	private _player: Player = new Player();

	constructor() {
		GameHelper.addBackground();
		setGravity(1600);

		this._player.init();

		this._bgm = play(Music.MAIN, {
			volume: 0.2,
		});

		this.addPlatform();
		this.spawnTree();
		this.spawnClouds();
		this.addScore();
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

	private spawnTree(): void {
		add([
			rect(48, rand(24, 64)),
			area(),
			outline(4, new Color(0, 0, 0)),
			pos(width(), height() - PLATFORM_HEIGHT),
			anchor("botleft"),
			color(255, 180, 255),
			move(LEFT, 500),
			"tree",
		]);

		wait(rand(0.5, 1.5), () => {
			this.spawnTree();
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
			move(LEFT, 50),
		]);

		wait(rand(1, 3), () => {
			this.spawnClouds();
		});
	}

	private addScore(): void {
		const scoreLabel = add([text(this.score), pos(24, 24)]);

		onUpdate(() => {
			this._score++;
			scoreLabel.text = `Score: ${this.score}`;
		});

		this._player.ref.onCollide("tree", () => {
			addKaboom(this._player.ref.pos);
			shake();
			this._bgm.stop();
			go(SceneName.GAME_OVER, {
				score: this.score,
			});
		});
	}
}
