import { Music, SoundTag, SpriteName } from "../enums";

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
			sliceY: 2,
			anims: {
				fly: {
					from: 0,
					to: 3,
					loop: true,
				},
				hurt: {
					from: 4,
					to: 5,
					loop: false,
				},
			},
		});
		loadSprite(
			SpriteName.ANCIENT_DRAGON,
			"sprites/dragon/ancient-dragon-spritesheet.png",
			{
				sliceX: 4,
				sliceY: 2,
				anims: {
					fly: {
						from: 0,
						to: 3,
						loop: true,
					},
					hurt: {
						from: 4,
						to: 5,
						loop: false,
					},
				},
			}
		);
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
		loadSprite(
			SpriteName.FIRE_ORB,
			"sprites/bullet/fire-orb-spritesheet.png",
			{
				sliceX: 8,
				sliceY: 1,
				anims: {
					move: {
						from: 0,
						to: 7,
						loop: true,
					},
				},
			}
		);
		loadSprite(
			SpriteName.SHOCKWAVE,
			"sprites/bullet/shockwave-spritesheet.png",
			{
				sliceX: 5,
				sliceY: 1,
				anims: {
					move: {
						from: 0,
						to: 4,
						loop: true,
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
		loadSound(SoundTag.FIRE, "sounds/fire.mp3");
		loadSound(SoundTag.IMPACT_INVINCIBLE, "sounds/invincible.mp3");
		loadSound(SoundTag.IMPACT, "sounds/impact.wav");
		loadSound(SoundTag.IMPACT_BOSS, "sounds/impact-boss.wav");
		loadSound(
			SoundTag.FIRE_BALL_BOSS_LOOP,
			"sounds/fire-ball-boss-loop.mp3"
		);
		loadSound(
			SoundTag.SHOCKWAVE_BOSS_LOOP,
			"sounds/shockwave-boss-loop.mp3"
		);

		loadSound(Music.MAIN, "musics/bgm.mp3");
		loadSound(Music.BOSS, "musics/boss.mp3");
	}
}
