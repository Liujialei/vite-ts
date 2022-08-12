<template>
	<el-sub-menu v-if='menuList.children && menuList.children.length > 0' :key='menuList.path' :index='menuList.path'>
		<template #title>
			<component class="layout-component-class-svg"
				:is='UseElIcon(menuList.meta.icon || "el-icon-location")' />
			<span>{{ menuList.meta.title }}</span>
		</template>
		<el-menu-item-group>
			<menubar-item v-for='v in menuList.children' :key='v.path' :index='v.path' :menu-list='v' />
		</el-menu-item-group>
	</el-sub-menu>

	<el-menu-item v-else :key='menuList.path + 1' :index='menuList.path+ 1'>
		<component class="layout-component-class-svg"
			:is='UseElIcon(menuList.meta.icon || "el-icon-setting")' />
		<template #title>
			{{ menuList.meta.title }}
		</template>
	</el-menu-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { IMenubarList } from '@/type/store/layout'
import { UseElIcon } from '@/components/SvnIcon/svgicon'

name: 'MenubarItem'
defineProps({
	menuList: {
		type: Object as PropType<IMenubarList>,
		default: () => { return {} }
	}
})

</script>

<style lang="less" scoped>
.layout-component-class-svg{
	margin-right: 5px;
	width: 24px;
	vertical-align: middle;
	margin-top: -32px;
}
</style>