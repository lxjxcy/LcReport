<template>
	<div class="product_day">
		<div class="goback">
			<goBack gobackUrl="/product_name" nowTitel="按日统计报表"></goBack>
		</div>
		<div class="all">
			<dayTop v-on:getExcel="downExcel"></dayTop>
			<Table height="400" @on-sort-change="startSort" :loading="loading" border :columns="columns" :data="data"></Table>
			<div class="pages"><span class="inpage"><Page :total="total" show-sizer show-total @on-page-size-change="changeSize" @on-change="changePage"/></span></div>
		</div>
	</div>
</template>
<script>
	import goBack from "../../../components/goBack.vue"
	import dayTop from "../../../components/day_top.vue"
	import goday from "../../../mixins/goday"
	export default {
		name:"product_day",
		components:{
			goBack,
			dayTop
		},
		 data () {
			 
       return {
				tHeader:['日期','订单来源','订单数量','商品数量','商品数量','GMV(万)','订单总价(元)','订单均价(元)'],
				filterVal:['date','orderSource','orderNum','goodsNum','grossMerchandiseVolume','totalPrice','averagePrice'],
				 columns: [
					 {
						title: '商品名称按日报表',
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
							title: '订单来源',
							key: 'orderSource',
							align: 'center',
							// sortable: 'custom'
							},
							{
							title: '订单数量',
							key: 'orderNum',
							align: 'center',
							sortable: 'custom'
							},
							{
							title: '商品数量',
							key: 'goodsNum',
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
							title: '订单总价(元)',
							key: 'totalPrice',
							align: "center",
							sortable: 'custom'
							},
							{
							title: '订单均价(元)',
							key: 'averagePrice',
							align: "center",
							sortable: 'custom'
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
				var url=this.$api.goodsDay
				var mianTitle="商品名称按日报表"
				var ifdata=true;
				this.getDayData(url,mianTitle,sendTitle,ifdata)
			},
			//下载
			downExcel(){
				var sendTitle={
					goodsName:this.$route.query.title,
				}
				var url=this.$api.goodsDay
				var ifdata=true;
				this.getdownData(url,sendTitle,ifdata)
			},
		
			
		}				
	}
</script>

<style>

</style>
