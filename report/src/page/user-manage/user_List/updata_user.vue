<template>
	<div>
		<Modal
			v-model="addmodal"
			title="修改用户"
			:loading="loading"
			width="450"
			@on-cancel="asyncCancel"
			@on-ok="asyncOK"
			:mask-closable="false">
			<div>	
				<Form ref="updataUserfrom" :model="updataUserfrom" :rules="ruleValidate" :label-width="80">
					<FormItem label="账号" prop="loginName">
						<Input v-model="updataUserfrom.loginName" style="width:300px" placeholder=""></Input>
					</FormItem>
					<FormItem label="真实姓名" prop="name">
						<Input v-model="updataUserfrom.name" style="width:300px" placeholder=""></Input>
					</FormItem>
					 <FormItem label="角色" prop="roleId">
						<Select v-model="updataUserfrom.roleId" @on-change="getrole" placeholder="请选择角色" style="width:300px" :label-in-value="true">
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
		name:"updata_user",
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
					
					name: [
							{ required: true, message: '姓名不能为空', trigger: 'blur' },
					],
				
				},

				updataUserfrom:{
					roleId:"",
					loginName:"",
					roleName:"",
					name:"",
					uuid:"",
				}
			}
		},
		methods:{
			//打开弹框
			updataModel(e){
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
				if(e.userType==0){
					
					this.updataUserfrom={
						roleId:"",
						loginName:e.loginName,
						roleName:e.roleName,
						name:e.name,
						uuid:e.uuid
					}
				}else{
					this.updataUserfrom={
						roleId:(e.userType).toString(),
						loginName:e.loginName,
						roleName:e.roleName,
						name:e.name,
						uuid:e.uuid
					}
				}
			
				
			},
			// 提交
			asyncOK() {
				this.handleSubmit("updataUserfrom")
					
			},
			getrole(e){
			this.updataUserfrom.roleId=e.value
			this.updataUserfrom.roleName=e.label;
		
			},
			handleSubmit(updataUserfrom) {
				var that=this;

				that.$refs[updataUserfrom].validate((valid) => {
						if (valid) {
							var params={
								loginName:this.updataUserfrom.loginName,
								uuid:this.updataUserfrom.uuid,
								name:this.updataUserfrom.name,
								userType:this.updataUserfrom.roleId,
								roleName:this.updataUserfrom.roleName
							}
							
						that.$api.updateUser(params).then(res=>{
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
					// this.$Message.info('取消添加');
					this.$emit("parReset")
			},
			
		}
		
		
	}
</script>

<style>

</style>
