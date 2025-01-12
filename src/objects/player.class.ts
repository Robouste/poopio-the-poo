import { getDesktopGameConfig, getMobileGameConfig } from "../configs";
import { GameSceneTag, PlayerTag, SoundTag, SpriteName } from "../enums";
import { DebugHelper } from "../helpers";
import { GameConfig, PlayerComp } from "../types";

export class Player {
	public ref: PlayerComp;
	public jumps = 2;

	private _config: GameConfig = DebugHelper.isMobile
		? getMobileGameConfig()
		: getDesktopGameConfig();

	constructor() {
		this.ref = make([
			sprite(SpriteName.PLAYER),
			pos(80, height() - this._config.platformHeight - 48),
			area(),
			body(),
			anchor("botleft"),
			PlayerTag.PLAYER,
			z(99),
		]);
	}

	public init(): void {
		add(this.ref);

		this.ref.play("idle");

		onKeyPress(["space"], () => this.jump());

		onMousePress((button) => {
			// for some reason, mouse press is triggered on mobile touch
			if (DebugHelper.isMobile) {
				return;
			}

			switch (button) {
				case "left":
					this.jump();
					break;
				case "right":
					this.fire();
					break;
			}
		});

		onKeyPress(["enter"], () => this.fire());

		onTouchStart((pos) => {
			if (pos.x < width() / 2) {
				this.jump();
			} else {
				this.fire();
			}
		});

		this.ref.onCollide(GameSceneTag.GROUND, () => {
			this.jumps = 2;
			this.ref.play("idle");
		});
	}

	private jump(): void {
		if (this.ref.isGrounded() || this.jumps > 0) {
			this.ref.play("jump");
			this.ref.jump(700);

			if (this.jumps === 2) {
				play(SoundTag.JUMP, {
					volume: 0.7,
				});
			} else {
				play(SoundTag.DOUBLE_JUMP, {
					volume: 0.7,
				});
			}

			this.jumps--;
		}
	}

	private fire(): void {
		play(SoundTag.FIRE, {
			volume: 0.5,
		});

		const bullet = add([
			sprite(SpriteName.BULLET),
			pos(this.ref.pos.x, this.ref.pos.y - this.ref.height / 2),
			area(),
			move(RIGHT, 1000),
			PlayerTag.BULLET,
		]);

		bullet.play("move");
	}
}
