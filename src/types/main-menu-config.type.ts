export type MainMenuConfig = {
	jumpControl: string;
	shootControl: string;
	textSize: number;
	gap: number;
	controlsContainer: ControlsContainerParams;
};

export type ControlsContainerParams = {
	width: number;
	height: number;
	yPos: number;
};
