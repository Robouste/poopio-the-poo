import { AreaComp, BodyComp, GameObj, PosComp, SpriteComp } from "kaplay";

export type PlayerComp = GameObj<SpriteComp | PosComp | AreaComp | BodyComp>;
