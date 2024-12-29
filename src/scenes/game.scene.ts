import { PLATFORM_HEIGHT } from "../constants";
import { SpriteName } from "../enums/sprite-name.enum";
import { GameHelper } from "../game.helper";
import { Player } from "../objects/player.class";

export class GameScene {
	constructor(player: Player) {
		GameHelper.addBackground();
		setGravity(1600);

		player.init();

		this.addPlatform();
		this.spawnTree();
		this.spawnClouds();
		this.addHowToPlay();
	}

	private addHowToPlay(): void {
		const firstLine = add([
			text("Space/Tap to jump"),
			pos(width() / 2, height() / 2 - 80),
			anchor("center"),
		]);
		const secondLine = add([
			text("Space/Tap again to double jump"),
			pos(width() / 2, height() / 2 - 40),
			anchor("center"),
		]);

		// fade out text after 5 seconds
		wait(5, () => {
			destroy(firstLine);
			destroy(secondLine);
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
}
