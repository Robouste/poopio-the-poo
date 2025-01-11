import { MainMenuConfig } from "../types/main-menu-config.type";

export const getDesktopMainMenuConfig = (): MainMenuConfig => ({
	jumpControl: "Space or left mouse",
	shootControl: "Enter or right mouse",
	controlsContainer: {
		width: 400,
		height: 190,
		yPos: height() / 2 - 64,
	},
	textSize: 24,
	gap: 64,
});

export const getMobileMainMenuConfig = (): MainMenuConfig => ({
	jumpControl: "Tap left",
	shootControl: "Tap right",
	controlsContainer: {
		width: width() * 0.8,
		height: 190,
		yPos: height() / 2 - 64,
	},
	textSize: 24,
	gap: 64,
});
