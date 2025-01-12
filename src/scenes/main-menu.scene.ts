import {
	AnchorComp,
	AreaComp,
	ColorComp,
	GameObj,
	PosComp,
	SpriteComp,
	TextComp,
} from "kaplay";
import {
	Config,
	getDesktopMainMenuConfig,
	getMobileMainMenuConfig,
} from "../configs";
import { SceneName, SoundTag, SpriteName } from "../enums";
import { DebugHelper, GameHelper } from "../helpers";
import { MainMenuConfig, MenuContainer } from "../types";

export class MainMenuScene {
	private _config: MainMenuConfig = DebugHelper.isMobile
		? getMobileMainMenuConfig()
		: getDesktopMainMenuConfig();

	private get _menuContainer(): MenuContainer {
		return this._config.container;
	}

	constructor() {
		onKeyPress(["d"], () => {
			if (isKeyDown("shift")) {
				debug.inspect = !debug.inspect;
			}
		});

		GameHelper.addBackground(Config.backgroundColor);

		const isDevMode = DebugHelper.isDevMode;

		play(SoundTag.LEVEL_UP, {
			volume: isDevMode ? 0 : 0.2,
		});

		this.buildMenu();

		onKeyPress(["space", "enter"], () => this.start());
	}

	private buildMenu(): void {
		const container = add([
			sprite(SpriteName.CONTAINER, {
				width: this._config.container.width,
				height: this._config.container.height,
			}),
			pos(width() / 2, this._config.container.yPos),
			anchor("center"),
		]);

		const title = this.makeTitle();
		container.add(title);

		const controlsBox = this.makeControlsBox();
		container.add(controlsBox);

		const startButton = this.makeStartButton();
		container.add(startButton);
	}

	private makeTitle(): GameObj<ColorComp | PosComp | AnchorComp | TextComp> {
		const title = make([
			text("Poopio the Poo"),
			anchor("center"),
			pos(
				8,
				-this._menuContainer.height / 2 + this._config.titleMarginTop
			),
			color("#806854"),
		]);

		return title;
	}

	private makeControlsBox(): GameObj<PosComp | AnchorComp> {
		const controlsBox = make([pos(0, 0), anchor("center"), opacity(0)]);

		controlsBox.add([
			text("CONTROLS:", {
				size: this._config.textSize,
			}),
			anchor("top"),
			"innerText",
		]);
		controlsBox.add([
			text(`JUMP: ${this._config.jumpControl}`, {
				size: this._config.textSize,
			}),
			anchor("top"),
			"innerText",
		]);
		controlsBox.add([
			text("You can double jump", {
				size: this._config.textSize,
			}),
			anchor("top"),
			"innerText",
		]);
		controlsBox.add([
			text(`SHOOT: ${this._config.shootControl}`, {
				size: this._config.textSize,
			}),
			anchor("top"),
			"innerText",
		]);

		const children = controlsBox.get("innerText");

		// height is calculated based on the number of children and the gap between them
		const controlsBoxHeight =
			children.length * (this._config.textSize + this._menuContainer.gap);

		controlsBox.use(rect(this._menuContainer.width, controlsBoxHeight));

		children.forEach((child, index) => {
			const gap = this._menuContainer.gap;

			const childHeightPosition = index * (this._config.textSize + gap);

			child.use(pos(0, childHeightPosition - controlsBoxHeight / 2));
		});

		return controlsBox;
	}

	private makeStartButton(): GameObj<
		SpriteComp | AreaComp | PosComp | AnchorComp
	> {
		const startButton = make([
			sprite(SpriteName.BUTTON, {
				width: 196,
			}),
			area(),
			pos(0, this._menuContainer.height / 2 - 128),
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

		return startButton;
	}

	private start(): void {
		go(SceneName.GAME);
	}
}
