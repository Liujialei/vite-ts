<template>
	<div class="login-page">
		<transition name="login-fade">
			<section class="form-contianer">
				<div class="form-login">
					<div class="login-title">系统登陆</div>        
					<el-form ref="ruleFormRef" 
						:model="ruleForm" 
						:rules="rules" 
						:label-width=labelWidth 
						class="demo-ruleForm"
						:size="formSize" status-icon>
						<el-form-item label="用户名" prop="userName">
							<el-input 
								prefix-icon="el-icon-user"
								v-model="ruleForm.userName" />
						</el-form-item>
						<el-form-item label="密码" prop="passWord">
							<el-input 
								prefix-icon='el-icon-lock'
								v-model="ruleForm.passWord" />
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm(ruleFormRef)">
								登录
							</el-button>
						</el-form-item>
					</el-form>
				</div>
			</section>
		</transition>
	</div>

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { Avatar } from '@element-plus/icons-vue'

const formSize = ref('default')
const labelWidth = ref('120px')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
	userName: 'admin',
	passWord:'admin'
})
const rules = reactive<FormRules>({
	userName: [
		{ required: true, message: '请输入用户名', trigger: 'blur' },
		{ min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
	],
	passWord: [
		{ required: true, message: '请输入用密码', trigger: 'blur' },
		{ min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
	]
})

const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			console.log('submit!')
		} else {
			console.log('error submit!', fields)
		}
	})
}


</script>

<style lang="scss" scoped>









.login-fade-enter-active {
	transition: all 0.3s ease-out;
}
.login-fade-enter-active {
	transition: all 0.3s ease-out;
}
.login-fade-leave-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.login-fade-enter-from,
.login-fade-leave-to {
	transform: translateX(20px);
	opacity: 0;
}
.login-page {
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: #fff;
	// background: url(../../assets/images/icon-bg-image.jpg) no-repeat center center;
	background: #001529;
	background-size: 100% 100%;
	.form-contianer{
		width: 500px;
		margin: 0 auto;
		padding-top: 200px;
		.form-login{
			.login-title{
				color:$white;
				text-align: center;
				padding: 10px;
				margin-bottom: 20px;
				font-size: 30px;
				margin-left: 70px;
			}
		}
	}
}
</style>
