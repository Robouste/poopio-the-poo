import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix
import { SceneName } from "./enums";
import { Music } from "./enums/music.enum";
import { SoundTag } from "./enums/sound.enum";
import { SpriteName } from "./enums/sprite-name.enum";
import { GameOverScene } from "./scenes/game-over.scene";
import { GameScene } from "./scenes/game.scene";
import { MainMenuScene } from "./scenes/main-menu.scene";

kaplay();

loadRoot("./"); // A good idea for Itch.io publishing later
loadSprite(SpriteName.PLAYER, "sprites/player/idle-and-jump.png", {
	sliceX: 28,
	sliceY: 1,
	anims: {
		idle: {
			from: 0,
			to: 17,
			loop: true,
		},
		jump: {
			from: 21,
			to: 23,
			loop: false,
		},
	},
});
loadSprite(SpriteName.CLOUD, "sprites/cloud.png");
loadSound(SoundTag.JUMP, "sounds/fart.mp3");
loadSound(SoundTag.GAME_OVER, "sounds/game-over.mp3");
loadSound(Music.MAIN, "musics/bgm.mp3");

scene(SceneName.MAIN_MENU, () => {
	new MainMenuScene();
});

scene(SceneName.GAME, () => {
	new GameScene();
});

scene(SceneName.GAME_OVER, (params: { score: number }) => {
	new GameOverScene(params.score);
});

go(SceneName.MAIN_MENU);
