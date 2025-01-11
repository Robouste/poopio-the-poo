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
		GameHelper.addBackground();

		const isDevMode = DebugHelper.isDevMode;

		play(SoundTag.LEVEL_UP, {
			volume: isDevMode ? 0 : 0.2,
		});

		this.addTitle();
		this.addControlsBox();
		this.addStartButton();

		onKeyPress(["space", "enter"], () => this.start());
	}

	private addTitle(): void {
		const titleWidth = Math.min(width() * 0.8, 400);

		add([
			sprite(SpriteName.TITLE, {
				width: titleWidth,
			}),
			pos(width() / 2, height() * 0.2),
			anchor("center"),
		]);
	}

	private addControlsBox(): void {
		const container = add([
			sprite(SpriteName.CONTAINER, {
				width: this._config.controlsContainer.width,
				height: this._config.controlsContainer.height,
			}),
			pos(width() / 2, this._config.controlsContainer.yPos),
			anchor("center"),
			Config.primaryColor,
		]);

		container.add([
			text("CONTROLS:", {
				size: this._config.textSize,
			}),
			anchor("top"),
		]);
		container.add([
			text(`JUMP: ${this._config.jumpControl}`, {
				size: this._config.textSize,
			}),
			anchor("top"),
		]);
		container.add([
			text("You can double jump", {
				size: this._config.textSize,
			}),
			anchor("top"),
		]);
		container.add([
			text(`SHOOT: ${this._config.shootControl}`, {
				size: this._config.textSize,
			}),
			anchor("top"),
		]);

		container.children.forEach((child, index) => {
			const gap = 16;
			const childHeightPosition =
				gap + index * (this._config.textSize + gap);

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

		startButton.use(pos(width() / 2, yPos));

		add(startButton);
	}

	private start(): void {
		go(SceneName.GAME);
	}
}
