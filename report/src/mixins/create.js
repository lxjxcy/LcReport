// import axios from "axios"

export default {
	methods:{
		createReport(url,param,sreachparam,day){
			if(this.reportdata==""){
				this.$Message.warning("请选择日期");
			}else{	
				var clearParam={};
				//查看是否清洗数据完成
				this.$api.cleanOut(clearParam).then(res=>{
						if(res.code==0){
								if(res.data){
										this.$store.state.loading=true;
										this.postreport(url,param,sreachparam)
								}else{
									this.$Modal.info({
											title: '提示',
											content: '您刚导入的数据正在处理中，请稍等几分钟再操作',
											onOk: () => {
												
											},
									});
									
								}
						}
				})
			}
		},
		//查看是否有报表
		postreport(url,param,sreachparam){
			this.$api.existReport(sreachparam).then(res=>{
				if(res.code==0){
					if(res.data==0){
						var removeParam={
							needRemove:false
						}
						var createParam=Object.assign(removeParam,param)
						this.startCreate(url,createParam)
							
					}else{
						this.confirm(url,param,sreachparam)
					}
				}else{
				this.$Message.error(res.message)
				}
			})	
		},
		//开始生成报表
		startCreate(url,param){
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
						h('div', "报表生成中，请耐心等待，不要刷新或关闭页面"),
					])
				}
			});
			this.axios.post(url,param).then(res=>{
				this.$store.state.loading=false;
				this.$Spin.hide()
				if(res.data.code==0){
					this.reportdata=""
					this.$Message.success("报表数据已生成，请前往报表统计菜单栏查看各维度数据");
				}else{
					this.$Message.error(res.data.message);
				}
			})
			
		},
		//是否需要重新生成
		 confirm (url,param,sreachparam) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '您选择的日期报表数据已存在，是否需要重新生成？',
                    onOk: () => {
											var removeParam={
												needRemove:true
											}
											var createParam=Object.assign(removeParam,param)
											this.startCreate(url,createParam)
                        // this.removeReport(url,param,searchurl,sreachparam)
                    },
                    onCancel: () => {
											this.$store.state.loading=false; 
                    }
                });
        },
// 		removeReport(url,param,searchurl,sreachparam){
// 			axios.post("/report/shell/removeAll",sreachparam).then(res=>{
// 				if(res.data.code==0){
// 					this.startCreate(url,param)
// 				}else{
// 					
// 				}
// 			})
// 		}
	},
}