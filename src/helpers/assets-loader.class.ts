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
		loadSprite(SpriteName.BULLET, "sprites/bullet/bullet-spritesheet.png", {
			sliceX: 10,
			sliceY: 1,
			anims: {
				move: {
					from: 0,
					to: 9,
					loop: true,
				},
			},
		});
		loadSprite(
			SpriteName.INVINCIBLE_IMPACT,
			"sprites/invincible-impact/invincible-impact-spritesheet.png",
			{
				sliceX: 9,
				sliceY: 1,
				anims: {
					impact: {
						from: 0,
						to: 8,
						loop: false,
					},
				},
			}
		);
		loadSprite(SpriteName.DRAGON, "sprites/dragon/dragon-spritesheet.png", {
			sliceX: 4,
			sliceY: 1,
			anims: {
				fly: {
					from: 0,
					to: 3,
					loop: true,
				},
			},
		});
		loadSprite(
			SpriteName.BULLET_IMPACT,
			"sprites/bullet/bullet-impact-spritesheet.png",
			{
				sliceX: 14,
				sliceY: 1,
				anims: {
					impact: {
						from: 0,
						to: 13,
						loop: false,
					},
				},
			}
		);
		loadSprite(SpriteName.CLOUD, "sprites/cloud.png");
		loadSprite(SpriteName.OBSTICLE_1, "sprites/toilet-paper.png");
		loadSprite(SpriteName.OBSTICLE_2, "sprites/plunger.png");
		loadSprite(SpriteName.CONTAINER, "sprites/container.png");
		loadSprite(SpriteName.BUTTON_PRIMARY, "sprites/button-primary.png");
		loadSprite(SpriteName.BUTTON, "sprites/button.png");
		loadSprite(SpriteName.BACKGROUND, "sprites/background.png");
		loadSprite(SpriteName.FLOOR_ROCK_1, "sprites/floors/floor-rock-1.png");
		loadSprite(
			SpriteName.FLOOR_GRASS_1,
			"sprites/floors/floor-grass-1.png"
		);
		loadSprite(SpriteName.FLOOR_ROCK_2, "sprites/floors/floor-rock-2.png");
		loadSprite(
			SpriteName.FLOOR_GRASS_2,
			"sprites/floors/floor-grass-2.png"
		);
		loadSprite(SpriteName.FLOOR_ROCK_3, "sprites/floors/floor-rock-3.png");
		loadSprite(
			SpriteName.FLOOR_GRASS_3,
			"sprites/floors/floor-grass-3.png"
		);
		loadSprite(SpriteName.FLOOR_ROCK_4, "sprites/floors/floor-rock-4.png");
		loadSprite(
			SpriteName.FLOOR_GRASS_4,
			"sprites/floors/floor-grass-4.png"
		);
		loadSprite(SpriteName.FLOOR_ROCK_5, "sprites/floors/floor-rock-5.png");
		loadSprite(
			SpriteName.FLOOR_GRASS_5,
			"sprites/floors/floor-grass-5.png"
		);
		loadSprite(SpriteName.FLOOR_ROCK_6, "sprites/floors/floor-rock-6.png");
		loadSprite(
			SpriteName.FLOOR_GRASS_6,
			"sprites/floors/floor-grass-6.png"
		);
		loadSprite(SpriteName.GAME_OVER, "sprites/game-over.png");
	}

	public static loadSounds(): void {
		loadSound(SoundTag.JUMP, "sounds/jump.wav");
		loadSound(SoundTag.DOUBLE_JUMP, "sounds/double-jump.wav");
		loadSound(SoundTag.GAME_OVER, "sounds/game-over.mp3");
		loadSound(SoundTag.LEVEL_UP, "sounds/level-up.wav");
		loadSound(Music.MAIN, "musics/bgm.mp3");
		loadSound(SoundTag.FIRE, "sounds/fire.mp3");
		loadSound(SoundTag.IMPACT_INVINCIBLE, "sounds/invincible.mp3");
		loadSound(SoundTag.IMPACT, "sounds/impact.wav");
	}
}
