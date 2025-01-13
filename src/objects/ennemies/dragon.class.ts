import { OBSTICLE_GROUND_OFFSET, OBSTICLE_HEIGHT } from "../../constants";
import { GameSceneTag, PlayerTag, SoundTag, SpriteName } from "../../enums";
import { GameHelper } from "../../helpers";
import { DragonComp, DragonSpawnSettings, PlayerComp } from "../../types";
import { Ennemy } from "../ennemy.class";

export class Dragon extends Ennemy<DragonComp> {
	protected spriteName = SpriteName.DRAGON;

	constructor(private _spawnSettings: DragonSpawnSettings) {
		super();

		const dragonHeight = 56;

		const minPosY =
			height() -
			this._gameConfig.platformHeight -
			OBSTICLE_GROUND_OFFSET -
			OBSTICLE_HEIGHT -
			dragonHeight;

		this.ref = make([
			sprite(this.spriteName, {
				height: dragonHeight,
			}),
			area(),
			pos(width(), rand(minPosY - 256, minPosY)),
			health(this._spawnSettings.health),
			z(98),
			GameSceneTag.DRAGON,
			GameSceneTag.TO_DESTROY,
			{
				speed: this._spawnSettings.speed,
			},
		]);

		this.ref.onUpdate(() => {
			if (this.ref.pos.x + this.ref.width < 0) {
				destroy(this.ref);
				return;
			}
			const player = get(PlayerTag.PLAYER)[0] as PlayerComp;

			if (!player) {
				return;
			}

			const playerPos = player.pos;
			const playerPosY = playerPos.y - player.height / 2;

			// prevent dragon from going behind the obsticles
			const posY = Math.min(playerPosY, minPosY);

			this.ref.moveTo(-500, posY, this._spawnSettings.speed);
		});

		this.ref.play("fly");

		this.ref.onCollide(PlayerTag.PLAYER, (player) => {
			this.ref.destroy();
			player.destroy();
		});

		this.ref.onCollide(PlayerTag.BULLET, (bullet) => {
			play(SoundTag.IMPACT, {
				volume: 0.3,
			});

			this.ref.hurt(30);

			const isDead = this.ref.hp() <= 0;

			if (!isDead) {
				GameHelper.addImpact(bullet, this.ref.speed);
			}

			if (isDead) {
				this.ref.destroy();
			}

			this.ref.play("hurt", {
				onEnd: () => wait(0, () => this.ref.play("fly")),
			});

			bullet.destroy();
		});

		this.ref.onDestroy(() => GameHelper.addImpact(this.ref, 0));
	}
}
