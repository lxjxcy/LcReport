<template>
	<div class="use_day">
		<div class="goback">
			<goBack gobackUrl="/use_name" nowTitel="按日统计报表"></goBack>
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
		name:"use_day",
		components:{
			goBack,
			dayTop
		},
		 data () {
			 
            return {
				tHeader:['日期','订单数量','商品数量','GMV(万)','销售总额(元)','抵扣总额(元)','实付总额(元)'],
				filterVal:['date','orderNum','goodsAmount','grossMerchandiseVolume','salesTotal','deductionTotal','payAmount'],
				 columns: [
					 {
						title: '应用按日报表',
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
								render: (h, params) => {
									var toFix=params.row.grossMerchandiseVolume.toFixed(2)
									return h('div',{	
									},toFix)
								}
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
		methods:{
			getlist(){
				var sendTitle={
					applicationName:this.$route.query.title,
				}
				var url="/application/queryDay"
				var mianTitle="应用按日报表"
				this.getDayData(url,mianTitle,sendTitle)
			},
	
			//下载
			downExcel(){
				this.export2Excel()
			},
	
			
		}
				
	}
</script>

<style>

</style>
