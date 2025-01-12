import { SpriteName } from "../enums";
import { GameConfig } from "../types";

export const getDesktopGameConfig = (): GameConfig => ({
	platformHeight: 128,
	speedMultiplier: 1,
});

export const getMobileGameConfig = (): GameConfig => ({
	platformHeight: height() / 3,
	speedMultiplier: 0.7,
});

export const getGrassSprite = (level: number): SpriteName => {
	const map: Record<number, SpriteName> = {
		1: SpriteName.FLOOR_GRASS_1,
		2: SpriteName.FLOOR_GRASS_2,
		3: SpriteName.FLOOR_GRASS_3,
		4: SpriteName.FLOOR_GRASS_4,
		5: SpriteName.FLOOR_GRASS_5,
	};

	if (level > 5) {
		return SpriteName.FLOOR_GRASS_6;
	}

	return map[level];
};

export const getRockSprite = (level: number): SpriteName => {
	const map: Record<number, SpriteName> = {
		1: SpriteName.FLOOR_ROCK_1,
		2: SpriteName.FLOOR_ROCK_2,
		3: SpriteName.FLOOR_ROCK_3,
		4: SpriteName.FLOOR_ROCK_4,
		5: SpriteName.FLOOR_ROCK_5,
	};

	if (level > 5) {
		return SpriteName.FLOOR_ROCK_6;
	}

	return map[level];
};
