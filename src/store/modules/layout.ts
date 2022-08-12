import { defineStore } from 'pinia'
import { ILayout, ITagsList, IMenubarList, ISetting, IMenubar, IStatus, ITags, IUserInfo } from '@/type/store/layout'
import { setLocal, getLocal, decode } from '@/utils/tools'
import router from '@/router'
import { generatorDynamicRouter } from '@/router/asyncRouter'
import { allowRouter } from "@/router/constantRoutes"
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { login, loginParam, getRouterList, getUser } from '@/api/layout'
import { ElMessage } from 'element-plus'
import qs from 'qs'

const setting = getLocal<ISetting>('setting')
//获取token
const { ACCESS_TOKEN } = getLocal<IStatus>('token')

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useLayoutStore = defineStore({
  id: 'layout',
  state: ():ILayout => ({
    menubar: {
      status: true,
      menuList: []
    },
    // 用户信息
    userInfo: {
      name: '',
      role: []
    },
    // 标签栏
    tags: {
      tagsList: [],
      cachedViews: [],
      isNocacheView: false
    },
    setting: {
      theme: setting.theme !== undefined ? setting.theme : 0,
      showTags: setting.showTags !== undefined ? setting.showTags : true,
      color: {
        primary: setting.color !== undefined ? setting.color.primary : '#409eff'
      },
      usePinyinSearch: setting.usePinyinSearch !== undefined ? setting.usePinyinSearch : false,
      mode: setting.mode || 'vertical'
    },
    //获取token认证信息
    status: {
      isLoading: false,
      ACCESS_TOKEN: ACCESS_TOKEN || ''
    }
  }),
  getters: {
    getMenubar():IMenubar {
      return this.menubar
    },
    getUserInfo():IUserInfo {
      return this.userInfo
    },
    getTags():ITags {
      return this.tags
    },
    getSetting():ISetting {
      return this.setting
    },
    //获取token认证信息
    getStatus():IStatus {
      return this.status
    }
  },
  actions:{
    changeCollapsed():void {
      this.menubar.status = !this.menubar.status
    },
    changeDeviceWidth():void {
			//浏览器缩放处理
			// this.menubar.status = !this.menubar.status
    },
    // 切换导航，记录打开的导航
    changeTagNavList(cRouter:RouteLocationNormalizedLoaded):void {
      if(!this.setting.showTags) return // 判断是否开启多标签页
      // if(cRouter.meta.hidden && !cRouter.meta.activeMenu) return // 隐藏的菜单如果不是子菜单则不添加到标签
      if(new RegExp('^\/redirect').test(cRouter.path)) return
      const index = this.tags.tagsList.findIndex(v => v.path === cRouter.path)
      this.tags.tagsList.forEach(v => v.isActive = false)
      // 判断页面是否打开过
      if(index !== -1) {
        this.tags.tagsList[index].isActive = true
        return
      }
      const tagsList:ITagsList = {
        name: cRouter.name as string,
        title: cRouter.meta.title as string,
        path: cRouter.path,
        isActive: true
      }
      this.tags.tagsList.push(tagsList)
    },
    removeTagNav(obj:{tagsList:ITagsList, cPath: string}):void {
      const index = this.tags.tagsList.findIndex(v => v.path === obj.tagsList.path)
      if(this.tags.tagsList[index].path === obj.cPath) {
        this.tags.tagsList.splice(index, 1)
        const i = index === this.tags.tagsList.length ? index - 1 : index
        this.tags.tagsList[i].isActive = true
        this.removeCachedViews({ name: obj.tagsList.name, index })
        router.push({ path: this.tags.tagsList[i].path })
      }else{
        this.tags.tagsList.splice(index, 1)
        this.removeCachedViews({ name: obj.tagsList.name, index })
      }
    },
    removeOtherTagNav(tagsList:ITagsList):void {
      const index = this.tags.tagsList.findIndex(v => v.path === tagsList.path)
      this.tags.tagsList.splice(index + 1)
      this.tags.tagsList.splice(0, index)
      this.tags.cachedViews.splice(index + 1)
      this.tags.cachedViews.splice(0, index)
      router.push({ path: tagsList.path })
    },
    removeAllTagNav():void {
      this.tags.tagsList.splice(0)
      this.tags.cachedViews.splice(0)
      router.push({ path: '/redirect/' })
    },
    // 添加缓存页面
    addCachedViews(obj: {name: string, noCache: boolean}):void {
      if(!this.setting.showTags) return // 判断是否开启多标签页
      if(obj.noCache || this.tags.cachedViews.includes(obj.name)) return
      this.tags.cachedViews.push(obj.name)
    },
    // 删除缓存页面
    removeCachedViews(obj: { name: string, index: number }):void {
      // 判断标签页是否还有该页面
      if(this.tags.tagsList.map(v => v.name).includes(obj.name)) return
      this.tags.cachedViews.splice(obj.index, 1)
    },
    // 删除所有缓存页面并刷新当前页面
    removeAllCachedViews() {
      this.tags.cachedViews.splice(0)
      this.refreshViews()
    },
    // 刷新页面，默认刷新当前页面
    refreshViews(type: 'push' | 'replace' = 'replace', path = router.currentRoute.value.fullPath, name = router.currentRoute.value.name) {
      this.changeNocacheViewStatus(true)
      // 删除页面的缓存
      const index = this.tags.cachedViews.findIndex(v => v === name)
      index !== -1 && this.tags.cachedViews.splice(index, 1)
      if(type === 'push') {
        router.push(`/redirect${path}`)
      }else{
        router.replace(`/redirect${path}`)
      }
				
    },
    // 缓存重置
    changeNocacheViewStatus(isNoCache: boolean) {
      this.tags.isNocacheView = isNoCache
    },
    //退出登录
    logout():void {
      this.status.ACCESS_TOKEN = ''
      localStorage.removeItem('token')
      history.go(0)
    },
    //登录信息
    async login(param: loginParam):Promise<void> {
      const res = await login(param)
      const {Data,Msg,Code} = res.data
      if(Code===200){
        const token = Data
        //登录成功得到token
        this.status.ACCESS_TOKEN = token
        setLocal('token', this.status, 1000 * 60 * 60)
        ElMessage({
          message: Msg,
          type: 'success'
        })
        const { query } = router.currentRoute.value
        router.push(
          typeof query.from === 'string' 
            ? decode(query.from) : '/'
        )
      }else{
        ElMessage({
          message: Msg,
          type: 'warning'
        })
      }
    },
    //获取用户信息
    async getUser():Promise<void> {
      const res = await getUser()
      this.userInfo = res.data.Data
    },
    //读取token信息
    setToken(token:string):void {
      this.status.ACCESS_TOKEN = token
      setLocal('token', this.status, 1000 * 60 * 60)
    },
    //获取路由表信息
    async GenerateRoutes():Promise<void> {
      const res = await getRouterList()
      const { Data } = res.data
      //异步加载的路由表进行权限处理
      generatorDynamicRouter(Data)
    },
    //获取处理后的路由信息
    setRoutes(data: Array<IMenubarList>):void {
      this.menubar.menuList = data
    },
    //合并路由
    concatAllowRoutes():void {
      allowRouter.reverse().forEach(v => this.menubar.menuList.unshift(v))
    },
    // 修改主题
    changeTheme(num?:number):void {
      if(num === this.setting.theme) return
      if(typeof num !== 'number') num = this.setting.theme
      this.setting.theme = num
      localStorage.setItem('setting', qs.stringify(this.setting))
    },
    // 修改主题色
    changeThemeColor(color: string):void {
      this.setting.color.primary = color
      localStorage.setItem('setting', qs.stringify(this.setting))
    },
    changeTagsSetting(showTags:boolean):void {
      this.setting.showTags = showTags
      localStorage.setItem('setting', qs.stringify(this.setting))

      if(showTags) {
        const index = this.tags.tagsList.findIndex(v => v.path === router.currentRoute.value.path)
        if(index !== -1) {
          this.tags.tagsList.forEach(v => v.isActive = false)
          this.tags.tagsList[index].isActive = true
        }else{
          this.changeTagNavList(router.currentRoute.value)
        }
      }
    },
    changePinSearchSetting(showPinyinSearch:boolean):void {
      this.setting.usePinyinSearch = showPinyinSearch
      localStorage.setItem('setting', qs.stringify(this.setting))
    },
    // 下次进去该页面刷新该页面(解决子页面保存之后，回到父页面页面不刷新问题)
    refreshPage(path: string):void {
      const name = this.tags.tagsList.filter(v => v.path === path)[0]?.name
      if(!name) return
      const index = this.tags.cachedViews.findIndex(v => v === name)
      this.tags.cachedViews.splice(index, 1)
    },
    changemenubarMode(mode: 'horizontal' | 'vertical'):void {
      this.setting.mode = mode
      localStorage.setItem('setting', qs.stringify(this.setting))
    }
  }
})