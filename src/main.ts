import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix
import { SceneName } from "./enums";
import { SoundTag } from "./enums/sound.enum";
import { SpriteName } from "./enums/sprite-name.enum";
import { Player } from "./objects/player.class";
import { GameOverScene } from "./scenes/game-over.scene";
import { GameScene } from "./scenes/game.scene";

kaplay();

loadRoot("./"); // A good idea for Itch.io publishing later
loadSprite(SpriteName.PLAYER, "sprites/player.png");
loadSprite(SpriteName.CLOUD, "sprites/cloud.png");
loadSound(SoundTag.JUMP, "sounds/fart.mp3");
loadSound(SoundTag.GAME_OVER, "sounds/game-over.mp3");

// background
add([rect(width(), height()), pos(0, 0), color(52, 143, 235)]);

const bean = new Player();

scene(SceneName.GAME, () => {
	new GameScene(bean);
});

scene(SceneName.LOSE, () => {
	new GameOverScene(bean);
});

go(SceneName.GAME);
