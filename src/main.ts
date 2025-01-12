import kaplay, { AudioPlay } from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix
import { SceneName } from "./enums";
import { AssetsLoader } from "./helpers/assets-loader.class";
import { GameOverScene } from "./scenes/game-over.scene";
import { GameScene } from "./scenes/game.scene";
import { MainMenuScene } from "./scenes/main-menu.scene";

kaplay();

loadRoot("./"); // A good idea for Itch.io publishing later

AssetsLoader.loadSprites();
AssetsLoader.loadSounds();

scene(SceneName.MAIN_MENU, () => {
	new MainMenuScene();
});

scene(SceneName.GAME, () => {
	new GameScene();
});

scene(SceneName.GAME_OVER, (params: { score: number; bgm: AudioPlay }) => {
	new GameOverScene(params.score, params.bgm);
});

go(SceneName.MAIN_MENU);
// go(SceneName.GAME_OVER, { score: 0, bgm: undefined });
