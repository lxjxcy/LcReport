<template>
	<div>
		<Modal
			v-model="addmodal"
			title="新增用户"
			:loading="loading"
			width="450"
			@on-cancel="asyncCancel"
			@on-ok="asyncOK"
			:mask-closable="false">
			<div>	
				<Form ref="addUserfrom" :model="addUserfrom" :rules="ruleValidate" :label-width="80">
					<FormItem label="账号" prop="loginName">
						<Input v-model="addUserfrom.loginName" style="width:300px" placeholder="" ></Input>
					</FormItem>
					<FormItem label="密码" prop="password">
						<Input v-model="addUserfrom.password" style="width:300px" placeholder=""></Input>
					</FormItem>
					<FormItem label="真实姓名" prop="name">
						<Input v-model="addUserfrom.name" style="width:300px" placeholder=""></Input>
					</FormItem>
					 <FormItem label="角色" prop="roleId">
						<Select v-model="addUserfrom.roleId" @on-change="getrole" placeholder="请选择角色" style="width:300px" :label-in-value="true">
								<Option v-for="item in roleList"  :value="item.roleId" :key="item.roleId">{{ item.roleName }}</Option>
						</Select>
					</FormItem>
					
				</Form>
			</div>
		</Modal>
	
	</div>
	
</template>

<script>
	export default {
		name:"add_user",
		data(){
			return{
				loading:true,
				addmodal:false,
				roleList:[],
				ruleValidate:{
					roleId: [
							{ required: true, message: '角色不能为空', trigger: 'blur' }
					],
					loginName: [
							{ required: true, message: '账号不能为空', trigger: 'blur' },
					],
					password: [
							{ required: true, message: '密码不能为空', trigger: 'blur' },
					],
					name: [
							{ required: true, message: '姓名不能为空', trigger: 'blur' },
					],
				},

				addUserfrom:{
					roleId:"",
					loginName:"",
					roleName:"",
					
					password:"",
					name:"",
					
				}
			}
		},
		methods:{
			//打开弹框
			addModel(){
				this.addmodal=true;
				if(this.$store.state.userInfo.userType==1){
					var param={}
				}else{
					var param={
						action:1
					}
				}
				
				this.$api.getRoleList(param).then(res=>{
						if(res.code==0){
							var roleList=res.data.rows;
							roleList.forEach((e, i, a)=>{
								a[i].roleId=(a[i].roleId).toString()   
							})
							this.roleList=roleList
						}else{
							
							
						}
				})
			},
			// 提交
			asyncOK() {
				this.handleSubmit("addUserfrom")
					
			},
			getrole(e){
			this.addUserfrom.roleId=e.value
			this.addUserfrom.roleName=e.label;
		
			},
			handleSubmit(addUserfrom) {
				var that=this;

				that.$refs[addUserfrom].validate((valid) => {
						if (valid) {
							var params={
								loginName:this.addUserfrom.loginName,
								password:md5(this.addUserfrom.password),
								name:this.addUserfrom.name,
								userType:this.addUserfrom.roleId,
								roleName:this.addUserfrom.roleName
							}
							
						that.$api.registerUser(params).then(res=>{
							that.loading=false;
							that.addmodal=false;
							
							if(res.code==0){
								that.$emit("parReset")
								that.$Message.success(res.message)
								that.$emit("getList")
								
							}else{
								that.$Message.error(res.message)
							}
						})
							
						} else {
						
							that.loading=false;
								setTimeout(()=>{
								that.loading=true;
							},1000)
							
						}
				})
			},
			clearRole(){
				
			},
			//取消
			asyncCancel() {
					this.$Message.info('取消添加');
					this.$emit("parReset")
			},
			
		}
		
		
	}
</script>

<style>

</style>
