import { PRIMARY_COLOR } from "../constants";
import { SceneName } from "../enums";
import { SoundTag } from "../enums/sound.enum";
import { SpriteName } from "../enums/sprite-name.enum";
import { GameHelper } from "../game.helper";
import { DebugHelper } from "../helpers/debug.helper";

export class MainMenuScene {
	constructor() {
		GameHelper.addBackground();

		const isDevMode = DebugHelper.isDevMode;

		play(SoundTag.LEVEL_UP, {
			volume: isDevMode ? 0 : 0.2,
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
			text("CONTROLS:"),
			pos(width() / 2, height() / 2 - 160),
			anchor("center"),
		]);

		add([
			text("Space or left mouse to jump (tap left on mobile)"),
			pos(width() / 2, height() / 2 - 96),
			anchor("center"),
		]);
		add([
			text("You can double jump"),
			pos(width() / 2, height() / 2 - 48),
			anchor("center"),
		]);

		add([
			text("Enter or right mouse to SHOOT (tap right on mobile)"),
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
