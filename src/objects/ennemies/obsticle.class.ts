import { GameObj } from "kaplay";
import { OBSTICLE_GROUND_OFFSET, OBSTICLE_HEIGHT } from "../../constants";
import { GameSceneTag, PlayerTag, SoundTag, SpriteName } from "../../enums";
import { ObsticleComp, SpawnSettings } from "../../types";
import { Ennemy } from "../ennemy.class";
export class Obsticle extends Ennemy<ObsticleComp> {
	public static isObsticle(obj: GameObj): obj is ObsticleComp {
		return obj.has(GameSceneTag.OBSTICLE);
	}

	constructor(
		protected spriteName: SpriteName,
		private _spawnSettings: SpawnSettings
	) {
		super();

		const spriteWidth = this.spriteName === SpriteName.OBSTICLE_1 ? 48 : 32;

		const basePosY =
			height() - this._gameConfig.platformHeight - OBSTICLE_GROUND_OFFSET;

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
					height() - this._gameConfig.platformHeight - 4
				),
				t
			);
		});

		this.ref.onCollide(PlayerTag.PLAYER, (player) => {
			this.ref.destroy();
			player.destroy();
		});

		this.ref.onCollide(PlayerTag.BULLET, (bullet) => {
			play(SoundTag.IMPACT_INVINCIBLE, {
				volume: 0.8,
			});

			const impact = add([
				sprite(SpriteName.INVINCIBLE_IMPACT),
				pos(bullet.pos.x, bullet.pos.y - bullet.height),
				area(),
				move(LEFT, this.ref.speed),
			]);

			impact.onAnimEnd(() => impact.destroy());

			impact.play("impact");
			bullet.destroy();
		});
	}
}
