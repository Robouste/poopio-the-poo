import { Music } from "../enums/music.enum";
import { SoundTag } from "../enums/sound.enum";
import { SpriteName } from "../enums/sprite-name.enum";

export class AssetsLoader {
	public static loadSprites(): void {
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
		loadSprite(SpriteName.ENNEMY1, "sprites/toilet-paper.png");
		loadSprite(SpriteName.ENNEMY2, "sprites/plunger.png");
		loadSprite(SpriteName.TITLE, "sprites/title.png");
	}

	public static loadSounds(): void {
		loadSound(SoundTag.JUMP, "sounds/fart.mp3");
		loadSound(SoundTag.GAME_OVER, "sounds/game-over.mp3");
		loadSound(SoundTag.LEVEL_UP, "sounds/level-up.wav");
		loadSound(Music.MAIN, "musics/bgm.mp3");
	}
}
