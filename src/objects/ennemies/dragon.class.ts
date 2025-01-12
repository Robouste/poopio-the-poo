import { OBSTICLE_GROUND_OFFSET, OBSTICLE_HEIGHT } from "../../constants";
import { GameSceneTag } from "../../enums/game-scene-tag.enum";
import { PlayerTag } from "../../enums/player-tag.enum";
import { SoundTag } from "../../enums/sound.enum";
import { SpriteName } from "../../enums/sprite-name.enum";
import { DragonSpawnSettings } from "../../types/difficulty-config.type";
import { DragonComp } from "../../types/ennemy.type";
import { GameConfig } from "../../types/game-config.type";
import { PlayerComp } from "../../types/player.type";
import { Ennemy } from "../ennemy.class";

export class Dragon extends Ennemy<DragonComp> {
	protected spriteName = SpriteName.DRAGON;

	constructor(
		private _spawnSettings: DragonSpawnSettings,
		private _gameConfig: GameConfig
	) {
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
				volume: 0.7,
			});

			this.ref.hurt(30);

			const isDead = this.ref.hp() <= 0;

			const impact = add([
				sprite(SpriteName.BULLET_IMPACT),
				pos(bullet.pos.x, bullet.pos.y - bullet.height),
				area(),
				move(LEFT, this.ref.speed),
			]);

			if (isDead) {
				this.ref.destroy();
			}

			this.ref.play("hurt", {
				onEnd: () => this.ref.play("fly"),
			});

			impact.play("impact");

			impact.onAnimEnd(() => impact.destroy());
			bullet.destroy();
		});
	}
}
