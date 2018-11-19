import axios from 'axios';
export default {
	methods:{
		getDayData(url,mianTitle,sendTitle){
			var that=this;
			that.loading=true;
			that.columns[0].title=mianTitle+"（"+that.$route.query.title+"）"
			if(that.$store.state.saveData.showDate==1){	
				var monthparam={
					month:that.$store.state.saveData.monthDate,
				}
			}else if(that.$store.state.saveData.showDate==2){
				var monthparam={
					weekStart:that.$store.state.saveData.weekDate[0],
					weekEnd:that.$store.state.saveData.weekDate[1],
				}
			}
			var param=Object.assign(monthparam, sendTitle,that.pageParam)
			console.log(param)
			axios.post(url,param).then(res=>{
				that.loading=false;
				if(res.data.code==0){
					that.data=res.data.data.rows;
					that.total=res.data.data.records;
				}else{
					that.$Message.error(res.data.message);
				}
				
			})
			
		},
		getsed(url,mianTitle,sendTitle){
			var that=this;
			that.loading=true;
			that.columns[0].title=mianTitle+"（"+that.$route.query.title+"）"
			
			if(that.$store.state.saveData.showDate==1){	
				
				var monthparam={
					month:that.$store.state.saveData.monthDate,
				}
			}else if(that.$store.state.saveData.showDate==2){
				
				var monthparam={
					weekStart:that.$store.state.saveData.weekDate[0],
					weekEnd:that.$store.state.saveData.weekDate[1],
				}
				
				
			}
			var param=Object.assign(monthparam, sendTitle,that.pageParam)
			axios.get(url,{params:param}).then(res=>{
				that.loading=false;
				if(res.data.code==0){
					that.data=res.data.data.rows;
					that.total=res.data.data.records;
				}else{
					that.$Message.error(res.data.message);
				}
				
			})
			
		},
		
		
		
		//获取导出日报数据
		getdownData(url,sendTitle,ifdata){
			var that=this;
			if(that.$store.state.saveData.showDate==1){	
				var monthparam={
					month:that.$store.state.saveData.monthDate,
				}
			}else if(that.$store.state.saveData.showDate==2){
				var monthparam={
					weekStart:that.$store.state.saveData.weekDate[0],
					weekEnd:that.$store.state.saveData.weekDate[1],
				}
			}
			
			var param=Object.assign(monthparam, sendTitle)
			
			if(ifdata){
				axios.post(url,param).then(res=>{
					if(res.data.code==0){
						that.$store.state.loadData=res.data.data.rows;
						that.export2Excel()
					}else{
						that.$Message.error(res.data.message);
					}
					
				})
				
			}else{
				axios.get(url,{params:param}).then(res=>{
					if(res.data.code==0){
						that.$store.state.loadData=res.data.data.rows;
						that.export2Excel()
					}else{
						that.$Message.error(res.data.message);
					}
					
				})
				
			}
		},
		
		
			//导出
				export2Excel() {
		　　　　　　require.ensure([], () => {
		　　　　　　　　const { export_json_to_excel } = require('@/vendor/Export2Excel');
		　　　　　　　　const data = this.formatJson(this.filterVal, this.$store.state.loadData);
									var title=this.columns[0].title;
		　　　　　　　　 export_json_to_excel(this.tHeader, data, title);
									this.$store.state.loading=false;
									this.$store.state.loadData=[];
		　　　　　　})
		　　　　},
		　　　　formatJson(filterVal, jsonData) {
		　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
							
		　　　　},
		
		
		
		
	}
}