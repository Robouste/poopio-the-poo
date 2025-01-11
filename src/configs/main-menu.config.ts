import { MainMenuConfig } from "../types/main-menu-config.type";

export const getDesktopMainMenuConfig = (): MainMenuConfig => ({
	jumpControl: "Space or left mouse",
	shootControl: "Enter or right mouse",
	controlsContainer: {
		width: 800,
		height: height() * 0.9,
		yPos: height() / 2,
	},
	textSize: 24,
	gap: 64,
});

export const getMobileMainMenuConfig = (): MainMenuConfig => ({
	jumpControl: "Tap left",
	shootControl: "Tap right",
	controlsContainer: {
		width: width() * 0.8,
		height: height() * 0.7,
		yPos: height() / 2,
	},
	textSize: 24,
	gap: 64,
});
