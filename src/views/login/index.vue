<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from 'element-plus'
// import { toggleDark } from '@/composables'

const count = ref(0);
const input = ref("element-plus");

const curDate = ref('')

const toast = () => {
	ElMessage.success('Hello')
}
console.log('import.meta', import.meta);
</script>

<template>
	<el-button type="primary" @click="toast">El Message</el-button>
	<el-button type="primary" @click="count++">count is: {{ count }}</el-button>
</template>

<style>
.ep-button {
	margin: 4px;
}
</style>
