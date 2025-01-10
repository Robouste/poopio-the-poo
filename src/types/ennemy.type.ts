import {
	AnchorComp,
	AreaComp,
	EmptyComp,
	GameObj,
	HealthComp,
	OutlineComp,
	PosComp,
	SpriteComp,
} from "kaplay";

export type Obsticle = GameObj<
	| SpriteComp
	| PosComp
	| AreaComp
	| OutlineComp
	| AnchorComp
	| EmptyComp
	| {
			time: number;
			speed: number;
	  }
>;

export type Dragon = GameObj<
	| PosComp
	| SpriteComp
	| AreaComp
	| HealthComp
	| {
			speed: number;
	  }
>;
