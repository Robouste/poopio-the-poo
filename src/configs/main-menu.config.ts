import { MainMenuConfig } from "../types/main-menu-config.type";

export const getDesktopMainMenuConfig = (): MainMenuConfig => ({
	jumpControl: "Space or left mouse",
	shootControl: "Enter or right mouse",
	container: {
		width: 800,
		height: height() * 0.9,
		yPos: height() / 2,
		gap: 16,
	},
	textSize: 24,
	gap: 64,
	titleMarginTop: 36,
});

export const getMobileMainMenuConfig = (): MainMenuConfig => ({
	jumpControl: "Tap left",
	shootControl: "Tap right",
	container: {
		width: width() * 0.8,
		height: height() * 0.7,
		yPos: height() / 2,
		gap: 16,
	},
	textSize: 36,
	gap: 64,
	titleMarginTop: 56,
});
