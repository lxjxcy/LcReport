<template>
	<div>
		<Modal
			v-model="addmodal"
			
			title="新增角色"
			:loading="loading"
			width="450"
			@on-cancel="asyncCancel"
			@on-ok="asyncOK"
			:mask-closable="false">
			<div class="dialogwidth">	
			<Spin size="large" fix v-if="spinShow">加载中...</Spin>
				<Form ref="addRolefrom" :model="addRolefrom" :rules="ruleValidate" :label-width="80">
					<FormItem label="名称" prop="roleName">
						<Input v-model="addRolefrom.roleName" @on-focus="onFocus" style="width:300px" placeholder=""></Input>
					</FormItem>
					<FormItem label="描述" prop="describe">
						<Input :maxlength="80" @on-change="getlen" v-model="addRolefrom.describe" type="textarea" style="width:300px" :autosize="{minRows:5 ,maxRows: 7}" placeholder="角色描述..."></Input>
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
		name:"add_role",
		data(){
			return{
				loading:true,
				addmodal:false,
				noteMaxLen:80,
				noteNowLen:0,
				addRolefrom:{
					roleName:"",
					describe:"",	
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
				permissionList:[]
			}
		},
		mounted(){
			
				
		},
		methods:{
			//打开弹框
			addModel(){
				var that=this;
				that.addmodal=true;
				var params={
					userType:that.$store.state.userInfo.userType
				}
				that.$api.getPermission(params).then(res=>{
					that.spinShow=false;
					var permissionList=res.data.permissionList;
					permissionList.forEach((element, index, array)=>{
						array[index]["title"]=array[index].name;
							if(array[index].permissionList!=null){
								array[index].permissionList.forEach((e, i, arr)=>{
									arr[i]["title"]=arr[i].name;
								})
							}
							
					})
					
					that.permissionList=permissionList;
					console.log(permissionList)
				})
				
			},
			getlen(){
				var that = this
				var value = this.addRolefrom.describe
				// console.log(value.length)
				var len = parseInt(value.length);
				if (len < that.noteMaxLen) {
						this.noteNowLen=len
				}
			},
			// 提交
			asyncOK() {					
				this.handleSubmit("addRolefrom")
				
				
			},
			//onFocus获取焦点
			onFocus(){
				this.loading=true;
			},
			handleSubmit(addRolefrom) {
				var that=this
				that.loading=true;
				that.$refs[addRolefrom].validate((valid) => {
					if (valid) {
						var list=that.$refs.authList.getCheckedNodes()
						var permissionList=[]
						list.forEach((element, index, array)=>{
							permissionList.push(array[index].permissionId)
						})
						var params={
							roleName:that.addRolefrom.roleName,
							describe:that.addRolefrom.describe,
							permissionId:permissionList
						}
			
						that.$api.addRole(params).then(res=>{
							that.loading=false;
							that.addmodal=false;
							
							if(res.code==0){
								
								
								that.$Message.success(res.message);
								that.$emit("getslist")
								that.$emit("parReset")
							}else{
								that.$Message.error(res.message);
							}
						})
	// 							setTimeout(()=>{
	// 								this.loading=false;
	// 								this.addmodal=false;
	// 							},1000)
						
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
.len{
	position:relative;
	top:-40px;
	right:-250px;
}
</style>
