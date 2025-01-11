import { GameConfig } from "../types/game-config.type";

export const getDesktopGameConfig = (): GameConfig => ({
	platformHeight: 128,
});

export const getMobileGameConfig = (): GameConfig => ({
	platformHeight: height() / 6,
});
