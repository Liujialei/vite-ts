
export interface IMenubar {
	status: boolean
	menuList: Array<IMenubarList>
}
export interface ISetting {
	usePinyinSearch: boolean
	mode: 'horizontal' | 'vertical' // 导航模式
}
export interface IUserInfo {
	name: string,
	role: string[]
}
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
export interface IStatus {
	isLoading: boolean
	ACCESS_TOKEN: string
}
export interface ILayout {
	// 左侧导航栏
	menubar: IMenubar
	// 用户信息
	userInfo: IUserInfo
	// 标签栏
	tags: ITags
	setting: ISetting
	status:IStatus
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