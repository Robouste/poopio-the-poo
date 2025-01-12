import { SpriteName } from "../enums/sprite-name.enum";

export type DifficultyConfig = {
	obsticle: SpawnSettings;
	dragon: DragonSpawnSettings;
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

export type DragonSpawnSettings = SpawnSettings & {
	amount: number;
	health: number;
};
