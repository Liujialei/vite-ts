import { defineComponent } from 'vue';

//路由添加字符验证

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

interface metaSettings{
	title?:string,
	hidden?:boolean
}

interface defaultRule{
	path:string,
	name:string,
	redirect?:string,
	component?:Component,
	meta?:metaSettings
}