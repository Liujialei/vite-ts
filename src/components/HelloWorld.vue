<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from 'element-plus'
import { toggleDark } from '@/composables'

defineProps<{ msg: string }>();

const count = ref(0);
const input = ref("element-plus");

const curDate = ref('')

const toast = () => {
	ElMessage.success('Hello')
}
</script>

<template>
	<h1>{{ msg }}</h1>

	<p>
		See
		<a href="https://element-plus.org" target="_blank">element-plus</a> for
		more information.
	</p>
	<el-menu class="el-menu-demo" mode="horizontal">
		<el-menu-item h="full" @click="toggleDark()">
			<button 
				class="border-none w-full bg-transparent cursor-pointer" 
				style="height: var(--ep-menu-item-height);">
				切换主题
			</button>
		</el-menu-item>
	</el-menu>
	<!-- example components -->
	<el-button @click="toast">El Message</el-button>
	<el-button type="primary" @click="count++">count is: {{ count }}</el-button>
	<el-button type="success" @click="count++">count is: {{ count }}</el-button>
	<el-button type="warning" @click="count++">count is: {{ count }}</el-button>
	<el-button type="danger" @click="count++">count is: {{ count }}</el-button>
	<el-button type="info" @click="count++">count is: {{ count }}</el-button>
	<br />
	<el-input v-model="input" style="width: 200px; margin: 20px" />
	<el-tag>Tag 1</el-tag>

	<br />
	<el-date-picker v-model="curDate" type="date" placeholder="Pick a day"></el-date-picker>

</template>

<style>
.ep-button {
	margin: 4px;
}
</style>
