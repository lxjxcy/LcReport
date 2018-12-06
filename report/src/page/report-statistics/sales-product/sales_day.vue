<template>
	<div class="sales_day">
		<div class="goback">
			<goBack gobackUrl="/sales_name" nowTitel="按日统计报表"></goBack>
		</div>
		<div class="all">
			<dayTop v-on:getExcel="downExcel"></dayTop>
			<Table height="400"  @on-sort-change="startSort" :loading="loading" border :columns="columns" :data="data"></Table>
			<div class="pages"><span class="inpage"><Page :total="total" show-sizer show-total @on-page-size-change="changeSize" @on-change="changePage"/></span></div>
		</div>
	</div>
</template>
<script>
	import goBack from "../../../components/goBack.vue"
	import dayTop from "../../../components/day_top.vue"

	import goday from "../../../mixins/goday"
	
	export default {
		name:"sales_day",
		components:{
			goBack,
			dayTop
		},
		 data () {
			 
            return {
				tHeader:['日期', '商品原价', "售卖价","订单数",'商品数量','GMV(万)',"销量总额(元)","抵扣总额(元)","实付总额(元)"],
				filterVal:['date', 'originalPrice','salePrice', 'orderNum','goodsAmount','grossMerchandiseVolume',"salesTotal","deductionTotal","paymentAmount"],
				 columns: [
					 {
						title: '促销商品按日报表',
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
							sortable: 'custom'
// 							render: (h, params) => {
// 								var nowdata=new Date(params.row.date)
// 								var changdate =nowdata.getFullYear() + "-" + (nowdata.getMonth() + 1) + "-" + nowdata.getDate()
// 								return h('div',{	
// 								},changdate)
// 							}
							},
							{
							title: '商品原价',
							key: 'originalPrice',
							align: 'center',
							sortable: 'custom'
							},
							{
							title: '售卖价',
							key: 'salePrice',
							align: "center",
							sortable: 'custom'
							},
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
							title: '销售总额(元)',
							key: 'salesTotal',
							align: "center",
							sortable: 'custom',
							},
							{
							title: '抵扣总额(元)',
							key: 'deductibleTotal',
							align: "center",
							sortable: 'custom',
							},
							{
							title: '实付总额(元)',
							key: 'paymentAmount',
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
					goodsName:this.$route.query.title,
				}
				var url=this.$api.salesDay
				var mianTitle="促销商品按日报表"
				var ifdata=true;
				this.getDayData(url,mianTitle,sendTitle,ifdata)
			},
		
			//下载
			downExcel(){
				var sendTitle={
					goodsName:this.$route.query.title,
				}
				var url=this.$api.salesDay
				var ifdata=true;
				this.getdownData(url,sendTitle,ifdata)
			},

			
		}				
	}
</script>

<style>

</style>
