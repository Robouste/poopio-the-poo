import { PRIMARY_COLOR } from "../constants";
import { SceneName } from "../enums";
import { SpriteName } from "../enums/sprite-name.enum";
import { GameHelper } from "../game.helper";

export class MainMenuScene {
	constructor() {
		GameHelper.addBackground();

		const titleWidth = Math.min(width() * 0.8, 400);

		add([
			sprite(SpriteName.TITLE, {
				width: titleWidth,
			}),
			pos(width() / 2, height() * 0.2),
			anchor("center"),
		]);

		add([
			text("Space/Tap to jump."),
			pos(width() / 2, height() / 2 - 80),
			anchor("center"),
		]);
		add([
			text("Space/Tap again to double jump."),
			pos(width() / 2, height() / 2 - 40),
			anchor("center"),
		]);

		onKeyPress(["space", "enter"], () => this.start());

		GameHelper.createButton({
			width: 200,
			height: 48,
			primaryColor: PRIMARY_COLOR,
			secondaryColor: new Color(255, 255, 255),
			posX: width() / 2,
			posY: height() / 2 + 48,
			text: "Start",
			anchor: "center",
			onClick: () => this.start(),
		});
	}

	private start(): void {
		go(SceneName.GAME);
	}
}
