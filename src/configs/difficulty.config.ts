import { DifficultyConfig, DragonSpawnSettings, SpawnSettings } from "../types";

export const getDifficultyConfig = (
	level: number,
	speedMultiplier: number
): DifficultyConfig => {
	if (level === 2) {
		return {
			isBossLevel: true,
			dragon: {
				amount: 2,
				health: 90,
				minWait: 5,
				maxWait: 5,
				speed: 300 * speedMultiplier,
			},
		};
	}

	const obsticleSettings: SpawnSettings = {
		minWait: 1.2 - level * 0.07,
		maxWait: 1.8 - level * 0.07,
		speed: 300 + level * 100 * speedMultiplier,
	};

	// increase health by 30 every 5 levels
	const dragonHealth = 60 + Math.floor(level / 5) * 30;

	const dragonSettings: DragonSpawnSettings = {
		minWait: 5 - level * 0.3,
		maxWait: 10 - level * 0.3,
		speed: 100 + level * 100 * speedMultiplier,
		amount: 1 + Math.floor(level / 3),
		health: dragonHealth,
	};

	const cloudSettings: SpawnSettings = {
		minWait: 1 - level * 0.03,
		maxWait: 3 - level * 0.03,
		speed: 50 * level,
	};

	return {
		obsticle: obsticleSettings,
		dragon: dragonSettings,
		cloud: cloudSettings,
	};
};
