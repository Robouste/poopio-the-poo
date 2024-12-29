import { PRIMARY_COLOR } from "../constants";
import { SceneName } from "../enums";
import { GameHelper } from "../game.helper";

export class MainMenuScene {
	constructor() {
		GameHelper.addBackground();

		const firstLine = add([
			text("Space/Tap to jump."),
			pos(width() / 2, height() / 2 - 80),
			anchor("center"),
		]);
		const secondLine = add([
			text("Space/Tap again to double jump."),
			pos(width() / 2, height() / 2 - 40),
			anchor("center"),
		]);

		GameHelper.createButton({
			width: 200,
			height: 48,
			primaryColor: new Color(...PRIMARY_COLOR),
			secondaryColor: new Color(255, 255, 255),
			posX: width() / 2,
			posY: height() / 2 + 48,
			text: "Start",
			anchor: "center",
			onClick: () => {
				go(SceneName.GAME);
			},
		});
	}
}
