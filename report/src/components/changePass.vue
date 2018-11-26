<template>
	<div class="changePass">
		<Modal
			v-model="modal"
			title="修改密码"
			@on-ok="ok"
			@on-cancel="cancel"
			:mask-closable="false">
			<div>
				<Form ref="formChange" :model="formChange" :rules="ruleValidate" :label-width="80">
					<FormItem label="当前用户:" prop="loginName">
						{{this.$store.state.userInfo.loginName}}
					</FormItem>
					<FormItem label="原密码" prop="password">
						<Input type="password" v-model="formChange.password" placeholder="Enter your e-mail"></Input>
					</FormItem>
					<FormItem label="新密码" prop="newPassword">
						<Input type="password" v-model="formChange.newPassword" placeholder="Enter your e-mail"></Input>
					</FormItem>
				</Form>
			</div>
		</Modal>
	</div>
	
</template>

<script>
	export default {
		name:"changePass",
		 data () {
            return {
                modal: false,
				formChange:{
	             uuid:this.$store.state.userInfo.uuid,
	              password: '',
	              newPassword:''

	            },
				ruleValidate: {
                    password: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    newPassword: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    ],
				}
            }
        },
		
        methods: {
			changeModel(){
				this.modal=true;
				
			},
			
            ok () {
                this.handleSubmit("formChange")
				
            },
			handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            }
        }
		
	}
</script>

<style>

</style>
