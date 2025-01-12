import { EmptyComp, GameObj, PosComp, SpriteComp, ZComp } from "kaplay";

export type GroundComp = GameObj<
	| PosComp
	| SpriteComp
	| EmptyComp
	| ZComp
	| {
			nextAdded: boolean;
	  }
>;
