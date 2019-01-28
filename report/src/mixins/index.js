	// import axios from 'axios';
export default {
	data (){
		return{
			month:true,
			hackReset:true,
			loading:false,
			total:0,
			sortParam:{},
			pageParam:{
				pageNum:1,
				pageSize:10,
			},
			reportData: []
		}
	},
	methods:{
		//分页
		startPage(){
			if(this.$store.state.saveData.showDate==1){
				var date={
					month:this.$store.state.saveData.monthDate,
				}			
			}else if(this.$store.state.saveData.showDate==2){
				var date={
					weekStart:this.$store.state.saveData.weekDate.slice(0,10),
					weekEnd:this.$store.state.saveData.weekDate.slice(11),
				}	
			}else if(this.$store.state.saveData.showDate==3){
				var date={
					date:this.$store.state.saveData.dayDate,
				}	
				
			}else if(this.$store.state.saveData.showDate==4){
				var date={
					start:this.$store.state.saveData.otherDate[0],
					end:this.$store.state.saveData.otherDate[1],
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
				this.columns[0].title=mianTitle+"周报表("+this.$store.state.saveData.weekDate.slice(0,10)+"~"+this.$store.state.saveData.weekDate.slice(11)+"  )"
				this.startPage()
			}
			if(data=="日报"){
				this.columnsday[0].title=mianTitle+"日报表(  "+	this.$store.state.saveData.dayDate+"  )"	
				this.startPage()
			}
			if(data=="任意时段报表"){
				this.columns[0].title=mianTitle+"报表"	
				this.startPage()
			}
		},
		
		//获取表格数据
		getTabledata(date,queryMonth,queryWeek,queryDay,queryOther){
			var that=this;	
			var param=Object.assign(date, that.pageParam,that.sortParam)
			if(this.$store.state.saveData.showDate==1){
				if(date.month==""){
					return;
				}
				var url=queryMonth
			}else if(this.$store.state.saveData.showDate==2){
				if(date.weekStart==""&&date.weekEnd==""){
					return;
				}
				var url=queryWeek
			}else if(this.$store.state.saveData.showDate==3){
				if(date.date==""){
					return;
				}
				var url=queryDay
			}else if(this.$store.state.saveData.showDate==4){

				if(this.$store.state.saveData.otherDate.length==0){
				
					return;
				}
				var url=queryOther
			}
			var path=this.$route.matched[1].path;
			if(path.indexOf('/product_name') == 0||path.indexOf('/supplier_name') == 0){
				var order={
					orderSource:this.$store.state.orderSource,
				}
				param=Object.assign(param,order)
			}
			that.loading=true;
			if(this.$store.state.saveData.showDate==3){
				that.axios.post(url,param).then(res=>{
						that.loading=false;
						if(res.data.code==0){
							if(res.data.data.length!=0){
								this.reportData=that.filterDate(res.data.data.rows)
							}else{
								this.reportData=[]
							}
						
							that.total=res.data.data.records;
						}else{
							that.$Message.error(res.data.message);
						}
				})
			}else{
				that.axios.get(url,{
						params :param
					}).then(res=>{
						that.loading=false;
						if(res.data.code==0){
							
							if(res.data.data.length!=0){
								this.reportData=that.filterDate(res.data.data.rows)
							}else{
								this.reportData=[]
							}
							
							that.total=res.data.data.records;
						}else{
							
							that.$Message.error(res.data.message);
						}
				})
			}	
		},
		//清空日期修改表头
		changtitle(mianTitle){
			this.reportData=[]
			this.pageParam={
				pageNum:1,
				pageSize:10,
			};
			if(this.$store.state.saveData.showDate==1){
				this.columns[0].title=mianTitle+"月报表"
			}else if(this.$store.state.saveData.showDate==2){
				this.columns[0].title=mianTitle+"周报表"
			}else if(this.$store.state.saveData.showDate==3){
				this.columnsday[0].title=mianTitle+"日报表"
			}else{
				this.columnsother[0].title=mianTitle+"报表"
			}
		},
		// 刷新数据不变
		mounthData(mianTitle){
			this.pageParam={
				pageNum:1,
				pageSize:10,
			};
			if(this.$store.state.saveData.showDate==1){
				this.columns[0].title=mianTitle+"月报表"+" ( "+this.$store.state.saveData.monthDate+"  )";
				var date={
					month:this.$store.state.saveData.monthDate,
				}
				if(this.$store.state.saveData.monthDate==''){
					this.columns[0].title=mianTitle+"月报表"
					return;
				}
				this.showSend(date)
			}else if(this.$store.state.saveData.showDate==2){
				this.columns[0].title=mianTitle+"周报表"+" ( "+this.$store.state.saveData.weekDate.slice(0,10)+"~"+this.$store.state.saveData.weekDate.slice(11)+"  )";;
				var date={
					weekStart:this.$store.state.saveData.weekDate.slice(0,10),
					weekEnd:this.$store.state.saveData.weekDate.slice(11),
				}
				if(this.$store.state.saveData.weekDate==""){
				  this.columns[0].title=mianTitle+"周报表"
					return;
				}
				this.showSend(date)					
			}else if(this.$store.state.saveData.showDate==3){
				this.columnsday[0].title=mianTitle+"日报表"+" ( "+this.$store.state.saveData.dayDate+"  )";
				var titilename=this.columnsday[0].title
				console.log(titilename)
				var date={
					date:this.$store.state.saveData.dayDate,
				}
				if(this.$store.state.saveData.dayDate==''){
					this.columnsday[0].title=mianTitle+"日报表"
					return;
				}
				this.showSend(date)
				
			}else{
				this.columnsother[0].title=mianTitle+"报表"+" ( "+this.$store.state.saveData.otherDate[0]+"~"+this.$store.state.saveData.otherDate[1]+"  )";
				var date={
					start:this.$store.state.saveData.otherDate[0],
					end:this.$store.state.saveData.otherDate[1],
				}
				if(this.$store.state.saveData.otherDate.length==0){
					this.columnsother[0].title=mianTitle+"报表"
					return;
				}
				this.showSend(date)		
				
			}
		},
		
		changetitle(mianTitle){
			if(this.$store.state.saveData.showDate==3){
				this.columnsday[0].title=mianTitle;		
			}else if(this.$store.state.saveData.showDate==4){
				this.columnsother[0].title=mianTitle;		
			}else{
				this.columns[0].title=mianTitle;	
			}
			
		},
		   // 刷新组件
     reloadcom(){
			 this.pageParam={
			 	pageNum:1,
			 	pageSize:10,
			 };
			 this.total=0;
       this.hackReset = false
					this.$nextTick(() => {
					this.hackReset = true
					})
       },
			 //选择页数
			 changePage(val){
			 	this.pageParam.pageNum=val;
			 	this.startPage()
			 },
			 //每页显示多少条
			 changeSize(val){
			 	this.pageParam.pageSize=val;
			 	this.startPage()
			 },
			 //获取导出数据
			 getdownData(queryMonth,queryWeek,queryDay,queryOther){
				 var that=this;	
				 if(that.$store.state.saveData.showDate==1){
				 	var url=queryMonth;
					var param={
						month:that.$store.state.saveData.monthDate
					}
				 }else if(that.$store.state.saveData.showDate==2){
				 	var url=queryWeek;
					var param={
						weekStart:that.$store.state.saveData.weekDate.slice(0,10),
						weekEnd:that.$store.state.saveData.weekDate.slice(11),
					}
				 }else if(that.$store.state.saveData.showDate==3){
				 	var url=queryDay;
					var param={
						date:this.$store.state.saveData.dayDate,
					}	
				 }else if(that.$store.state.saveData.showDate==4){
					 var url=queryOther;
						var param={
							start:this.$store.state.saveData.otherDate[0],
							end:this.$store.state.saveData.otherDate[1],
						}
				 }
				 var paramload=Object.assign(param,that.sortParam)
				 var path=this.$route.matched[1].path;
				 if(path.indexOf('/product_name') == 0||path.indexOf('/supplier_name') == 0){
				 	var order={
				 		orderSource:this.$store.state.orderSource,
				 	}
				 	paramload=Object.assign(paramload,order)
				 }
				 
				 if(that.$store.state.saveData.showDate==3){
					 
				 	that.axios.post(url,paramload).then(res=>{
				 			if(res.data.code==0){
								if(res.data.data.length!=0){
									this.$store.state.loadData=that.filterDate(res.data.data.rows)
								}else{
									this.$store.state.loadData=[]
								}
								// 
								this.export2Excel()
				 			}else{
								that.$store.state.loading=false;
				 				that.$Message.error(res.data.message);
				 			}
				 	})
				 }else{
				 	that.axios.get(url,{
				 			params :paramload
				 		}).then(res=>{
							console.log(res.data)
				 			if(res.data.code==0){
				 			if(res.data.data.length!=0){
				 				this.$store.state.loadData=that.filterDate(res.data.data.rows)
				 			}else{
				 				this.$store.state.loadData=[]
				 			}
								this.export2Excel()
				 			}else{
								that.$store.state.loading=false;
				 				that.$Message.error(res.data.message);
				 			}
				 	})
				 }
				 
				 
			 },
			 //数据筛选
			 filterDate(e){
				 var arr=e
				 for(var i=0;i<arr.length;i++){
				 	if(arr[i].hasOwnProperty("grossMerchandiseVolume")){
				 		arr[i]["grossMerchandiseVolume"]=arr[i].grossMerchandiseVolume.toFixed(2);
				 	}
					if(arr[i].hasOwnProperty("GMV")){	
						arr[i]["GMV"]=arr[i].GMV.toFixed(2);
					}
					if(arr[i].hasOwnProperty("salesTotal")){
						arr[i]["salesTotal"]=arr[i].salesTotal.toFixed(2);
					}
					if(arr[i].hasOwnProperty("deductionTotal")){
						arr[i]["deductionTotal"]=arr[i].deductionTotal.toFixed(2);
					}
					if(arr[i].hasOwnProperty("payAmount")){
						arr[i]["payAmount"]=arr[i].payAmount.toFixed(2);
					}
					if(arr[i].hasOwnProperty("perSales")){
						arr[i]["perSales"]=arr[i].perSales.toFixed(2);
					}
					if(arr[i].hasOwnProperty("sales_total")){
						arr[i]["sales_total"]=arr[i].sales_total.toFixed(2);
					}
					if(arr[i].hasOwnProperty("deduction_total")){
						arr[i]["deduction_total"]=arr[i].deduction_total.toFixed(2);
					}
					if(arr[i].hasOwnProperty("pay_amount")){
						arr[i]["pay_amount"]=arr[i].pay_amount.toFixed(2);
					}
					if(arr[i].hasOwnProperty("per_sales")){
						arr[i]["per_sales"]=arr[i].per_sales.toFixed(2);
					}
					if(arr[i].hasOwnProperty("totalPrice")){
						arr[i]["totalPrice"]=arr[i].totalPrice.toFixed(2);
					}
					if(arr[i].hasOwnProperty("averagePrice")){
						arr[i]["averagePrice"]=arr[i].averagePrice.toFixed(2);
					}
					if(arr[i].hasOwnProperty("total_price")){
						arr[i]["total_price"]=arr[i].total_price.toFixed(2);
					}
					if(arr[i].hasOwnProperty("deductibleTotal")){
						arr[i]["deductibleTotal"]=arr[i].deductibleTotal.toFixed(2);
					}
					if(arr[i].hasOwnProperty("deductible_total")){
						arr[i]["deductible_total"]=arr[i].deductible_total.toFixed(2);
					}
				 }
				 return arr;
			 },
			 
			 //选择页数
			 changePage(val){
			 	this.pageParam.pageNum=val;
			 	this.startPage()
			 },
			 //每页显示多少条
			 changeSize(val){
			 	this.pageParam.pageSize=val;
			 	this.startPage()	
			 },
			 //刷新分页组件
			 showPage(){
			 	this.reloadcom()
			 }, 
		//导出
			export2Excel() {
	　　　　　　require.ensure([], () => {
	　　　　　　　　const { export_json_to_excel } = require('@/vendor/Export2Excel');
									if(this.$store.state.saveData.showDate==4){
										var data = this.formatJson(this.filterValother, this.$store.state.loadData);
									}else{
									
										var data = this.formatJson(this.filterVal, this.$store.state.loadData);
									}
	　　　　　　　　
								var title=this.columns[0].title;
	　　　　　　　　 export_json_to_excel(this.tHeader, data, title);
	               this.$store.state.loading=false;
								 this.$store.state.loadData=[];
	　　　　　　})
	　　　　},
	　　　　formatJson(filterVal, jsonData) {
	　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
	　　　　},
	
			// 排序
			startSort(e){
				if(e.order=="asc"){
					var action=1
				}else{
					var action=0
				}
// 				var str=0;
// 				for(var i=0;i<e.key.length;i++){				
// 					if(/[A-Z]/.test(e.key[i])){
// 							str=i
// 					}
// 				}
// 				var vlaue=(e.key).toLowerCase()
// 				var sortField=(vlaue).slice(0,str)+"_"+(vlaue).slice(str)	
				this.sortParam={
					action:action,
					sortField:e.key
				}
				this.startPage()
			}
	}
}


