<template>
	<div class="supplier_day">
		<div class="goback">
			<goBack gobackUrl="/supplier_name" nowTitel="按日统计报表"></goBack>
		</div>
		<div class="all">
			<dayTop v-on:getExcel="downExcel"></dayTop>
			<Table height="400" :loading="loading" border :columns="columns" :data="data"></Table>
			<div class="pages"><span class="inpage"><Page :total="total" show-sizer show-total @on-page-size-change="changeSize" @on-change="changePage"/></span></div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import goBack from "../../components/goBack.vue"
	import dayTop from "../../components/day_top.vue"
	import goday from "../../mixins/goday"
	export default {
		name:"supplier_day",
		components:{
			goBack,
			dayTop
		},
		 data () {
			 
            return {
				total:0,
				loading:false,
				pageParam:{
					pageNum:1,
					pageSize:10,
				},
				tHeader:['日期', '订单数', "销量总额(元)","抵扣总额(元)","实付总额(元)","客单价（元/单）"],
				filterVal:['date', 'orderNum', "salesTotal","deductionTotal","payAmount","perSales"],
				 columns: [
					 {
						title: '供应商按日报表',
						 key: '222',
						 align: 'center',						 
						 children:[
							 {
							 title: '序号',
							 width: 60,
							 align: 'center',
							 render: (h, params) => {
							 var index=params.index+(this.pageParam.pageNum - 1) * this.pageParam.pageSize + 1
							 	return h('div',{	
							 	},index)
							 }
							 },
							{
								title: '日期',
								key: 'date',
								align: "center",
// 								render: (h, params) => {
// 									var nowdata=new Date(params.row.date)
// 									var changdate =nowdata.getFullYear() + "-" + (nowdata.getMonth() + 1) + "-" + nowdata.getDate()
// 									return h('div',{	
// 									},changdate)
// 								}
								
							},
// 							{
// 								title: '下单用户数',
// 								key: 'orderUserNum',
// 								align: 'center'
// 							},
							{
								title: '订单数',
								key: 'orderNum',
								align: "center",
							},
							{
								title: '销量总额(元)',
								key: 'salesTotal',
								align: "center",
							},
							{
								title: '抵扣总额(元)',
								key: 'deductionTotal',
								align: "center",
							},
							{
								title: '实付总额(元)',
								key: 'payAmount',
								align: "center",
							},
							{
								title: '客单价（元/单）',
								key: 'perSales',
								align: "center",
							},
						 ]
					 }            
        ],
				data: []
				
			}
		},
		mixins: [goday],
		mounted(){
			this.getlist()
		},
		methods:{
			getlist(){
				var sendTitle={
					supplierName:this.$route.query.title,
				}
				var url="/report/supplier/queryDay"
				var mianTitle="供应商按日报表"
				this.getDayData(url,mianTitle,sendTitle)
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
				//下载
				downExcel(){
					var sendTitle={
						supplierName:this.$route.query.title,
					}
					var url="/report/supplier/queryDay"
					var ifdata=true;
					this.getdownData(url,sendTitle,ifdata)
				},
			
		}
// 		mounted(){
// 
// 			var that=this;
// 			that.columns[0].title="供应商按日报表（"+that.$route.params.title+"）"
// 			if(that.$store.state.saveData.ifmonth){	
// 				var monthparam={
// 					orderSource:that.$route.params.title,
// 					month:that.$store.state.saveData.monthDate,
// 				}
// 			}else{
// 				var monthparam={
// 					orderSource:that.$route.params.title,
// 					weekStart:(new Date(that.$store.state.saveData.weekDate[0])).getTime(),
// 					weekEnd:(new Date(that.$store.state.saveData.weekDate[1])).getTime(),
// 				}
// 			}
// 			var param=Object.assign(monthparam, that.pageParam)
// 			console.log(param)
// 			axios.post('/supplier/queryDay',param).then(res=>{
// 				if(res.data.code==0){
// 					that.data=res.data.data;
// 					that.total=res.data.data.length;
// 				}
// 				
// 			})
// 			
// 		},
// 		methods:{
// 			changePage(val){
// 				console.log(val)
// 			},
// 			changeSize(val){
// 				console.log(val)
// 			}
// 			
// 		}
				
	}
</script>

<style>

</style>
