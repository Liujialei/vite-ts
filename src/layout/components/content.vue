<template>
	<div>
		<el-scrollbar>
			<router-view v-slot='{ Component }'>
				<transition name='fade-transform' mode='out-in'>
					<keep-alive :include='data.cachedViews || []'>
						<component :is='Component' :key='key' class='' />
					</keep-alive>
				</transition>
			</router-view>

			<el-backtop :right="100" :bottom="100" />
		</el-scrollbar>
	</div>
</template>

<script setup lang='ts'>
import { computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLayoutStore } from '@/store/modules/layout'

name: 'LayoutContent'
const route = useRoute()
const { getSetting, getTags } = useLayoutStore()
const setting = getSetting
const key = computed(() => route.path)

let data = reactive({
	cachedViews: [...getTags.cachedViews]
})

watch(
	() => getTags.cachedViews.length,
	() => data.cachedViews = [...getTags.cachedViews]
)
</script>

<style lang='scss' scoped>
::v-deep(.el-card) {
	overflow: visible;
}
.fade-transform-leave-active,
.fade-transform-enter-active {
	transition: all 0.5s;
}
.fade-transform-enter-from {
	opacity: 0;
	transform: translateX(-30px);
}
.fade-transform-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
</style>