import {
	DifficultyConfig,
	DragonDifficulty,
	SpawnSettings,
} from "../types/difficulty-config.type";

export const getDifficultyConfig = (level: number): DifficultyConfig => {
	const obsticleDifficulty: SpawnSettings = {
		minWait: 1.2 - level * 0.07,
		maxWait: 1.8 - level * 0.07,
		speed: 300 + level * 100,
	};

	// increase health by 30 every 5 levels
	const dragonHealth = 60 + Math.floor(level / 5) * 30;

	const dragonDifficulty: DragonDifficulty = {
		minWait: 5 - level * 0.3,
		maxWait: 10 - level * 0.3,
		speed: 100 + level * 100,
		amount: 1 + Math.floor(level / 2),
		health: dragonHealth,
	};

	const cloudDifficulty: SpawnSettings = {
		minWait: 1 - level * 0.03,
		maxWait: 3 - level * 0.03,
		speed: 50 * level,
	};

	return {
		obsticle: obsticleDifficulty,
		dragon: dragonDifficulty,
		cloud: cloudDifficulty,
	};
};
