import { GameSceneTag } from "../../enums/game-scene-tag.enum";
import { SpriteName } from "../../enums/sprite-name.enum";
import { DragonComp } from "../../types/ennemy.type";
import { Ennemy } from "../ennemy.class";

export class AncientDragon extends Ennemy<DragonComp> {
	protected spriteName = SpriteName.ANCIENT_DRAGON;

	constructor(protected onCollide: () => void) {
		super();

		const dragonHeight = 196;

		this.ref = make([
			sprite(this.spriteName, {
				height: dragonHeight,
			}),
			area(),
			pos(width(), height() / 2),
			health(500),
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
	}
}
