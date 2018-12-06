// import axios from 'axios';
export default {
	data(){
		return{
			total:0,
			loading:false,
			sortParam:{},
			pageParam:{
				pageNum:1,
				pageSize:10,
			},
			data: []
		}
	},
	mounted(){
		this.getlist()
	},
	methods:{
		// 获取日报
		getDayData(url,mianTitle,sendTitle,ifdata){
			var that=this;
			that.loading=true;
			that.columns[0].title=mianTitle+"（"+that.$route.query.title+"）"
			var monthparam=that.getparams(ifdata)
			var param=Object.assign(monthparam, sendTitle,that.pageParam,that.sortParam)
			
			if(ifdata){
				that.axios.post(url,param).then(res=>{
					that.loading=false;
					if(res.data.code==0){
					
						that.data=that.filterDate(res.data.data.rows)
						that.total=res.data.data.records;
					}else{
					
						that.$Message.error(res.data.message);
					}
				})
			}else{
				that.axios.get(url,{params:param}).then(res=>{
					that.loading=false;
					if(res.data.code==0){
					
						that.data=that.filterDate(res.data.data.rows)
						that.total=res.data.data.records;
					}else{
					
						that.$Message.error(res.data.message);
					}
				})
			}
			
		},
		getparams(ifdata){
			var that=this;
			if(that.$store.state.saveData.showDate==1){	
				var monthparam={
					month:that.$store.state.saveData.monthDate,
				}
			}else if(that.$store.state.saveData.showDate==2){
				
				var monthparam={
					weekStart:that.$store.state.saveData.weekDate.slice(0,10),
					weekEnd:that.$store.state.saveData.weekDate.slice(11),
				}
			}else if(that.$store.state.saveData.showDate==4){
				if(ifdata){
					var monthparam={
						weekStart:that.$store.state.saveData.otherDate[0],
						weekEnd:that.$store.state.saveData.otherDate[1],
					}
				}else{
					var monthparam={
						start:that.$store.state.saveData.otherDate[0],
						end:that.$store.state.saveData.otherDate[1],
					}
				}
				
			}
			
			return monthparam
		},	
		//获取导出日报数据
		getdownData(url,sendTitle,ifdata){
			var that=this;
			var monthparam=that.getparams(ifdata)
			var param=Object.assign(monthparam, sendTitle,that.sortParam)
			if(ifdata){
				that.axios.post(url,param).then(res=>{
					if(res.data.code==0){
						that.$store.state.loadData=that.filterDate(res.data.data.rows)
						that.export2Excel()
					}else{
						that.$store.state.loading=false;
						that.$Message.error(res.data.message);
					}
				})
			}else{
				that.axios.get(url,{params:param}).then(res=>{
					if(res.data.code==0){
						that.$store.state.loadData=that.filterDate(res.data.data.rows)
						that.export2Excel()
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
		
		
		//导出
			export2Excel() {
	　　　　　　require.ensure([], () => {
		           let path = this.$route.matched[1].path  
		
	　　　　　　　　const { export_json_to_excel } = require('@/vendor/Export2Excel');
	              var title=this.columns[0].title;
	
					if(
					(this.$store.state.saveData.showDate==4&&path.indexOf('/integration/integration_sec') == 0)
					||(this.$store.state.saveData.showDate==4&&path.indexOf('/source/second_source') == 0)
  					||(this.$store.state.saveData.showDate==4&&path.indexOf('/company_name/product_detail') == 0)){
						var data = this.formatJson(this.filterValother, this.$store.state.loadData);
						export_json_to_excel(this.tHeaderother, data, title);
					}else{
						var data = this.formatJson(this.filterVal, this.$store.state.loadData);
						export_json_to_excel(this.tHeader, data, title);
					}
					this.$store.state.loading=false;
					this.$store.state.loadData=[];
	　　　　　　})
	　　　　},
	　　　　formatJson(filterVal, jsonData) {
	　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
						
	　　　　},
			//选择页数
			changePage(val){
				this.pageParam.pageNum=val;
				this.getlist()
			},
			//每页显示多少条
			changeSize(val){
				this.pageParam.pageSize=val;
				this.getlist()
			},
	     //排序
			startSort(e){
			if(e.order=="asc"){
				var action=1
			}else{
				var action=0
			}
// 			var str=0;
// 			for(var i=0;i<e.key.length;i++){				
// 				if(/[A-Z]/.test(e.key[i])){
// 						str=i
// 				}
// 			}
// 			if(str!=0){
// 				var vlaue=(e.key).toLowerCase();
// 				var sortField=(vlaue).slice(0,str)+"_"+(vlaue).slice(str)	
// 			}else{
// 				var sortField=e.key
// 			}
			this.sortParam={
				action:action,
				sortField:e.key
			}
			
			 this.getlist()
			}
	}
}
