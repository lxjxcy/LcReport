import axios from "axios"

export default {
	methods:{
		createReport(url,param,searchurl,sreachparam,day){
			if(this.reportdata==""){
				this.$Message.warning("请选择日期");
			}else{	
				this.$store.state.loading=true;
				if(day){
					this.postreport(url,param,searchurl,sreachparam)
				}else{
					this.getreport(url,param,searchurl,sreachparam)
				}
			}
		
			
		},
		getreport(url,param,searchurl,sreachparam){
			axios.get(searchurl,{params:sreachparam}).then(res=>{
				if(res.data.code==0){
					if(res.data.data.rows.length==0){
						this.startCreate(url,param)		
					}else{
						this.confirm (url,param,searchurl,sreachparam)
					}
				}else{
				  this.$Message.error(res.data.message)
				}
			})	
		},
		postreport(url,param,searchurl,sreachparam){
			axios.post(searchurl,sreachparam).then(res=>{
				if(res.data.code==0){
					if(res.data.data.rows.length==0){
						this.startCreate(url,param)		
					}else{
						this.confirm (url,param,searchurl,sreachparam)
					}
				}else{
				this.$Message.error(res.data.message)
				}
			})	
		},
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
						h('div', "报表生成中，请耐心等待。。。"),
					])
				}
			});
			axios.post(url,param).then(res=>{
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
		 confirm (url,param,searchurl,sreachparam) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '您选择的日期报表数据已存在，是否需要重新生成？',
                    onOk: () => {
                        this.removeReport(url,param,searchurl,sreachparam)
                    },
                    onCancel: () => {
						this.$store.state.loading=false;
                    }
                });
        },
		removeReport(url,param,searchurl,sreachparam){
			axios.post("/report/shell/removeAll",sreachparam).then(res=>{
				if(res.data.code==0){
					this.startCreate(url,param)
				}else{
					
				}
			})
		}
	},
}