<template>
	<div v-if='isExternal' :style='styleExternalIcon' class='svg-external-icon svg-icon' />
	<svg v-else :class='svgClass' aria-hidden='true'>
		<use :xlink:href='iconName' />
	</svg>
</template>
<script setup lang='ts'>
import { computed } from 'vue'
name: 'SvgIcon'
const props = defineProps(
	{
		iconClass: {
			type: String,
			required: true
		},
		className: {
			type: String,
			default: ''
		},
		color: { // 设置图标颜色
			type: String,
			default: '#333'
		}
	}
) 

const isExternal = /^(https?:|mailto:|tel:)/.test(props.iconClass)
const iconName = `#icon-${props.iconClass}`
const svgClass = props.className ? `svg-icon ${props.className}` : 'svg-icon '
const styleExternalIcon = () => {
	return {
		mask: `url(${props.iconClass}) no-repeat 50% 50%`,
		'-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
	}
}

</script>

<style lang='scss' scoped>
.sub-el-icon,
.nav-icon {
	display: inline-block;
	font-size: 15px;
	margin-right: 12px;
	position: relative;
}
.svg-icon {
	width: 1em;
	height: 1em;
	position: relative;
	fill: currentColor;
	vertical-align: -2px;
}

.svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
}
</style>