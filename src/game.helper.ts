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
import { PRIMARY_COLOR } from "./constants";
import { SpriteName } from "./enums/sprite-name.enum";
import { RGBColor } from "./types/rgb-color.type";

export class GameHelper {
	public static addBackground(
		bgColor: RGBColor = PRIMARY_COLOR
	): GameObj<RectComp | PosComp | ColorComp> {
		// background

		return add([
			rect(width(), height()),
			pos(0, 0),
			color(bgColor.r, bgColor.g, bgColor.b),
		]);
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
		const spriteName =
			params.type === "primary"
				? SpriteName.BUTTON_PRIMARY
				: SpriteName.BUTTON_SECONDARY;

		const spriteComp = sprite(spriteName);

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
}
