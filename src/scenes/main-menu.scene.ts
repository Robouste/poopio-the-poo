import { PRIMARY_COLOR } from "../constants";
import { SceneName } from "../enums";
import { SoundTag } from "../enums/sound.enum";
import { SpriteName } from "../enums/sprite-name.enum";
import { GameHelper } from "../game.helper";

export class MainMenuScene {
	constructor() {
		GameHelper.addBackground();

		play(SoundTag.LEVEL_UP, {
			volume: 0,
		});

		const titleWidth = Math.min(width() * 0.8, 400);

		add([
			sprite(SpriteName.TITLE, {
				width: titleWidth,
			}),
			pos(width() / 2, height() * 0.2),
			anchor("center"),
		]);

		add([
			text("Space/Tap left to jump."),
			pos(width() / 2, height() / 2 - 80),
			anchor("center"),
		]);
		add([
			text("Space/Tap left again to double jump."),
			pos(width() / 2, height() / 2 - 40),
			anchor("center"),
		]);

		add([
			text("Enter/Tap right to shoot."),
			pos(width() / 2, height() / 2),
			anchor("center"),
		]);

		onKeyPress(["space", "enter"], () => this.start());

		GameHelper.createButton({
			width: 200,
			height: 48,
			primaryColor: PRIMARY_COLOR,
			secondaryColor: new Color(255, 255, 255),
			posX: width() / 2,
			posY: height() / 2 + 96,
			text: "Start",
			anchor: "center",
			onClick: () => this.start(),
		});
	}

	private start(): void {
		go(SceneName.GAME);
	}
}
