<template>
	<div class=''>
		<el-scrollbar ref='scrollbar' wrap-class='scrollbar-wrapper'>
			<div class='layout-tags-container'>
				<el-tag
					v-for='v in tagsList'
					:key='v.path'
					:ref='getTagsDom'
					:checked="v.isActive"
					@close="removeTag(v)"
					class="tag-class"
					:closable="tagsList.length > 1">
					<router-link :to='v.path'>{{ v.title }}</router-link>
				</el-tag>
			</div>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch, onBeforeUpdate, onMounted, reactive, Ref, ComponentInternalInstance } from 'vue'
import { useLayoutStore } from '@/store/modules/layout'
import { useRoute } from 'vue-router'
import { ITagsList } from '@/type/store/layout'

name: 'LayoutTags'
const { addCachedViews, removeTagNav } = useLayoutStore()
const route = useRoute()
const removeTag = (v: any) => removeTagNav({ cPath: route.path, tagsList: v })

// 标签页滚动
const { getTags } = useLayoutStore()
const { tagsList, cachedViews } = getTags
const scrollbar: Ref<{ wrap$: HTMLElement, update(): void } | null> = ref(null)
const layoutTagsItem: Ref<Array<ComponentInternalInstance | Element | null>> = ref([])
const getTagsDom = (el: ComponentInternalInstance | Element | null) => el && layoutTagsItem.value.push(el)
// 监听标签页导航
watch(
	() => tagsList.length,
	() => nextTick(() => {
		if (!scrollbar.value) return
		scrollbar.value.update()
		nextTick(() => {
			const itemWidth = layoutTagsItem.value.filter(v => v).reduce((acc, v) => {
				const val = v as HTMLElement
				return acc + val.offsetWidth + 6
			}, 0)
			if (!scrollbar.value) return
			const scrollLeft = itemWidth - scrollbar.value.wrap$.offsetWidth + 70
			if (scrollLeft > 0) scrollbar.value.wrap$.scrollLeft = scrollLeft
		})
	})
)
// 确保在每次变更之前重置引用
onBeforeUpdate(() => {
	layoutTagsItem.value = []
})


onMounted(() => {
	addCachedViews({ name: route.name as string, noCache: route.meta.noCache as boolean })
})

</script>

<style lang="scss" scoped>
.scrollbar-wrapper{
	.layout-tags-container{
		.tag-class{
			margin-right: 5px;
		}
	}
}
</style>