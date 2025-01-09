import {
	Anchor,
	AnchorComp,
	AreaComp,
	ColorComp,
	GameObj,
	OutlineComp,
	PosComp,
	RectComp,
	Vec2,
} from "kaplay";
import { PRIMARY_COLOR } from "./constants";
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

	public static createButton(params: {
		width: number;
		height: number;
		primaryColor: RGBColor;
		secondaryColor: RGBColor;
		posX: number;
		posY: number;
		anchor?: Anchor | Vec2;
		text: string;
		onClick: () => void;
	}): GameObj<
		RectComp | PosComp | ColorComp | OutlineComp | AnchorComp | AreaComp
	> {
		const primaryColor = new Color(
			params.primaryColor.r,
			params.primaryColor.g,
			params.primaryColor.b
		);
		const secondaryColor = new Color(
			params.secondaryColor.r,
			params.secondaryColor.g,
			params.secondaryColor.b
		);
		const button = add([
			rect(params.width, params.height),
			outline(4, secondaryColor),
			pos(params.posX, params.posY),
			anchor(params.anchor ?? "topleft"),
			area(),
			color(secondaryColor),
		]);

		button.add([
			text(params.text),
			pos(0, 0),
			color(primaryColor),
			"text",
			anchor("center"),
		]);

		button.onHover(() => {
			setCursor("pointer");
			button.color = primaryColor;
			button.children[0].color = secondaryColor;
		});

		button.onHoverEnd(() => {
			setCursor("default");
			button.color = secondaryColor;
			button.children[0].color = primaryColor;
		});

		button.onClick(() => params.onClick());

		return button;
	}
}
