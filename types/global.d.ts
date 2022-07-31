//定义全局声明

declare global{
	type Recordable<T = any> = Record<string, T>;
	
	interface ViteEnv {
		VITE_PORT: number;
		VITE_PREVIEW_PORT: number;
		VITE_USE_MOCK: boolean;
		VITE_PUBLIC_PATH: string;
		VITE_GLOB_APP_TITLE: string;
		VITE_GLOB_APP_SHORT_NAME: string;
		VITE_USE_CDN: boolean;
		VITE_DROP_CONSOLE: boolean;
	}
	interface IObject<T> {
		[index: string]: T
	}
	interface IResponse<T = any> {
		Code: number;
		Msg: string;
		Data: T;
	}
}
export {}
