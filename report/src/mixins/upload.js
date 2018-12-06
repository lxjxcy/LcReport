export default{
	data(){
		return{
			nowTime:"",
			startupload:"文件正在上传，请耐心等待。。。",
			clock:"",
			hou:0,
			min:0,
			sec:0,
		}
	},
	methods:{
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
			this.$refs.myfile.getfileData();
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
		
		startUpload(file){
			this.hou=0;
			this.min=0;
			this.sec=0;
			// this.uploadData.sId=String(this.rnd(0, 9))+String(this.rnd(0, 9))
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
			
		}
		
	},
}