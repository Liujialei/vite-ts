<template>
	<div class="layout-menubar-class">
		<el-menu :default-openeds="defaultOpeneds" 
			:mode='getSetting.mode'
			:default-active='activeMenu' 
			:collapse='getMenubar.status'
			:collapse-transition='false' 
			:unique-opened='true' 
			@select='onOpenChange'>
			<menubar-item v-for='v in filterMenubarData' :key='v.path' :index='v.path' :menu-list='v' />
		</el-menu>
	</div>
</template>
	
<script setup lang='ts'>
import { useLayoutStore } from '@/store/modules/layout'
import MenubarItem from '@/layout/components/menubarItem.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { IMenubarList } from '@/type/store/layout'

const route = useRoute()
const router = useRouter()
const { getMenubar, setRoutes, changeCollapsed, getSetting } = useLayoutStore()
const defaultOpeneds = ['1', '1']
const activeMenu = computed(() => {
	if (route.meta.activeMenu) return route.meta.activeMenu
	return route.path
})
const onOpenChange = (d: any) => {
	router.push({ path: d })
	getMenubar.status && changeCollapsed()
}

// 过滤隐藏的菜单，并提取单条的子菜单
const filterMenubar = (menuList: IMenubarList[]) => {
	const f = (menuList: IMenubarList[]) => {
		let arr: IMenubarList[] = []
		menuList.filter(v => !v.meta?.hidden).forEach(v => {
			let child = v.children && v.children.filter(v => !v.meta?.hidden)
			let currentItem = v
			if (!v.meta?.alwaysShow && child && child.length === 1) {
				[currentItem] = child
			}
			arr.push(currentItem)
			if (currentItem.children && currentItem.children.length > 0) {
				arr[arr.length - 1].children = f(currentItem.children)
			}
		})
		return arr
	}
	return f(menuList)
}

const filterMenubarData = filterMenubar(getMenubar.menuList)
setRoutes(filterMenubarData)

</script>
	
<style lang="scss" scoped>
.layout-menubar-class{
	flex: 1 1 0%;
}
</style>