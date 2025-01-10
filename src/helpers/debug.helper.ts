export class DebugHelper {
	public static get isDevMode(): boolean {
		return window.location.hostname === "localhost";
	}
}
