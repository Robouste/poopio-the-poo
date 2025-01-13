import {
	getDesktopGameConfig,
	getGrassSprite,
	getMobileGameConfig,
	getRockSprite,
} from "../configs";
import { GameSceneTag, SpriteName } from "../enums";
import { DebugHelper } from "../helpers";
import { DifficultyLevelComp, GameConfig, GroundComp } from "../types";

type GroundType = "grass" | "rock";
type GroundSetting = {
	getSprite: (level: number) => SpriteName;
	height: number;
	zIndex: number;
};

export class Ground {
	private _config: GameConfig = DebugHelper.isMobile
		? getMobileGameConfig()
		: getDesktopGameConfig();

	private _settings: Record<GroundType, GroundSetting> = {
		grass: {
			getSprite: (level) => getGrassSprite(level),
			height: 32,
			zIndex: 1,
		},
		rock: {
			getSprite: (level) => getRockSprite(level),
			height: this._config.platformHeight,
			zIndex: 0,
		},
	};

	private get _level(): DifficultyLevelComp {
		return get(GameSceneTag.LEVEL)[0] as DifficultyLevelComp;
	}

	constructor(private _type: GroundType) {}

	public add(): void {
		add(this.make(0));
	}

	private make(posX: number): GroundComp {
		const settings = this._settings[this._type];

		const ground = make([
			sprite(settings.getSprite(this._level.value), {
				tiled: true,
				width: width(),
				height: settings.height,
			}),
			pos(posX, height() - this._config.platformHeight),
			move(LEFT, 250),
			z(settings.zIndex),
			GameSceneTag.TO_DESTROY,
			{
				nextAdded: false,
			},
		]);

		ground.onUpdate(() => {
			if (ground.pos.x <= 0 && !ground.nextAdded) {
				add(this.make(width() - 50));
				ground.nextAdded = true;

				ground.nextAdded = true;
			}

			const rightEdgePosX = ground.pos.x + ground.width;

			if (rightEdgePosX <= 0) {
				ground.destroy();
				return;
			}
		});

		return ground;
	}
}
