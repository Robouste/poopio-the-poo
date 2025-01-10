import { AreaComp, BodyComp, GameObj, PosComp, SpriteComp } from "kaplay";
import { PLATFORM_HEIGHT } from "../constants";
import { GameSceneTag } from "../enums/game-scene-tag.enum";
import { PlayerTag } from "../enums/player-tag.enum";
import { SoundTag } from "../enums/sound.enum";
import { SpriteName } from "../enums/sprite-name.enum";
import { Dragon, Obsticle } from "../types/ennemy.type";

export class Player {
	public ref: GameObj<SpriteComp | PosComp | AreaComp | BodyComp>;
	public jumps = 2;

	constructor() {}

	public init(): void {
		this.ref = add([
			sprite(SpriteName.PLAYER),
			pos(80, height() - PLATFORM_HEIGHT - 48),
			area(),
			body(),
			anchor("botleft"),
			PlayerTag.PLAYER,
		]);

		this.ref.play("idle");

		onKeyPress(["space"], () => this.jump());

		onKeyPress(["enter"], () => this.fire());

		onTouchStart((pos) => {
			if (pos.x < width() / 2) {
				this.jump();
			} else {
				this.fire();
			}
		});

		this.ref.onCollide("ground", () => {
			this.jumps = 2;
			this.ref.play("idle");
		});
	}

	private jump(): void {
		if (this.ref.isGrounded() || this.jumps > 0) {
			this.ref.play("jump");
			this.ref.jump(700);
			this.jumps--;
			play(SoundTag.JUMP);
		}
	}

	private fire(): void {
		play(SoundTag.FIRE);

		const bullet = add([
			sprite(SpriteName.BULLET),
			pos(this.ref.pos.x, this.ref.pos.y - this.ref.height / 2),
			area(),
			move(RIGHT, 1000),
			PlayerTag.BULLET,
		]);

		bullet.play("move");

		bullet.onCollide(GameSceneTag.OBSTICLE, (obsticle: Obsticle) => {
			play(SoundTag.IMPACT_INVINCIBLE, {
				volume: 0.8,
			});

			const impact = add([
				sprite(SpriteName.INVINCIBLE_IMPACT),
				pos(bullet.pos.x, bullet.pos.y - bullet.height),
				area(),
				move(LEFT, obsticle.speed),
			]);

			impact.onAnimEnd(() => impact.destroy());

			impact.play("impact");
			destroy(bullet);
		});

		bullet.onCollide(GameSceneTag.DRAGON, (dragon: Dragon) => {
			play(SoundTag.IMPACT, {
				volume: 0.8,
			});

			dragon.hurt(30);

			const dragonIsDead = dragon.hp() <= 0;

			const impact = add([
				sprite(SpriteName.BULLET_IMPACT),
				pos(bullet.pos.x, bullet.pos.y - bullet.height),
				area(),
				move(LEFT, dragon.speed),
			]);

			if (dragonIsDead) {
				dragon.destroy();
			}

			impact.play("impact");
			impact.onAnimEnd(() => impact.destroy());
			destroy(bullet);
		});
	}
}
