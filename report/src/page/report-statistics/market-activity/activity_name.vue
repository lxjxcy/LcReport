<template>
	<div class="activity_name all">
		<orderTop v-on:clearPage="showPage" v-on:getTitle="showParam" v-on:getClear="clearDate" v-on:getExcel="downExcel" v-on:getMonth="showMonth"  v-on:getDateparam="showSend"></orderTop>
		<Table height="400" @on-sort-change="startSort" v-if="this.$store.state.saveData.showDate!=3" :loading="loading" border :columns="columns" :data="reportData"></Table>
		<Table height="400" @on-sort-change="startSort" v-if="this.$store.state.saveData.showDate==3" :loading="loading" border :columns="columnsday" :data="reportData"></Table>
		<div class="pages"><span class="inpage"><Page v-if="hackReset" :total="total"  show-total show-sizer @on-page-size-change="changeSize" @on-change="changePage" /></span></div> 
	</div>
</template>
<script>
	import orderTop from "../../../components/order_top.vue"
	import goshowPage from "../../../mixins/index"
	export default {
		name:"activity_name",
		components:{
			orderTop
		},
		 data () {
			return {
				tHeader:['活动名称','商品名称','单价(元)','商品数量','GMV(万)','订单数量','销售总额(元)','抵扣总额(元)','实付总额(元)'],
				filterVal:['activityName','commodityName','unitPrice','orderNum','goodsAmount','grossMerchandiseVolume','salesTotal','deductionTotal','payAmount'],
				filterValother:['_id','commodity_ame','unit_price','order_num','goods_amount','GMV','salesTotal','deduction_total','pay_amount'],
				
				 columns: [
					 {
						 title: '营销活动月报表',
						 key: 'month',
						 align: "center",						 
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
							 	title: '活动名称',
							 	key: 'activityName',
							 	align: "center",
							 },
							 {
							 	title: '商品名称',
							 	key: 'commodityName',
							 	align: 'center'
							 },
							 {
							 	title: '单价(元)',
							 	key: 'unitPrice',
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
						 ]
					 }           
                ],
				columnsday:[
					 {
						 title: '营销活动月报表',
						 key: 'month',
						 align: "center",						 
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
								title: '活动名称',
								key: 'activityName',
								align: "center",
							 },
							 {
								title: '商品名称',
								key: 'commodityName',
								align: 'center'
							 },
							 {
								title: '单价',
								key: 'unitPrice',
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
								title: '销售总额(万)',
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
							 }

						 ]
					 }
					
				],
			}
		},
		mixins: [goshowPage],
		mounted(){
			var mianTitle="营销活动"
			this.mounthData(mianTitle)
		},
		methods:{
			//获取报表
			showSend(date){
				var queryMonth=this.$api.MarkethingMonth
				var queryWeek=this.$api.MarkethingWeek
				var queryDay=this.$api.MarkethingWeek
				var queryOther=this.$api.MarkethingOtherdate
				
				this.getTabledata(date,queryMonth,queryWeek,queryDay,queryOther)		
			},	
			//清空日期
			clearDate(){
				var mianTitle="营销活动"
				this.changtitle(mianTitle)
			},
			
			//获取日期
			showParam(data){
				var mianTitle="营销活动"+data;
				this.changetitle(mianTitle)		
			},
			//获取月，周
			showMonth(data){
			var mianTitle="营销活动"
			this.getMonthweek(data,mianTitle)
				
			},
			//下载
			downExcel(){
				var queryMonth=this.$api.MarkethingMonth
				var queryWeek=this.$api.MarkethingWeek
				var queryDay=this.$api.MarkethingWeek
				var queryOther=this.$api.MarkethingOtherdate
				
				this.getdownData(queryMonth,queryWeek,queryDay,queryOther)
			},
	
		}				
	}
</script>

<style>

</style>
