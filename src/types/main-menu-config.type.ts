export type MainMenuConfig = {
	jumpControl: string;
	shootControl: string;
	textSize: number;
	gap: number;
	controlsContainer: ControlsContainerParams;
	titleMarginTop: number;
};

export type ControlsContainerParams = {
	width: number;
	height: number;
	yPos: number;
};
