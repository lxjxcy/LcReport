<template>
	<div class="changePass">
		<Modal
			v-model="modal"
			title="修改密码"
			:loading="loading"
			@on-cancel="asyncCancel"
			@on-ok="asyncOK"
			:mask-closable="false">
			<div>
				<Form ref="formChange" :model="formChange" :rules="ruleValidate" :label-width="80">
					<FormItem label="当前用户:" prop="loginName">
						{{this.$store.state.userInfo.loginName}}
					</FormItem>
					<FormItem label="原密码" prop="password">
						<Input type="password" v-model="formChange.password" placeholder="请输入原密码"></Input>
					</FormItem>
					<FormItem label="新密码" prop="newPassword">
						<Input type="password" v-model="formChange.newPassword" placeholder="请输入新密码"></Input>
					</FormItem>
				</Form>
			</div>
		</Modal>
	</div>
	
</template>

<script>
	// import md5 from 'js-md5';
	// import axios from 'axios';
	export default {
		name:"changePass",
		 data () {
            return {
                modal: false,
								loading:true,
								formChange:{
									password: '',
									newPassword:''
								},
								ruleValidate: {
									password: [
											{ required: true, message: '原密码不能为空', trigger: 'blur' }
									],
									newPassword: [
											{ required: true, message: '新密码不能为空', trigger: 'blur' },
									],
								}
            }
        },
		
        methods: {
					//打开弹框
					changeModel(){
						this.modal=true;
					},
					// 提交
					asyncOK() {				
							this.handleSubmit("formChange")
					},
					handleSubmit(name) {
						this.$refs[name].validate((valid) => {
								if (valid) {
									var param={
										uuid:this.$store.state.userInfo.uuid,
										password:md5(this.formChange.password),
										newPassword:md5(this.formChange.newPassword),	
									}
									this.$api.login(param).then(res=>{
										if(res.code==0){
											// this.$Message.success(res.data.message);
											this.modal=false;
											this.loading=false;
											this.$emit('reload');
											var backparam={
												loginForm:this.$store.state.userInfo.loginName,
												newPassword:this.formChange.newPassword,	
											}
											this.$emit('backlogin',backparam);
										}else{
											this.$Message.error(res.message);
										}
									})
								} else {
										this.loading=false;
								}
						})
          },
					asyncCancel() {
							this.$Message.info('取消修改密码');
							 this.$emit('reload');
					}
        }
		
	}
</script>

<style>

</style>
