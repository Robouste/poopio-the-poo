import { PLATFORM_HEIGHT } from "../constants";
import { GameHelper } from "../game.helper";
import { Player } from "../objects/player.class";

export class GameScene {
	constructor(player: Player) {
		GameHelper.addBackground();
		setGravity(1600);

		player.init();

		this.addPlatform();
		this.spawnTree();
		this.addHowToPlay();
	}

	private addHowToPlay(): void {
		add([
			text("Space/Tap to jump"),
			pos(width() / 2, height() / 2 - 80),
			anchor("center"),
		]);
		add([
			text("Space/Tap again to double jump"),
			pos(width() / 2, height() / 2 - 40),
			anchor("center"),
		]);
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
}
