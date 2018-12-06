<template>
	<div class="file_name">	
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
            <p>文件上传</p>
        </div>
    </Upload>
		<fileList ref="myfile"></fileList>
	</div>
	
</template>

<script>
	import axios from "axios"
	import fileList from "./file_List.vue"
	export default {
		name:"file_name",
		components:{
			fileList
		},
		data(){
			return{
				 websock: null,
				 nowTime:"",
				 startupload:"文件正在上传，请耐心等待。。。",
				 uploadData:{
					 type:"order1",
					 sId:"01",
					 userName:this.$store.state.userInfo.loginName
				 },
				 clock:"",
				 hou:0,
				 min:0,
				 sec:0,
			}
		},
		mounted(){	
		},
		methods: {
			//计算时间
			startTime(){				
				this.clock = window.setInterval(() => {
				 this.sec++;                                        
				if(this.sec==60){
				  this.sec=0;this.min+=1;                                  
				}
				if(this.min==60){                                       
				  this.min=0;this.hou+=1;
				} 
				var time=this.min+"分"+this.sec+"秒"
				this.nowTime=time;
				},1000) 
			},
			//清除定时
			cleartime(){
				window.clearInterval(this.clock)
			},
			//随机两位数
			rnd(n, m){
					var random = Math.floor(Math.random()*(m-n+1)+n);
					return random;
			},
			//上传成功
			handleSuccess(res,file,filelist){
				this.cleartime()
				if(res.code==0){	
					 this.$Spin.hide()
					 this.nowTime="";
					 this.$Modal.success({
					 	title: '提示',
					 	content: '文件上传成功，系统正在处理数据，请查看上传记录状态',
					 	onOk: () => {
					 		this.$refs.myfile.getfileData();
					 	},
						
					 });	
					}else{
						this.$Message.error(res.message);
						this.$Spin.hide()
							// this.websocketclose();
					}
			},
			//上次错误
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
			//上传文件
			handleBeforeUpload(file){	
				console.log(file)
				this.hou=0;
				this.min=0;
				this.sec=0;
				this.uploadData.sId=String(this.rnd(0, 9))+String(this.rnd(0, 9))
					var filename=file.name;
					var name=filename.split(".")
					var title="文件"+file.name+"不是.xls类型"
		      	if(name[1]!='xls'&&name[1]!='xlsx'){
		      		return;
		    }
				this.startTime()
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
										h('div',this.startupload),
										h('div', this.nowTime)
								])
						}
					});
				},
// 				//初始化weosocket 
// 				 initWebSocket(){ 
// 　　　　　　　const wsuri = 'ws://101.37.124.231:8081/report/websocket/'+this.uploadData.sId;//ws地址
// 　　　　　　　　this.websocket  = new WebSocket(wsuri); 
// 　　　　　　　　this.websocket.onopen = this.websocketonopen;
// 　　　　　　　　this.websocket.onerror = this.websocketonerror;
// 　　　　　　　　this.websocket.onmessage = this.websocketonmessage; 
// 					    this.websocket.onclose = this.websocketclose;
// 	　　　　 },
// 　         websocketonopen() {
// 　　　　　　　　console.log("WebSocket连接成功");
// 　　　　　　},
// 　　　　　　websocketonerror(e) { //错误
//                 this.$Spin.hide()
// 								this.$Message.error("上传失败");
// 　　　　　　},
// 			    websocketclose(){
// 							console.log('断开连接')
// 					},
// 					//数据接收 
// 　         websocketonmessage(e){ 
// 						 console.log(e)				
// 						 if(e.data==="0"){
// // 							 this.cleartime()
// // 							 this.$Spin.hide()
// // 							 this.startupload="文件正在准备上传，请耐心等待。。。"
// // 							 this.nowTime="";
// // 							 this.$Modal.success({
// // 							 		title: '提示',
// // 							 		content: '文件上传成功，系统正在处理数据，请查看上传记录状态',
// // 							 		onOk: () => {
// // 							 			this.$refs.myfile.getfileData();
// // 							 		},
// // 							 });
// 							 // this.websocket.onclose()
// 							 this.websocketclose();						 
// 						 }else if(e.data==='1'){
// 							 this.$Message.error("上传失败");
// 							 this.$Spin.hide()
// 							 this.cleartime()
// 							 this.websocketclose();
// 							
// 						 }
// 						
// 						 
// 　　　　　　},

		},
		    
		
		
	}
</script>

<style scoped>
	.file_name{
		margin-top: 100px;
	}

	
	

</style>
