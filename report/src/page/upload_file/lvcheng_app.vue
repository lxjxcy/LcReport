<template>
	<div class="file_name lvcheng_app">	
		<p style="text-align: center;padding-bottom: 10px;">
			<span style="color: red;padding: 0 5px;">*</span>提示：请上传.xls或.xlsx类型的文件</p>
		 <Upload
			type="drag"
			 :data="uploadData"  
			 :show-upload-list="false"
			action="/report/upload/uploadExcel"
			:before-upload="handleBeforeUpload"
			:on-success="handleSuccess"
			:format="['xls','xlsx']"
			:on-format-error="handleFormatError"
			>
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>幸福绿城app</p>
        </div>
		</Upload>
		<fileList ref="myfile"></fileList>
	</div>
</template>
<script>
	// import axios from "axios"
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
					 type:"order1",
					 userName:this.$store.state.userInfo.loginName
				 },
			}
		},
		mixins: [uploadfile],
		methods: {
			//上传文件
			handleBeforeUpload(file){	
				this.startUpload(file)
			},
			
		},	
	}
</script>

<style scoped>
	.file_name{
		margin-top: 80px;
	}

	
	

</style>
