
export interface IUserInfo {}
export interface ITagsList {
	name: string
	title: string
	path: string
	isActive: boolean
}
export interface ITags {
	tagsList: Array<ITagsList>
	cachedViews: string[]
	isNocacheView: boolean
}
export interface IMenuRouteList{
	
}
export interface ILayout {
	IdentifyCode:string,
	headersId:string,
	// 用户信息
	userInfo: IUserInfo,
	menuList:Array<IMenuRouteList>,
	// 标签栏
	tags: ITags
}

//左导航字段定义规范
export interface IMenubarList {
	parentId?: number | string
	id?: number | string
	name: string
	path: string
	redirect?: string | {name: string}
	meta?: {
			icon?: string 
			title: string
			permission?: string[]
			activeMenu?: string // 路由设置了该属性，则会高亮相对应的侧边栏
			noCache?: boolean // 页面是否不缓存
			hidden?: boolean // 是否隐藏路由
			alwaysShow?: boolean // 当子路由只有一个的时候是否显示当前路由
	}
	component?: (() => Promise<typeof import('*.vue')>) | string
	children?: Array<IMenubarList>
}
