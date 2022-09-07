<template>
	<div class='workPlace-content'>
		<el-card shadow='hover'>
			<div class='py-4 font-bold'>工作台</div>
		</el-card>
		<el-button type="primary" style="margin-left: 16px" @click="handleOpen">
			open
		</el-button>

		<div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column fixed prop="date" label="Date" width="150" />
				<el-table-column prop="name" label="Name" width="120" />
				<el-table-column prop="state" label="State" width="120" />
				<el-table-column prop="city" label="City" width="120" />
				<el-table-column prop="address" label="Address" width="600" />
				<el-table-column prop="zip" label="Zip" width="120" />
				<el-table-column fixed="right" label="Operations" width="120">
					<template #default>
						<el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
						<el-button link type="primary" size="small">Edit</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>


		<drawer ref="drawerCh" />
	</div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/store/modules/layout'
import { ref } from 'vue';
import drawer from './drawer.vue'
import { ItableData } from './type';

name: 'workplace'
const { getUserInfo } = useLayoutStore()
const drawerCh = ref()
const handleOpen = () => {
	drawerCh.value.drawer = true
	drawerCh.value.getRefData({name:'1'})
}
const tableData: Array<ItableData> = [
	{
		date: '2016-05-03',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'No. 189, Grove St, Los Angeles',
		zip: 'CA 90036',
		tag: 'Home',
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'No. 189, Grove St, Los Angeles',
		zip: 'CA 90036',
		tag: 'Office',
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'No. 189, Grove St, Los Angeles',
		zip: 'CA 90036',
		tag: 'Home',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'No. 189, Grove St, Los Angeles',
		zip: 'CA 90036',
		tag: 'Office',
	},
]
const handleClick = () => {
	console.log('click')
}
</script>

<style lang="scss" scoped>

</style>
