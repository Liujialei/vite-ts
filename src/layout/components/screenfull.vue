<template>
    <div class='screenfull-svg'>
        <svg-icon 
					v-if='!isFullscreen' 
					class-name='cursor-pointer' 
					icon-class='fullscreen' 
					@click='changeScreenfull' />
        <svg-icon v-else 
					class-name='cursor-pointer' 
					icon-class='exit-fullscreen' 
					@click='changeScreenfull' />
        
    </div>
</template>
<script setup lang='ts'>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'
import { ElNotification } from 'element-plus'

name: 'Screenfull'
const isFullscreen = ref(false)
const changeScreenfull = () => {
	if (!screenfull.isEnabled) {
		ElNotification({
			message: '浏览器不支持全屏',
			type: 'warning'
		})
	} else {
		screenfull.toggle()
	}
}
const change = () => {
	if (screenfull.isEnabled) isFullscreen.value = screenfull.isFullscreen
}
onMounted(() => screenfull.isEnabled && screenfull.on('change', change))
onUnmounted(() => screenfull.isEnabled && screenfull.off('change', change))
</script>

<style lang="scss" scoped>
.screenfull-svg{
	padding: 0 8px;
}
.cursor-pointer{
	top: 7px;
	cursor: pointer;
}
</style>