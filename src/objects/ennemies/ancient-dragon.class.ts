import { GameSceneTag } from "../../enums/game-scene-tag.enum";
import { PlayerTag } from "../../enums/player-tag.enum";
import { SoundTag } from "../../enums/sound.enum";
import { SpriteName } from "../../enums/sprite-name.enum";
import { GameHelper } from "../../helpers/game.helper";
import { DragonComp } from "../../types/ennemy.type";
import { Ennemy } from "../ennemy.class";

export class AncientDragon extends Ennemy<DragonComp> {
	protected spriteName = SpriteName.ANCIENT_DRAGON;

	constructor() {
		super();

		const dragonHeight = 196;

		this.ref = make([
			sprite(this.spriteName, {
				height: dragonHeight,
			}),
			area(),
			pos(width(), height() / 2),
			health(2000),
			z(98),
			GameSceneTag.ANCIENT_DRAGON,
			{
				speed: 50,
			},
		]);

		this.ref.onUpdate(() => {
			if (this.ref.pos.x > width() - 256) {
				this.ref.moveTo(width() - 256, this.ref.pos.y, this.ref.speed);
			}
		});

		this.ref.play("fly");

		this.ref.onCollide(PlayerTag.PLAYER, (player) => {
			this.ref.destroy();
			player.destroy();
		});

		this.ref.onCollide(PlayerTag.BULLET, (bullet) => {
			play(SoundTag.IMPACT_BOSS, {
				volume: 0.5,
			});

			this.ref.hurt(30);

			const isDead = this.ref.hp() <= 0;

			GameHelper.addImpact(bullet, this.ref.speed);

			if (isDead) {
				this.ref.destroy();
			}

			this.ref.play("hurt");
			wait(0.5, () => this.ref.play("fly"));
			bullet.destroy();
		});

		wait(rand(1, 3), () => this.spawnShockwave());
		wait(rand(3, 5), () => this.spawnFireball());
	}

	private spawnShockwave(): void {
		const shockwave = make([
			sprite(SpriteName.SHOCKWAVE, {
				flipX: true,
				height: 64,
			}),
			area(),
			pos(width(), height() - this._gameConfig.platformHeight),
			move(LEFT, 800 * this._gameConfig.speedMultiplier),
			anchor("botleft"),
		]);

		const sound = play(SoundTag.SHOCKWAVE_BOSS_LOOP, {
			volume: 1,
			loop: true,
		});

		shockwave.play("move");

		shockwave.onCollide(PlayerTag.PLAYER, (player) => {
			shockwave.destroy();
			this.ref.destroy();
			player.destroy();
		});

		shockwave.onUpdate(() => {
			if (shockwave.pos.x + shockwave.width < 0) {
				shockwave.destroy();
			}
		});

		shockwave.onDestroy(() => sound.stop());

		add(shockwave);

		wait(rand(4, 6), () => this.spawnShockwave());
	}

	private spawnFireball(): void {
		const playerPositionY = get(PlayerTag.PLAYER)[0].pos.y;

		const fireball = make([
			sprite(SpriteName.FIRE_ORB, {
				flipX: true,
				height: 96,
			}),
			area({
				scale: vec2(0.7),
			}),
			pos(this.ref.pos.x, this.ref.pos.y),
			anchor("center"),
		]);

		fireball.play("move");

		const sound = play(SoundTag.FIRE_BALL_BOSS_LOOP, {
			volume: 0.3,
			loop: true,
		});

		fireball.onCollide(PlayerTag.PLAYER, (player) => {
			fireball.destroy();
			this.ref.destroy();
			player.destroy();
		});

		fireball.onUpdate(() => {
			fireball.moveTo(
				-500,
				playerPositionY,
				800 * this._gameConfig.speedMultiplier
			);

			if (fireball.pos.x + fireball.width < 0) {
				fireball.destroy();
			}
		});

		fireball.onDestroy(() => sound.stop());

		add(fireball);

		wait(rand(3, 7), () => this.spawnFireball());
	}
}
