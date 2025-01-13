import { ColorComp, Comp, GameObj, PosComp, RectComp } from "kaplay";
import { Config } from "../configs";
import { GameSceneTag, SpriteName } from "../enums";

export class GameHelper {
	public static addBackground(
		bgColor: ColorComp = Config.blueColor
	): GameObj<RectComp | PosComp | ColorComp> {
		return add([rect(width(), height()), pos(0, 0), bgColor]);
	}

	public static objectHasComponent<T extends Comp>(
		obj: GameObj,
		compName: string
	): obj is GameObj<T> {
		return obj.has(compName);
	}

	public static addImpact(bullet: GameObj, speed: number): void {
		const impact = add([
			sprite(SpriteName.BULLET_IMPACT),
			pos(bullet.pos.x, bullet.pos.y - bullet.height),
			area(),
			move(LEFT, speed),
			GameSceneTag.TO_DESTROY,
		]);

		impact.play("impact");
		impact.onAnimEnd(() => impact.destroy());
	}
}
