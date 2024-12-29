import {
	Anchor,
	AnchorComp,
	AreaComp,
	Color,
	ColorComp,
	GameObj,
	OutlineComp,
	PosComp,
	RectComp,
	Vec2,
} from "kaplay";
import { PRIMARY_COLOR } from "./constants";

export class GameHelper {
	public static addBackground(): void {
		// background
		add([rect(width(), height()), pos(0, 0), color(...PRIMARY_COLOR)]);
	}

	public static createButton(params: {
		width: number;
		height: number;
		primaryColor: Color;
		secondaryColor: Color;
		posX: number;
		posY: number;
		anchor?: Anchor | Vec2;
		text: string;
		onClick: () => void;
	}): GameObj<
		RectComp | PosComp | ColorComp | OutlineComp | AnchorComp | AreaComp
	> {
		const button = add([
			rect(params.width, params.height),
			outline(4, params.secondaryColor),
			pos(params.posX, params.posY),
			anchor(params.anchor ?? "topleft"),
			area(),
			color(params.secondaryColor),
		]);

		button.add([
			text(params.text),
			pos(0, 0),
			color(params.primaryColor),
			"text",
			anchor("center"),
		]);

		// const textObj = add([
		// 	text(params.text),
		// 	pos(button.pos.x, button.pos.y + 4),
		// 	color(params.primaryColor),
		// 	anchor("center"),
		// ]);

		button.onHover(() => {
			setCursor("pointer");
			button.color = params.primaryColor;
			button.children[0].color = params.secondaryColor;
		});

		button.onHoverEnd(() => {
			setCursor("default");
			button.color = params.secondaryColor;
			button.children[0].color = params.primaryColor;
		});

		button.onClick(() => params.onClick());

		return button;
	}
}
