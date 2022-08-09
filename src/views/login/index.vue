<template>
	<div class="login-page">
		<transition name="login-fade">
			<section class="form-contianer">
				<div class="form-login">
					<div class="login-title">系统登陆</div>
					<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" :label-width=labelWidth class="login-ruleForm"
						:size="formSize">
						<el-form-item label="用户名" prop="userName">
							<el-input ref="userName" prefix-icon="el-icon-user" v-model="ruleForm.userName" />
						</el-form-item>
						<el-form-item label="密码" prop="passWord">
							<el-input ref="passWord" prefix-icon='el-icon-lock' type="password" show-password
								v-model="ruleForm.passWord" />
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm(ruleFormRef)">
								登录
							</el-button>
							<el-button :plain="true" @click="open3">warning</el-button>
						</el-form-item>
					</el-form>
				</div>
			</section>
		</transition>
	</div>

</template>

<script lang="ts">
import { defineComponent,onMounted,reactive, ref, toRef, toRefs } from 'vue'
import { FormInstance, FormRules, ElNotification, ElMessage } from 'element-plus'
import { useLayoutStore } from '@/store/modules/layout'
// import { Avatar } from '@element-plus/icons-vue'

export default defineComponent({
  setup(props, context) {
    const { login } = useLayoutStore()
    const passWord = ref(null)
    const formSize = ref('default')
    const labelWidth = ref('120px')
    const ruleFormRef = ref<FormInstance>()
    const ruleForm = reactive({
      userName: 'admin',
      passWord: 'admin'
    })

    const open3 = () => {
      ElMessage({
        message: 'Warning, this is a warning message.',
        type: 'warning',
      })
    }
    const rules = reactive<FormRules>({
      userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 5, message: '用户名大小长度为3-5', trigger: 'blur' }
      ],
      passWord: [
        { required: true, message: '请输入用密码', trigger: 'blur' },
        { min: 3, max: 5, message: '密码大小长度为3', trigger: 'blur' }
      ]
    })

    //登录信息认证
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate(async (valid, fields) => {
        if (valid) {
          const param ={
            ...ruleForm
          }
          await login(param)
        } else {
          console.log('error submit!', fields)
        }
      })
    }
    return { 
      passWord,
      formSize,
      labelWidth,
      ruleFormRef,
      ruleForm,
      rules,
      submitForm,
      open3
    }
  }
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
		}
	}
}
</style>
