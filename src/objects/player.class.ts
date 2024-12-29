import { AreaComp, BodyComp, GameObj, PosComp, SpriteComp } from "kaplay";
import { PLATFORM_HEIGHT } from "../constants";
import { SceneName } from "../enums";
import { SoundTag } from "../enums/sound.enum";
import { SpriteName } from "../enums/sprite-name.enum";

export class Player {
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
		this.ref = add([
			sprite(SpriteName.PLAYER),
			pos(80, height() - PLATFORM_HEIGHT),
			area(),
			body(),
			anchor("botleft"),
		]);

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
			scoreLabel.text = `Score: ${this.score}`;
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
