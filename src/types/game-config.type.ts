import { GameObj } from "kaplay";

export type GameConfig = {
	platformHeight: number;
	speedMultiplier: number;
};

export type GameConfigComp = GameObj<GameConfig>;
