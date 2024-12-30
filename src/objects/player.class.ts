import { AreaComp, BodyComp, GameObj, PosComp, SpriteComp } from "kaplay";
import { PLATFORM_HEIGHT } from "../constants";
import { SoundTag } from "../enums/sound.enum";
import { SpriteName } from "../enums/sprite-name.enum";

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
		]);

		this.ref.play("idle");

		onKeyPress(["space"], () => {
			this.jump();
		});

		onTouchStart(() => {
			this.jump();
		});

		this.ref.onCollide("ground", () => {
			this.jumps = 2;
			this.ref.play("idle");
		});
	}

	private jump(): void {
		if (this.ref.isGrounded() || this.jumps > 0) {
			this.ref.play("jump");
			this.ref.jump();
			this.jumps--;
			play(SoundTag.JUMP);
		}
	}
}
