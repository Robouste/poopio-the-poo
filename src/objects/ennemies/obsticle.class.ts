import { OBSTICLE_GROUND_OFFSET, OBSTICLE_HEIGHT } from "../../constants";
import { GameSceneTag } from "../../enums/game-scene-tag.enum";
import { PlayerTag } from "../../enums/player-tag.enum";
import { SpriteName } from "../../enums/sprite-name.enum";
import { SpawnSettings } from "../../types/difficulty-config.type";
import { ObsticleComp } from "../../types/ennemy.type";
import { GameConfig } from "../../types/game-config.type";
import { Ennemy } from "../ennemy.class";

export class Obsticle extends Ennemy<ObsticleComp> {
	constructor(
		protected spriteName: SpriteName,
		private _spawnSettings: SpawnSettings,
		private _config: GameConfig,
		protected onCollide: () => void
	) {
		super();

		const spriteWidth = this.spriteName === SpriteName.OBSTICLE_1 ? 48 : 32;

		const basePosY =
			height() - this._config.platformHeight - OBSTICLE_GROUND_OFFSET;

		this.ref = make([
			sprite(this.spriteName, {
				height: OBSTICLE_HEIGHT,
				width: spriteWidth,
			}),
			area(),
			pos(width(), basePosY),
			anchor("botleft"),
			move(LEFT, this._spawnSettings.speed),
			GameSceneTag.OBSTICLE,
			{
				time: 0,
				speed: this._spawnSettings.speed,
			},
		]);

		this.ref.onUpdate(() => {
			if (this.ref.pos.x + spriteWidth < 0) {
				destroy(this.ref);
				return;
			}

			// I don't understand shit but it makes it move up and down
			this.ref.time += dt();
			const t = (this.ref.time % 0.5) / 2;

			this.ref.pos = lerp(
				vec2(this.ref.pos.x, this.ref.pos.y - 2),
				vec2(
					this.ref.pos.x,
					height() - this._config.platformHeight - 4
				),
				t
			);
		});

		this.ref.onCollide(PlayerTag.PLAYER, () => {
			this.ref.destroy();
			this.onCollide();
		});
	}
}
