import { Bean } from "../bean.class";
import { GameHelper } from "../game.helper";

export class GameScene {
	constructor(bean: Bean) {
		GameHelper.addBackground();
		setGravity(1600);

		bean.init();

		// platform
		add([
			rect(width(), 48),
			pos(0, height() - 48),
			outline(4),
			area(),
			body({ isStatic: true }),
			color(127, 200, 250),
			"ground",
		]);

		const spawnTree = () => {
			add([
				rect(48, rand(24, 64)),
				area(),
				outline(4, new Color(0, 0, 0)),
				pos(width(), height() - 48),
				anchor("botleft"),
				color(255, 180, 255),
				move(LEFT, 500),
				"tree",
			]);

			wait(rand(0.5, 1.5), () => {
				spawnTree();
			});
		};

		spawnTree();
	}
}
