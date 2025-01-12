import {
	AnchorComp,
	AreaComp,
	EmptyComp,
	GameObj,
	HealthComp,
	PosComp,
	SpriteComp,
} from "kaplay";

export type EnnemyComp = GameObj<SpriteComp | PosComp | AreaComp>;

export type ObsticleComp = GameObj<
	| SpriteComp
	| PosComp
	| AreaComp
	| AnchorComp
	| EmptyComp
	| {
			time: number;
			speed: number;
	  }
>;

export type DragonComp = GameObj<
	| PosComp
	| SpriteComp
	| AreaComp
	| HealthComp
	| {
			speed: number;
	  }
>;
