<template>
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
						<LayoutNavbar ref="layoutNavbar" />
					</div>

					<div class="container-class-view-main">
						<el-main>
							<el-scrollbar>
								<el-table :data="tableData">
									<el-table-column prop="date" label="Date" width="140" />
									<el-table-column prop="name" label="Name" width="120" />
									<el-table-column prop="address" label="Address" />
								</el-table>
							</el-scrollbar>
						</el-main>
					</div>
				</div>

			</el-container>
		</div>


	</el-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import LayoutMenubar from "./components/LayoutMenubar.vue"
import LayoutNavbar from "./components/navbar.vue"
import { useLayoutStore } from '@/store/modules/layout';
import { throttle } from '../utils/tools';

const layoutMenubar = ref()
const layoutWidth = ref('200px')

const item = {
	date: '2016-05-02',
	name: 'Tom',
	address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))

const { changeDeviceWidth, changeCollapsed, getMenubar, getSetting } = useLayoutStore()

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
