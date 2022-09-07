<template>
	<div>
		<el-container class="layout-container-class" style="height: 500px">
			<div class="layout-container-aside" :class='{ 
				"layout-width200": !getMenubar.status,
				"layout-width64": getMenubar.status,
			}'>
				<el-aside :width="layoutWidth">
					<el-scrollbar>
						<LayoutMenubar ref="layoutMenubar" />
					</el-scrollbar>
				</el-aside>
			</div>

			<div class="layout-container-main">
				<el-container>
					<div class="container-class-view">
						<div class="container-class-view-header">
							<LayoutNavbar ref="LayoutNavbar" />
						</div>
						<div class="container-class-view-tag">
							<LayoutTags ref="LayoutTags" />
						</div>

						<div class="container-class-view-main">
							<LayoutContent ref="LayoutContent" />
						</div>
					</div>

				</el-container>
			</div>
		</el-container>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import LayoutMenubar from "./components/LayoutMenubar.vue"
import LayoutNavbar from "./components/navbar.vue"
import LayoutTags from './components/tags.vue'
import LayoutContent from './components/content.vue'
import { useLayoutStore } from '@/store/modules/layout';
import { throttle } from '../utils/tools';

const layoutMenubar = ref()
const layoutWidth = ref('200px')

const { changeDeviceWidth, changeCollapsed, getMenubar } = useLayoutStore()

onMounted(async () => {
	changeDeviceWidth()
	const throttleFn = throttle(300)
	let throttleF = async function () {
		await throttleFn()
		changeDeviceWidth()
	}
	window.addEventListener('resize', throttleF, true)
})

</script>

<style lang="scss" scoped>
.layout-container-class {
	display: flex;
	overflow-x: hidden;
	.layout-container-aside{
		transition-duration: 300ms;
	}
	.layout-width200{
		width:200px;
	}
	.layout-width64 {
		width: 64px;
	}
	.layout-container-main{
		width: 100%;
		.container-class-view{
			width: 100%;
			.container-class-view-tag{
				height: 32px;
				line-height: 34px;
				padding: 0 16px;
			}
			.container-class-view-main{
				margin-top:10px;
			}
		}
	}
}

.layout-container-class .toolbar {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	right: 20px;
}
</style>
