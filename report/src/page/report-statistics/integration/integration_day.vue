<template>
	<div class="integration_day">
		<div class="goback">
			<goBack gobackUrl="/integration" nowTitel="按日统计报表"></goBack>
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
		name:"integration_day",
		components:{
			goBack,
			dayTop
		},
		 data () {
			 
            return {
				tHeader:['日期','订单数量','商品数量','GMV(万)','销售总额(万)','抵扣总额(元)','实付总额(元)','客单价（元/单）'],
				filterVal:['date','orderNum','goodsAmount','grossMerchandiseVolume','salesTotal','deductionTotal','payAmount','perSales'],
				 columns: [
					 {
						title: '整合方按日报表',
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
								title: '销量总额(万)',
								key: 'salesTotal',
								align: "center",
								sortable: 'custom'
							},
							{
								title: '抵扣总额(万)',
								key: 'deductionTotal',
								align: "center",
								sortable: 'custom'
							},
							{
								title: '实付总额(万)',
								key: 'payAmount',
								align: "center",
								sortable: 'custom'
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
			}
		},
		mixins: [goday],
		mounted(){
			this.getlist()
		},
		methods:{
			getlist(){
				var sendTitle={
					integrationParty:this.$route.query.title,
				}
				var url=this.$api.integrationDay
				var mianTitle="整合方按日报表"
				var ifdata=true;
				this.getDayData(url,mianTitle,sendTitle,ifdata)
			},
		
			//下载
			downExcel(){
				var sendTitle={
					integrationParty:this.$route.query.title,
				}
				var url=this.$api.integrationDay
				var ifdata=true;
				this.getdownData(url,sendTitle,ifdata)
			},
			
		}

				
	}
</script>

<style>

</style>
