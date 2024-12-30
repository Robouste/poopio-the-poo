import {
	AreaComp,
	BodyComp,
	ColorComp,
	GameObj,
	PosComp,
	RectComp,
	SpriteComp,
} from "kaplay";
import { PLATFORM_HEIGHT } from "../constants";
import { SoundTag } from "../enums/sound.enum";
import { SpriteName } from "../enums/sprite-name.enum";

export class Player {
	public ref: GameObj<SpriteComp | PosComp | AreaComp | BodyComp>;
	public jumps = 2;

	private _spriteAnimationDecrementing = true;
	private _topMotionLine: GameObj<PosComp | RectComp | ColorComp>;
	private _middleMotionLine: GameObj<PosComp | RectComp | ColorComp>;

	constructor() {}

	public init(): void {
		this.ref = add([
			sprite(SpriteName.PLAYER),
			pos(80, height() - PLATFORM_HEIGHT - 48),
			area(),
			body(),
			anchor("botleft"),
		]);

		this.ref.play("idle");

		// this._topMotionLine = this.ref.add([
		// 	rect(32, 1),
		// 	color(0, 0, 0),
		// 	pos(-20, -55),
		// ]);
		// this._middleMotionLine = this.ref.add([
		// 	rect(32, 1),
		// 	color(0, 0, 0),
		// 	pos(-30, -30),
		// ]);
		// this.ref.add([rect(32, 1), color(0, 0, 0), pos(-38, -8)]);

		onKeyPress(["space"], () => {
			this.jump();
		});

		onTouchStart(() => {
			this.jump();
		});

		this.ref.onCollide("ground", () => (this.jumps = 2));

		// loop(0.02, () => {
		// 	const minHeight = 48;
		// 	const maxHeight = 60;
		// 	let newHeight: number;

		// 	if (this._spriteAnimationDecrementing) {
		// 		newHeight = this.ref.height - 1;

		// 		if (newHeight === minHeight) {
		// 			this._spriteAnimationDecrementing = false;
		// 		}
		// 	} else {
		// 		newHeight = this.ref.height + 1;

		// 		if (newHeight === maxHeight) {
		// 			this._spriteAnimationDecrementing = true;
		// 		}
		// 	}

		// 	this._topMotionLine.pos.y = -newHeight + 5;
		// 	this._middleMotionLine.pos.y = (newHeight / 2 + 5) * -1;

		// 	this.ref.height = newHeight;
		// });
	}

	private jump(): void {
		if (this.ref.isGrounded() || this.jumps > 0) {
			this.ref.jump();
			this.jumps--;
			play(SoundTag.JUMP);
		}
	}
}
