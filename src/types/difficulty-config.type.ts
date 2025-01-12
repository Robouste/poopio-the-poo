export type DifficultyConfig = {
	obsticle?: SpawnSettings;
	dragon?: DragonSpawnSettings;
	cloud?: SpawnSettings;
	isBossLevel?: boolean;
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
