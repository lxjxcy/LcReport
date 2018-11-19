<template>
	<div class="file_name">
		<p style="text-align: center;padding-bottom: 10px;"><span style="color: red;padding: 0 5px;">*</span>提示：请上传.xls类型的文件</p>
		 <Upload
        type="drag"
				 :data="uploadData"  
				 action="/upload/uploadExcel"
				:before-upload="handleBeforeUpload"
				:on-success="handleSuccess"
				:on-format-error="handleFormatError"
				>
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>文件上传</p>
        </div>
    </Upload>
	</div>
	
</template>

<script>
	import axios from "axios"
	export default {
		name:"file_name",
		data(){
			return{
				 websock: null,
				 uploadData:{
					 type:"order1"
				 },
				 
			}
			
		},
	destroyed(){
    this.websocketclose();
},
		mounted(){
		},
		methods: {
			handleSuccess(res,file,filelist){
				// this.$Spin.hide();
				if(res.code==0){
						this.$Message.success(res.message);
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
											h('div', '文件正在上传，请耐心等待。。。')
									])
							}
						});
						this.initWebSocket()
						
					}else{
						this.$Message.error(res.message);
							this.websocketclose();
						
					}
			},
			 handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
       },
			//上传文件
			handleBeforeUpload(file){	
					var filename=file.name;
					var name=filename.split(".")
					console.log(name[1])
					var title="文件"+file.name+"不是.xls类型"
		      	if(name[1]!='xls'){
					this.$Message.warning({
						content: title,
						duration: 5
					});
		      		return;
		    }
				
// 			let fd = new FormData();
// 				fd.append('file',file);
// 				fd.append('type','order1');
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
										h('div', '文件正在准备上传，请耐心等待。。。')
								])
						}
					});
				
// 					axios.post("/upload/uploadExcel",fd, {
// 						timeout: 1000 * 60 * 10,
// 						}).then(res=>{
// 							
// 						console.log(res)
// 						
// 						if(res.data.code==0){
// 							this.initWebSocket()
// 							
// 						}else{
// 							this.$Spin.hide()
// 							this.$Message.error(res.data.message);
// 							this.websocketclose();
// 						}
// 						
// 					}).catch((err) => {
// 							console.log(err.response);
// 					})
				
				},
				//初始化weosocket 
				 initWebSocket(){ 
	　　　　　　　　const wsuri = 'ws://101.37.124.231:8081/websocket/01 ';//ws地址
								 console.log(wsuri)
	　　　　　　　　this.websocket  = new WebSocket(wsuri); 
	　　　　　　　　this.websocket.onopen = this.websocketonopen;
	
	　　　　　　　　this.websocket.onerror = this.websocketonerror;
	
	　　　　　　　　this.websocket.onmessage = this.websocketonmessage; 
	             this.websock.onclose = this.websocketclose;
	　　　　   },
　         websocketonopen() {
　　　　　　　　console.log("WebSocket连接成功");

　　　　　　},
　　　　　　websocketonerror(e) { //错误
 // 　　　　　　 console.log("WebSocket连接发生错误");
                this.$Spin.hide()
								this.$Message.error("上传失败");


　　　　　　},
			    websocketclose(e){
							console.log('断开连接',e)
					},
　         websocketonmessage(e){ //数据接收 
						 // this.$Message.success(e.data)
						 console.log(e)
						
						 if(e.data==="0"){
							 this.$Message.success("上传成功");
							 this.$Spin.hide()
							 this.websocketclose();
							 
							 
						 }else if(e.data==='1'){
							 this.$Message.error("上传失败");
							 this.$Spin.hide()
							 this.websocketclose();
						 }
						  // this.websocket.close();
							

						 
						 
　　　　　　},

		},
		    
		
		
	}
</script>

<style scoped>
	.file_name{
		margin: 200px auto;
	}
	

	
	

</style>
