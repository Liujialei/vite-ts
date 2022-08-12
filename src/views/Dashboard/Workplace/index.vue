<template>
	<div class='workPlace-content'>
		<el-card shadow='hover'>
			<div class='py-4 font-bold'>工作台</div>
		</el-card>
		<el-button type="primary" style="margin-left: 16px" @click="handleOpen">
			open
		</el-button>
		<drawer ref="drawerCh" />
	</div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/store/modules/layout'
import { ref } from 'vue';
import drawer from './drawer.vue'

name: 'workplace'
const { getUserInfo } = useLayoutStore()
const drawerCh = ref()
const handleOpen = () => {
	drawerCh.value.drawer = true
}
</script>

<style lang="scss" scoped>

</style>
