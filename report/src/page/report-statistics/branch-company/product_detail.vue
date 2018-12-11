<template>
	<div class="product_detail">
		<div class="goback">
			<goBack gobackUrl="/company_name" nowTitel="商品详情统计报表"></goBack>
		</div>
		<div class="all">
			<dayTop v-on:getExcel="downExcel"></dayTop>
			<Table height="400"
			 v-if="this.$store.state.saveData.showDate!=4"
				@on-sort-change="startSort"
				:loading="loading"
				border
				:columns="columns"
				:data="data">
				</Table>
			<Table height="400"
			 v-if="this.$store.state.saveData.showDate==4" 
			 @on-sort-change="startSort" 
			 :loading="loading" 
			 border :columns="columnsother" 
			 :data="data">
			 </Table>
			<div class="pages"><span class="inpage"><Page :total="total" show-sizer show-total @on-page-size-change="changeSize" @on-change="changePage"/></span></div>
		</div>
	</div>
</template>
<script>
	import goBack from "../../../components/goBack.vue"
	import dayTop from "../../../components/day_top.vue"
	import goday from "../../../mixins/goday"
	export default {
		name:"product_detail",
		components:{
			goBack,
			dayTop
		},
		 data () {		 
            return {
				tHeader:['商品名称','订单数量','商品数量','GMV(万)','销售总额(元)','抵扣总额(元)','实付总额(元)','客单价（元/单）'],
				filterVal:['goodsName','orderNum','goodsAmount','grossMerchandiseVolume','salesTotal','deductionTotal','payAmount','perSales'],
				tHeaderother:['商品名称','订单数量','商品数量','销售总额(元)','抵扣总额(元)','实付总额(元)','客单价（元/单）'],
				filterValother:['_id','order_num','goods_amount','sales_total','deduction_total','pay_amount','per_sales'],	 
				 columns: [
					 {
						title: '公司按商品报表',
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
								title: '商品名称',
								key: 'goodsName',
								align: "center",
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
								sortable: 'custom'
							},
							{
								title: '商品数量',
								key: 'goodsAmount',
								align: "center",
								sortable: 'custom'
							},
							{
								title: 'GMV(万)',
								key: 'grossMerchandiseVolume',
								align: "center",
								sortable: 'custom',
							},
							{
								title: '销量总额(元)',
								key: 'salesTotal',
								align: "center",
								sortable: 'custom',
							},
							{
								title: '抵扣总额(元)',
								key: 'deductionTotal',
								align: "center",
								sortable: 'custom',
							},
							{
								title: '实付总额(元)',
								key: 'payAmount',
								align: "center",
								sortable: 'custom',
							},
							{
								title: '客单价(元/单)',
								key: 'perSales',
								align: "center",
								sortable: 'custom',
							},
						 ]
					 }            
				],
		 columnsother: [
					 {
						title: '公司按商品报表',
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
								title: '商品名称',
								key: '_id',
								align: "center",
							},
// 							{
// 								title: '下单用户数',
// 								key: 'orderUserNum',
// 								align: 'center'
// 							},
							{
								title: '订单数',
								key: 'order_num',
								align: "center",
								sortable: 'custom'
							},
							{
								title: '商品数量',
								key: 'goods_amount',
								align: "center",
								sortable: 'custom'
							},
// 							{
// 								title: 'GMV(万)',
// 								key: 'grossMerchandiseVolume',
// 								align: "center",
// 								sortable: 'custom',
// 								render: (h, params) => {
// 									var toFix=params.row.grossMerchandiseVolume.toFixed(2)
// 									return h('div',{	
// 									},toFix)
// 								}
// 							},
							{
								title: '销量总额(元)',
								key: 'sales_total',
								align: "center",
								sortable: 'custom',
							},
							{
								title: '抵扣总额(元)',
								key: 'deduction_total',
								align: "center",
								sortable: 'custom',
							},
							{
								title: '实付总额(元)',
								key: 'pay_amount',
								align: "center",
								sortable: 'custom',
							},
							{
								title: '客单价(元/单)',
								key: 'per_sales',
								align: "center",
								sortable: 'custom',
							},
						 ]
					 }            
				],
				
			}
		},
		
		mixins: [goday],
		methods:{
			getlist(){
				var sendTitle={
					companyName:this.$route.query.title,
				}
				if(this.$store.state.saveData.showDate==1){
					var url=this.$api.companyDetailMonth
				}else if(this.$store.state.saveData.showDate==2){
					var url=this.$api.companyDetailWeek
				}else if(this.$store.state.saveData.showDate==4){
					var url=this.$api.companyDetailOther
					var sendTitle={
						secParameter:this.$route.query.title,
					}
					
				}
				var mianTitle="公司按商品报表"
				var ifdata=false;
				this.getDayData(url,mianTitle,sendTitle,ifdata)
			},
				//下载
				downExcel(){
					var sendTitle={
						companyName:this.$route.query.title,
					}
					if(this.$store.state.saveData.showDate==1){
						var url=this.$api.companyDetailMonth
					}else if(this.$store.state.saveData.showDate==2){
						var url=this.$api.companyDetailWeek
					}else if(this.$store.state.saveData.showDate==4){
						var url=this.$api.companyDetailOther;
						var sendTitle={
							secParameter:this.$route.query.title,
						}
					}
					var ifdata=false;
					this.getdownData(url,sendTitle,ifdata)
				},
			
		}
				
	}
</script>

<style>

</style>
