import { GameSceneTag } from "../enums/game-scene-tag.enum";
import { SpriteName } from "../enums/sprite-name.enum";
import { EnnemyComp } from "../types/ennemy.type";
import { GameConfigComp } from "../types/game-config.type";

export abstract class Ennemy<T extends EnnemyComp> {
	public ref!: T;
	protected abstract spriteName: SpriteName;

	protected get _gameConfig(): GameConfigComp {
		return get(GameSceneTag.GAME_CONFIG)[0] as GameConfigComp;
	}

	public add(): void {
		add(this.ref);
	}
}
