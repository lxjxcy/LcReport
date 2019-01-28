<template>
	<div class="down-upload">
		<div style="margin-right: 20px;">
			<Button icon="ios-download-outline" type="primary" @click="downdata()">模板下载</Button>
		</div>
		
		<Upload
			:data="uploadData"  
			:show-upload-list="false"
			action="/report/userStat/uploadExcel"
			:before-upload="startUpload"
			:on-success="handleSuccess"
			:format="['xls','xlsx']"
			:on-format-error="handleFormatError"
			>
		<!-- <Upload action="//jsonplaceholder.typicode.com/posts/"> -->
				<Button icon="ios-cloud-upload-outline" type="primary">导入用户</Button>
         </Upload>
		 
		 
	</div>
</template>

<script>
	import axios from "axios"
	export default {
		name:"upload_user",
		data(){
			return{
				uploadData:{}
			}
		},
		methods:{
			startUpload(file){
					var filename=file.name;
					var name=filename.split(".")
					var title="文件"+file.name+"不是.xls类型"
					if(name[1]!='xls'&&name[1]!='xlsx'){
						return;
					}
					this.$Spin.show({
						render: (h) => {
							return h('div', [
									h('Icon', {							
											'class': 'demo-spin-icon-load',
											props: {
													type: 'ios-loading',
													size: 18
											},
									}),
									h('div',"文件正在上传"),
									
							])
						}
				});
				
			},
			//成功返回
			handleSuccess(res,file,filelist){
				if(res.code==0){	
					this.$Spin.hide()
					this.nowTime="";
					var userCount = []
						userCount.push(res.data.userCount)
					
					this.$store.state.userCount=userCount
					if(res.data.errorOwnerIds.length!=0){
						this.$Modal.info({
								title: '提示',
								content: '用户ID['+res.data.errorOwnerIds+']错误，请修改',
								onOk: () => {
									
							},
						});
					}
					this.$store.state.userList=res.data.userStats.rows;
// 					var param{
// 						userCount:res.data.userCount,
// 						userList:res.data.userStats.rows,
// 					}
					// this.$Message.sucess(res.message);
					}else{
						// this.$Message.error(res.message);
						this.$Spin.hide()
					}
			},
			//上传错误
			handleFormatError (file) {
					var filename=file.name;
					var name=filename.split(".")
					var title="文件"+file.name+"不是.xls或.xlsx类型"
						if(name[1]!='xls'&&name[1]!='xlsx'){
					this.$Message.warning({
						content: title,
						duration: 5
					});
				}
			},
			downdata(){
				var params={}
				axios.get("/report/userStat/downloadTemplate",{responseType: 'blob'}).then((res) => {
				// this.$api.downloadTemplate(params).then((res) => {
					let fileName = '用户列表.xls'
					let blob = new Blob([res.data], { type: 'application/x-xls' })
						if (window.navigator.msSaveOrOpenBlob) {
						navigator.msSaveBlob(blob, fileName);
						} else {
						var link = document.createElement('a');
						link.href = window.URL.createObjectURL(blob);
						link.download = fileName;
						link.click();
						window.URL.revokeObjectURL(link.href);
						}
				})
			}
		},
		

	}
</script>

<style scoped>
	.down-upload{
		display: flex;
	}

</style>
