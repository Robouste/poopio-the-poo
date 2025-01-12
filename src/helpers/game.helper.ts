import {
	Anchor,
	AreaComp,
	ColorComp,
	Comp,
	GameObj,
	PosComp,
	RectComp,
	SpriteComp,
} from "kaplay";
import { Config } from "../configs/global.config";
import { SpriteName } from "../enums/sprite-name.enum";

export class GameHelper {
	public static addBackground(
		bgColor: ColorComp = Config.blueColor
	): GameObj<RectComp | PosComp | ColorComp> {
		return add([rect(width(), height()), pos(0, 0), bgColor]);
	}

	public static makeButton(params: {
		type: "primary" | "secondary";
		text: string;
		anchorPos: Anchor;
		size?: {
			width: number;
			height: number;
		};
		action: () => void;
	}): GameObj<SpriteComp | AreaComp> {
		const spriteComp = sprite(SpriteName.BUTTON_PRIMARY);

		if (params.size) {
			spriteComp.width = params.size.width;
			spriteComp.height = params.size.height;
		}

		const button = make([spriteComp, area(), anchor(params.anchorPos)]);

		button.add([text(params.text), pos(0, 0), anchor(params.anchorPos)]);

		button.onClick(params.action);
		button.onHover(() => {
			setCursor("pointer");
			button.use(opacity(0.8));
		});
		button.onHoverEnd(() => {
			setCursor("default");
			button.use(opacity(1));
		});

		return button;
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
		]);

		impact.play("impact");
		impact.onAnimEnd(() => impact.destroy());
	}
}
