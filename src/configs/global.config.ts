import { ColorComp } from "kaplay";

export class Config {
	public static get primaryColor(): ColorComp {
		return color(52, 143, 235);
	}

	public static get backgroundColor(): ColorComp {
		return color("#201c19");
	}

	public static get containercolor(): ColorComp {
		return color("#141211");
	}
}
