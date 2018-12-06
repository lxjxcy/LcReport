<template>
	<div class="file_name shop_stores">	
		<p style="text-align: center;padding-bottom: 10px;">
			<span style="color: red;padding: 0 5px;">*</span>提示：请上传.xls或.xlsx类型的文件</p>
			<div class="typefile">
				 <Upload
					type="drag"
					 :data="uploadData"  
					 :show-upload-list="false"
					action="/report/upload/uploadExcel"
					:before-upload="handleBeforeUpload2"
					:on-success="handleSuccess"
					:format="['xls','xlsx']"
					:on-format-error="handleFormatError"
					>
				<div class="typelist">
					<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
					
					<p>便利店订单</p>
				</div>
				</Upload>
				<Upload
					type="drag"
					:data="uploadData"  
					:show-upload-list="false"
					action="/report/upload/uploadExcel"
					:before-upload="handleBeforeUpload3"
					:on-success="handleSuccess"
					:format="['xls','xlsx']"
					:on-format-error="handleFormatError"
					>
				<div class="typelist">
					<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
					
					<p>便利店拼团订单</p>
				</div>
				</Upload>
				<Upload
					type="drag"
					:data="uploadData"  
					:show-upload-list="false"
					action="/report/upload/uploadExcel"
					:before-upload="handleBeforeUpload4"
					:on-success="handleSuccess"
					:format="['xls','xlsx']"
					:on-format-error="handleFormatError"
					>
				<div class="typelist">
					<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
					
					<p>便利店商品订单</p>
				</div>
				</Upload>
		</div>
		<fileList ref="myfile"></fileList>
	</div>
</template>
<script>
	import uploadfile from "../../mixins/upload.js"
	import fileList from "./file_List.vue"
	export default {
		name:"lvcheng_app",
		components:{
			fileList
		},
		data(){
			return{
				 uploadData:{
					 type:"order2",
					 userName:this.$store.state.userInfo.loginName
				 },
			}
		},
		mixins: [uploadfile],
		methods: {
			//上传文件新平台订单
			handleBeforeUpload2(file){
				this.uploadData.type="order2"
				this.startUpload(file)
			},
			//上传文件拼团订单
			handleBeforeUpload3(file){	
				this.uploadData.type="order3"
				this.startUpload(file)
			},
			//上传文件老平台订单
			handleBeforeUpload4(file){
				this.uploadData.type="order4"
				this.startUpload(file)
			},
			
		},	
	}
</script>

<style scoped>
	.file_name{
		margin-top: 80px;
	}
	.typefile{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width:50%;
		margin-left: 25%;
	}
	
	.typelist{
		padding:15px 10px;
		margin:0 15px;
	}

	
	

</style>
