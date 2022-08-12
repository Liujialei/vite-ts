<template>
	<div class="navbar-content">
		<div class="navbar-content-svg">
			<el-icon class='text-2xl cursor-pointer h-12 leading-12' @click.prevent='changeCollapsed'>
				<el-icon-expand v-if='getMenubar.status' />
				<el-icon-fold v-else />
			</el-icon>
		</div>
		<!-- 面包屑导航 -->
		<div class='breadcrumb'>
			<div class='breadcrumb-class-item'>
				<el-breadcrumb separator='/'>
					<transition-group name='breadcrumb'>
						<el-breadcrumb-item key='/' :to='{ path: "/" }'>主页</el-breadcrumb-item>
						<el-breadcrumb-item v-for='v in data.breadcrumbList' :key='v.path' :to='v.path'>
							{{ v.title }}
						</el-breadcrumb-item>
					</transition-group>
				</el-breadcrumb>
			</div>
		</div>
		<!-- 用户信息 -->
		<div class='userInfo-class'>
			<!-- 用户下拉 -->
			<el-dropdown>
				<span class=''>
					<el-avatar :size='30'
					src='https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' />
					<span class=''>{{ userInfo.name }}</span>
					<el-icon>
						<el-icon-arrow-down />
					</el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item divided @click='logout'>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>

			<Notice />
			<Screenfull />
			<!-- <Search /> -->
		</div>

	</div>
</template>
	
<script setup lang='ts'>
import { useLayoutStore } from '@/store/modules/layout'
import { reactive, watch } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import Notice from '@/layout/components/notice.vue'
import Screenfull from '@/layout/components/screenfull.vue'
import Search from '@/layout/components/search.vue'


const { getMenubar, getUserInfo, changeCollapsed, logout, getSetting } = useLayoutStore()
const route: RouteLocationNormalizedLoaded = useRoute()
const userInfo = getUserInfo

interface IBreadcrumbList {
	path: string
	title: string | symbol
}
// 面包屑导航
const breadcrumbItemList = () => {
	const breadcrumbList: Array<IBreadcrumbList> = []
	// 不显示面包屑的导航
	const notShowBreadcrumbList = ['Dashboard', 'RedirectPage'] 
	if (route.matched[0] && (notShowBreadcrumbList.includes(route.matched[0].name as string)))
	return breadcrumbList
	route.matched.forEach(v => {
		const obj: IBreadcrumbList = {
			title: v.meta.title as string,
			path: v.path
		}
		breadcrumbList.push(obj)
	})
	return breadcrumbList
}
let data = reactive({
	breadcrumbList: breadcrumbItemList()
})
watch(() => route.path, () => data.breadcrumbList = breadcrumbItemList())


</script>

<style lang="scss" scoped>
.navbar-content{
	width: 100%;
	height: 48px;
	display: flex;
	.navbar-content-svg{
		padding-left: 16px;
    padding-top: 16px;
		i{
			cursor: pointer;
		}
	}
	.breadcrumb{
		padding-left: 16px;
		padding-right: 16px;
		.breadcrumb-class-item{
			font-size: 14px;
			padding-top: 18px;
		}
	}
	.userInfo-class{
		display:flex;
		flex-direction: row-reverse;
		position: absolute;
		right: 30px;
		align-items: center;
		justify-content: center;
		align-self: center;
		.el-dropdown{
			padding: 0 16px;
		}
	}
}
</style>