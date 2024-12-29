import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix
import { Bean } from "./bean.class";
import { SceneName } from "./enums";
import { SoundTag } from "./enums/sound.enum";
import { GameOverScene } from "./scenes/game-over.scene";
import { GameScene } from "./scenes/game.scene";

kaplay();

loadRoot("./"); // A good idea for Itch.io publishing later
loadSprite("bean", "sprites/bean.png");
loadSound(SoundTag.JUMP, "sounds/fart.mp3");
loadSound(SoundTag.GAME_OVER, "sounds/game-over.mp3");

// background
add([rect(width(), height()), pos(0, 0), color(52, 143, 235)]);

const bean = new Bean();

scene(SceneName.GAME, () => {
	new GameScene(bean);
});

scene(SceneName.LOSE, () => {
	new GameOverScene(bean);
});

go(SceneName.GAME);
