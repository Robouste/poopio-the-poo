import { GameSceneTag, SpriteName } from "../enums";
import { EnnemyComp, GameConfigComp } from "../types";

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
