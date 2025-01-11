import { SpriteName } from "../enums/sprite-name.enum";

export type DifficultyConfig = {
	obsticle: SpawnSettings;
	dragon: DragonDifficulty;
	cloud: SpawnSettings;
	boss?: {
		sprite: SpriteName;
		health: number;
	};
};

export type SpawnSettings = {
	minWait: number;
	maxWait: number;
	speed: number;
};

export type DragonDifficulty = SpawnSettings & {
	amount: number;
	health: number;
};
