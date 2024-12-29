import { AreaComp, BodyComp, GameObj, PosComp, SpriteComp } from "kaplay";
import { SceneName } from "./enums";
import { SoundTag } from "./enums/sound.enum";

export class Bean {
	public ref: GameObj<SpriteComp | PosComp | AreaComp | BodyComp>;
	public jumps = 2;

	private _score = 0;
	public get score(): string {
		return this._score.toString();
	}
	public set score(value: number) {
		this._score = value;
	}

	constructor() {}

	public init(): void {
		this.ref = add([sprite("bean"), pos(80, 40), area(), body()]);

		onKeyPress(["space"], () => {
			this.jump();
		});

		onTouchStart(() => {
			this.jump();
		});

		this.ref.onCollide("ground", () => (this.jumps = 2));

		this.ref.onCollide("tree", () => {
			addKaboom(this.ref.pos);
			shake();
			go(SceneName.LOSE);
		});

		const scoreLabel = add([text(this.score), pos(24, 24)]);

		onUpdate(() => {
			this._score++;
			scoreLabel.text = this.score;
		});
	}

	private jump(): void {
		if (this.ref.isGrounded() || this.jumps > 0) {
			this.ref.jump();
			this.jumps--;
			play(SoundTag.JUMP);
		}
	}
}
