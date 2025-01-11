import { Config } from "../configs/global.config";
import {
	getDesktopMainMenuConfig,
	getMobileMainMenuConfig,
} from "../configs/main-menu.config";
import { SceneName } from "../enums";
import { SoundTag } from "../enums/sound.enum";
import { SpriteName } from "../enums/sprite-name.enum";
import { GameHelper } from "../game.helper";
import { DebugHelper } from "../helpers/debug.helper";
import {
	ControlsContainerParams,
	MainMenuConfig,
} from "../types/main-menu-config.type";

export class MainMenuScene {
	private _config: MainMenuConfig = DebugHelper.isMobile
		? getMobileMainMenuConfig()
		: getDesktopMainMenuConfig();

	private get _controlsContainer(): ControlsContainerParams {
		return this._config.controlsContainer;
	}

	constructor() {
		GameHelper.addBackground(Config.backgroundColor);

		const isDevMode = DebugHelper.isDevMode;

		play(SoundTag.LEVEL_UP, {
			volume: isDevMode ? 0 : 0.2,
		});

		// this.addTitle();
		this.addControlsBox();
		this.addStartButton();

		onKeyPress(["space", "enter"], () => this.start());
	}

	// private addTitle(): void {
	// 	const titleWidth = Math.min(width() * 0.8, 400);

	// 	add([
	// 		sprite(SpriteName.TITLE, {
	// 			width: titleWidth,
	// 		}),
	// 		pos(width() / 2, height() * 0.2),
	// 		anchor("center"),
	// 	]);
	// }

	private addControlsBox(): void {
		const container = add([
			sprite(SpriteName.CONTAINER, {
				width: this._config.controlsContainer.width,
				height: this._config.controlsContainer.height,
			}),
			pos(width() / 2, this._config.controlsContainer.yPos),
			anchor("center"),
		]);

		container.add([
			text("Poopio the Poo"),
			anchor("center"),
			pos(
				8,
				-this._controlsContainer.height / 2 +
					this._config.titleMarginTop
			),
			color("#543e2a"),
		]);

		container.add([
			text("CONTROLS:", {
				size: this._config.textSize,
			}),
			anchor("top"),
			"innerText",
		]);
		container.add([
			text(`JUMP: ${this._config.jumpControl}`, {
				size: this._config.textSize,
			}),
			anchor("top"),
			"innerText",
		]);
		container.add([
			text("You can double jump", {
				size: this._config.textSize,
			}),
			anchor("top"),
			"innerText",
		]);
		container.add([
			text(`SHOOT: ${this._config.shootControl}`, {
				size: this._config.textSize,
			}),
			anchor("top"),
			"innerText",
		]);

		const startButton = make([
			sprite(SpriteName.BUTTON, {
				width: 196,
			}),
			area(),
			pos(0, this._controlsContainer.height / 2 - 128),
			anchor("center"),
		]);

		startButton.add([
			text("Start", {
				size: 24,
			}),
			pos(0, 0),
			anchor("center"),
		]);

		startButton.onHover(() => {
			setCursor("pointer");
			startButton.use(opacity(0.8));
		});

		startButton.onHoverEnd(() => {
			setCursor("default");
			startButton.use(opacity(1));
		});

		startButton.onClick(() => this.start());

		container.add(startButton);

		container.get("innerText").forEach((child, index) => {
			const paddingTop = 256;
			const gap = 16;

			const childHeightPosition =
				paddingTop + index * (this._config.textSize + gap);

			child.use(
				pos(
					0,
					childHeightPosition -
						this._config.controlsContainer.height / 2
				)
			);
		});
	}

	private addStartButton(): void {
		const startButton = GameHelper.makeButton({
			type: "primary",
			text: "Start",
			action: () => {
				play(SoundTag.LEVEL_UP);
				this.start();
			},
			anchorPos: "center",
		});

		const yPos =
			this._controlsContainer.yPos +
			this._controlsContainer.height +
			this._config.gap;

		console.log(
			"this._controlsContainer.yPos",
			this._controlsContainer.yPos
		);
		console.log("yPos", yPos);

		startButton.use(pos(width() / 2, yPos));

		add(startButton);
	}

	private start(): void {
		go(SceneName.GAME);
	}
}
