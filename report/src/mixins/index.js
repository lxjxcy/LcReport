	import axios from 'axios';
export default {
	methods:{
		//分页
		startPage(){
			if(this.$store.state.saveData.showDate==1){
				var date={
					month:this.$store.state.saveData.monthDate,
				}			
			}else if(this.$store.state.saveData.showDate==2){
				var date={
					weekStart:this.$store.state.saveData.weekDate[0],
					weekEnd:this.$store.state.saveData.weekDate[1],
				}	
			}else{
				var date={
					date:this.$store.state.saveData.dayDate,
				}	
				
			}
			this.showSend(date)	
		},
		//获取月，周
		getMonthweek(data,mianTitle){
			this.reportData=[];
			this.pageParam={
				pageNum:1,
				pageSize:10,
			};
			if(data=="月报"){
				this.columns[0].title=mianTitle+"月报表("	+	this.$store.state.saveData.monthDate+"   )"
				this.startPage()
			}
			if(data=="周报"){
				this.columns[0].title=mianTitle+"周报表"
			}
			if(data=="日报"){
				this.columnsday[0].title=mianTitle+"日报表(  "+	this.$store.state.saveData.dayDate+"  )"	
				this.startPage()
			}
		},
		
		
		//获取表格数据
		getTabledata(date,queryMonth,queryWeek,queryDay){
			var that=this;	
			that.loading=true;
			var param=Object.assign(date, that.pageParam)
			if(this.$store.state.saveData.showDate==1){
				var url=queryMonth
			}else if(this.$store.state.saveData.showDate==2){
				var url=queryWeek
			}else{
				var url=queryDay
			
			}
			
			if(this.$store.state.saveData.showDate==3){
				axios.post(url,param).then(res=>{
						that.loading=false;
						if(res.data.code==0){
							that.reportData=res.data.data.rows;
							that.total=res.data.data.records;
						}else{
							that.$Message.error(res.data.message);
						}
				})
			}else{
				axios.get(url,{
						params :param
					}).then(res=>{
						that.loading=false;
						if(res.data.code==0){
							that.reportData=res.data.data.rows;
							that.total=res.data.data.records;
						}else{
							that.$Message.error(res.data.message);
						}
				})
			}
			
			
		},
		
		//清空日期修改表头
		changtitle(mianTitle){
			if(this.$store.state.saveData.showDate==1){
				this.columns[0].title=mianTitle+"月报表"
			}else if(this.$store.state.saveData.showDate==2){
				this.columns[0].title=mianTitle+"周报表"
			}else{
				this.columnsday[0].title=mianTitle+"日报表"
			}
		},
		// 刷新数据不变
		mounthData(mianTitle){
			this.pageParam={
				pageNum:1,
				pageSize:10,
			};
			if(this.$store.state.saveData.showDate==1){
				this.columns[0].title=mianTitle+"月报"+" ( "+this.$store.state.saveData.monthDate+"  )";
				var date={
					month:this.$store.state.saveData.monthDate,
				}
				if(this.$store.state.saveData.monthDate==''){
					this.columns[0].title=mianTitle+"月报"
					return;
				}
				this.showSend(date)
			}else if(this.$store.state.saveData.showDate==2){
				this.columns[0].title=mianTitle+"周报"+" ( "+this.$store.state.saveData.weekDate[0]+"——"+this.$store.state.saveData.weekDate[1]+"  )";;
				var date={
					weekStart:this.$store.state.saveData.weekDate[0],
					weekEnd:this.$store.state.saveData.weekDate[1],
				}
				if(this.$store.state.saveData.weekDate.length==0){
				  this.columns[0].title=mianTitle+"周报"
					return;
				}
			

				this.showSend(date)					
			}else{
				this.columnsday[0].title=mianTitle+"日报"+" ( "+this.$store.state.saveData.dayDate+"  )";
				var titilename=this.columnsday[0].title
				console.log(titilename)
				var date={
					date:this.$store.state.saveData.dayDate,
				}
				if(this.$store.state.saveData.dayDate==''){
					this.columns[0].title=mianTitle+"日报"
					return;
				}
			
				this.showSend(date)
				
			}
		},
		changetitle(mianTitle){
			if(this.$store.state.saveData.showDate==3){
				this.columnsday[0].title=mianTitle;		
			}else{
				this.columns[0].title=mianTitle;		
			}
			
		},
		   // 刷新组件
     reloadcom(){
       this.hackReset = false
					this.$nextTick(() => {
					this.hackReset = true
					})
       },
			 
			 
			 
			 //获取导出数据
			 getdownData(queryMonth,queryWeek,queryDay){
				 var that=this;	
				 if(that.$store.state.saveData.showDate==1){
				 	var url=queryMonth;
					var param={
						month:that.$store.state.saveData.monthDate
					}
				 }else if(that.$store.state.saveData.showDate==2){
				 	var url=queryWeek;
					var param={
						weekStart:that.$store.state.saveData.weekDate[0],
						weekEnd:that.$store.state.saveData.weekDate[1],
					}
				 }else{
				 	var url=queryDay;
					var param={
						date:this.$store.state.saveData.dayDate,
					}	
				 }
				 if(that.$store.state.saveData.showDate==3){
				 	axios.post(url,param).then(res=>{
				 			if(res.data.code==0){
				 				that.$store.state.loadData=res.data.data.rows;
								this.export2Excel()
								
				 			}else{
				 				that.$Message.error(res.data.message);
				 			}
				 	})
				 }else{
				 	axios.get(url,{
				 			params :param
				 		}).then(res=>{
				 			if(res.data.code==0){
				 				that.$store.state.loadData=res.data.data.rows;
								this.export2Excel()
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