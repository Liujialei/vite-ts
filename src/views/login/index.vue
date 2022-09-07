<template>
	<div class="login-page">
		<transition name="login-fade">
			<section class="form-contianer">
				<div class="form-login">
					<div class="login-title">系统登陆</div>
					<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" :label-width=labelWidth class="login-ruleForm"
						:size="formSize">
						<el-form-item label="用户名" prop="username">
							<el-input ref="username" prefix-icon="el-icon-user" v-model="ruleForm.username" />
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input ref="password" prefix-icon='el-icon-lock' type="password" show-password
								v-model="ruleForm.password" />
						</el-form-item>
						<el-form-item label="验证码" prop="kaptcha">
							<el-input ref="kaptcha" class="kaptchaInput" v-model="ruleForm.kaptcha" />
							<span @click="refreshCode" class="kaptchaSpan">
								<el-image class="imageKaptch" :src="`data:image/png;base64,${IdentifyCode}`">
									<div slot="placeholder">
										加载中
										<span class="dot">...</span>
									</div>
								</el-image>
							</span>
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
import { onMounted,reactive, ref, toRef, toRefs } from 'vue'
import { FormInstance, FormRules, ElNotification, ElMessage } from 'element-plus'
import { useLayoutStore } from '@/store/modules/layout'
import { storeToRefs } from 'pinia'
import { loginParam } from '@/type/utils/tools';

const { login, getUser, getIdentifyCode, getterIdentifyCode } = useLayoutStore()
const { IdentifyCode,headersId } = storeToRefs(useLayoutStore())
const password = ref(null)
const formSize = ref('default')
const labelWidth = ref('120px')
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
	username: 'test-0413',
	password: '1qaz@WSX',
	kaptcha:''
})
const rules = reactive<FormRules>({
	username: [
		{ required: true, message: '请输入用户名', trigger: 'blur' }
	],
	password: [
		{ required: true, message: '请输入用密码', trigger: 'blur' }
	],
	kaptcha: [
		{ required: true, message: '请输入用验证码', trigger: 'blur' }
	]
})
//验证码刷新
const refreshCode =() => {
	getIdentifyCode()
}
//登录信息认证
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate(async (valid, fields) => {
		if (valid) {
			const param: loginParam = {
				...ruleForm,
				id: headersId.value
			}
			await login(param)
			await getUser()
		} else {
			console.log('error submit!', fields)
		}
	})
}
onMounted(async () => {
	//验证码调用
	await getIdentifyCode()
})


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
	background-color: $white;
	// background: url(../../assets/images/icon-bg-image.jpg) no-repeat center center;
	background: $login-bg-color;
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
			.login-ruleForm{
				.kaptchaInput{
					width: 64%;
				}
				.kaptchaSpan{
					margin-top: 10px;
					width: 36%;
					.imageKaptch {
							width: 100%;
							height: 34px;
							border-radius: 4px;
						}
				}
			}
		}
	}
}
</style>
