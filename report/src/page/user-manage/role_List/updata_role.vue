<template>
	<div>
		<Modal
			v-model="addmodal"
			
			title="修改角色"
			:loading="loading"
			width="450"
			@on-cancel="asyncCancel"
			@on-ok="asyncOK"
			:mask-closable="false">
			<div class="dialogwidth">	
			<Spin size="large" fix v-if="spinShow">加载中...</Spin>
				<Form ref="updataRolefrom" :model="updataRolefrom" :rules="ruleValidate" :label-width="80">
					<FormItem label="名称" prop="roleName">
						<Input v-model="updataRolefrom.roleName" @on-focus="onFocus" style="width:300px" placeholder=""></Input>
					</FormItem>
					<FormItem label="描述" prop="describe">
						<Input :maxlength="80" @on-change="getlen" v-model="updataRolefrom.describe" type="textarea" style="width:300px" :autosize="{minRows:5 ,maxRows: 7}" placeholder="角色描述..."></Input>
						<p class="len"><span>{{noteNowLen}}</span>/80</p>
					</FormItem>
					<FormItem label="权限">
						 <Tree :data="permissionList" children-key="permissionList" show-checkbox ref="authList"></Tree>
					</FormItem>
					
				</Form>
			</div>
		</Modal>
	
	</div>
	
</template>

<script>
	export default {
		name:"updata_role",
		data(){
			return{
				loading:true,
				addmodal:false,
				noteMaxLen:80,
				noteNowLen:0,
				updataRolefrom:{
					roleName:"",
					describe:"",	
					roleId:"",
				},
				spinShow:true,
				ruleValidate:{
					roleName: [
							{ required: true, message: '角色不能为空', trigger: 'blur' }
					],
					describe: [
							{ required: true, message: '角色描述不能为空', trigger: 'blur' },
					],
				
				},
				permissionList:[],
				oldPermission:[],
			}
		},
		mounted(){
			
				
		},
		methods:{
			//打开弹框
			updataModel(e){
				var that=this;
				var oldPermission=[];
				e.permissionId.forEach((ec, ic, ac)=>{
					oldPermission.push(ac[ic].permissionId)
					if(ac[ic].permissionList!=null){
						ac[ic].permissionList.forEach((ecd, icd, acd)=>{
							oldPermission.push(acd[icd].permissionId)
						})
						
					}
				})
				this.oldPermission=oldPermission
				
				
				that.updataRolefrom.roleName=e.roleName;
				that.updataRolefrom.describe=e.describe;
				that.updataRolefrom.roleId=e.roleId;
				that.noteNowLen=e.describe.length
				
				
				
				
				that.addmodal=true;
				var params={
					userType:that.$store.state.userInfo.userType
				}
				that.$api.getPermission(params).then(res=>{
					that.spinShow=false;
					var permissionList=res.data.permissionList;
					permissionList.forEach((element, index, array)=>{
						array[index]["title"]=array[index].name;
						e.permissionId.forEach((ec, ic, ac)=>{
							if(ac[ic].permissionId==array[index].permissionId){
								array[index]["checked"]=true;
							}
							if(array[index].permissionList!=null){
								array[index].permissionList.forEach((e, i, arr)=>{
									arr[i]["title"]=arr[i].name;
									if(ac[ic].permissionList!=null){
										ac[ic].permissionList.forEach((ecd, icd, acd)=>{
											if(acd[icd].permissionId==arr[i].permissionId){
												arr[i]["checked"]=true;
											}
										})
									}
								})
							}
							
						})
					})
					
					that.permissionList=permissionList;
					console.log(permissionList)
				})
				
			},
			// 提交
			asyncOK() {					
				this.handleSubmit("updataRolefrom")
				
				
			},
			getlen(){
				var that = this
				var value = this.updataRolefrom.describe
				// console.log(value.length)
				var len = parseInt(value.length);
				if (len < that.noteMaxLen) {
						this.noteNowLen=len
				}
			},
			//onFocus获取焦点
			onFocus(){
				this.loading=true;
			},
			handleSubmit(updataRolefrom) {
				var that=this
				that.loading=true;
				that.$refs[updataRolefrom].validate((valid) => {
					if (valid) {
						var list=that.$refs.authList.getCheckedNodes()
						var permissionList=[]
						list.forEach((element, index, array)=>{
							permissionList.push(array[index].permissionId)
						})
						if(JSON.stringify(permissionList) == JSON.stringify(that.oldPermission)){
							var params={
								roleId:that.updataRolefrom.roleId,
								roleName:that.updataRolefrom.roleName,
								describe:that.updataRolefrom.describe,
							}
						}else{
							
							var params={
								roleId:that.updataRolefrom.roleId,
								roleName:that.updataRolefrom.roleName,
								describe:that.updataRolefrom.describe,
								permissionId:permissionList
							}
						}
						console.log(params)
						that.$api.updateRole(params).then(res=>{
							that.loading=false;
							that.addmodal=false;
							that.$emit("parReset")
							if(res.code==0){
								that.$Message.success(res.message);
								that.$emit("getlist")
							}else{
								that.$Message.error(res.message);
							}
						})
						
					} else {
							this.loading=false;
								setTimeout(()=>{
								this.loading=true;
							},1000)
						}
				})
			},
			clearRole(){
				
			},
			//取消
			asyncCancel() {
				this.$emit("parReset")
				// this.$Message.info('取消修改密码');					
			},
			
		}
		
		
	}
</script>

<style>
	
  /*弹框内容width*/
   .dialogwidth{
    /* padding-right: 53px; */
     height: 350px;
    overflow:hidden;
    overflow-y:auto;
  }

</style>
