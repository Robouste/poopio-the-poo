import { SpriteName } from "../enums/sprite-name.enum";
import { EnnemyComp } from "../types/ennemy.type";

export abstract class Ennemy<T extends EnnemyComp> {
	public ref: T;
	protected abstract spriteName: SpriteName;

	public add(): void {
		add(this.ref);
	}
}
