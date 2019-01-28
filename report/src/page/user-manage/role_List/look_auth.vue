<template>
	<div>
		<Modal
			v-model="addmodal"
			title="角色权限"
			width="400"
			@on-cancel="asyncCancel"
			@on-ok="asyncOK"
			:mask-closable="false">
			<div class="dialogwidth">	
			<Spin size="large" fix v-if="spinShow">加载中...</Spin>
				<Tree :data="permissionList" children-key="permissionList"  ref="authList"></Tree>
			</div>
		</Modal>
	
	</div>
	
</template>

<script>
	export default {
		name:"look_auth",
		data(){
			return{
				addmodal:false,
				spinShow:true,

				
				
				permissionList:[],
			}
		},
		mounted(){
			
				
		},
		methods:{
			//打开弹框
			authModel(e){
				var that=this;			
				that.addmodal=true;
				that.permissionList=e.permissionId;
				that.spinShow=false;
// // 				var params={
// // 					userType:e.userType
// // 				}
// // 				that.$api.getPermission(params).then(res=>{
// // 					that.spinShow=false;
// // 					var permissionList=res.data.permissionList;
// 					permissionList.forEach((element, index, array)=>{
// 						array[index]["title"]=array[index].name;
// 						e.permissionId.forEach((ec, ic, ac)=>{
// 							if(ac[ic].permissionId==array[index].permissionId){
// 								array[index]["checked"]=true;
// 							}
// 							if(array[index].permissionList!=null){
// 								array[index].permissionList.forEach((e, i, arr)=>{
// 									arr[i]["title"]=arr[i].name;
// 									if(ac[ic].permissionList!=null){
// 										ac[ic].permissionList.forEach((ecd, icd, acd)=>{
// 											if(acd[icd].permissionId==arr[i].permissionId){
// 												arr[i]["checked"]=true;
// 											}
// 										})
// 									}
// 								})
// 							}
// 							
// 						// })
// 					// })
// 					
// 					that.permissionList=permissionList;
// 				})
				
			},
			// 提交
			asyncOK() {					
				
				
				
			},
			clearRole(){
				
			},
			//取消
			asyncCancel() {			
			},
			
		}
		
		
	}
</script>

<style scoped>
	
  /*弹框内容width*/
   .dialogwidth{
    /* padding-right: 53px; */
     height: 300px;
    overflow:hidden;
    overflow-y:auto;
  }

</style>
