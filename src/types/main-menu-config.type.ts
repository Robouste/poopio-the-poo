export type MainMenuConfig = {
	jumpControl: string;
	shootControl: string;
	textSize: number;
	gap: number;
	container: MenuContainer;
	titleMarginTop: number;
};

export type MenuContainer = {
	width: number;
	height: number;
	yPos: number;
	gap: number;
};
