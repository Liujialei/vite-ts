<template>
	<div class='drawer-content'>
		<el-drawer v-model="drawer" title="I am the title" :with-header="false">
			<span>Hi there!</span>
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/store/modules/layout'
import { ref } from 'vue'
const drawer = ref(false)
name: 'drawer'
const getRefData = (data:any) => (console.log(data))
defineExpose({
	drawer
})
</script>

<style lang="scss" scoped>

</style>
