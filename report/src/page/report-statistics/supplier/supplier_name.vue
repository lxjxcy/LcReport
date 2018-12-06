<template>
	<div class="supplier_name all">
		<orderTop v-on:clearPage="showPage" v-on:getTitle="showParam" v-on:getClear="clearDate" v-on:getExcel="downExcel" v-on:getMonth="showMonth"  v-on:getDateparam="showSend"></orderTop>
		<Table height="400" 
			@on-sort-change="startSort"
			v-if="this.$store.state.saveData.showDate==1||this.$store.state.saveData.showDate==2"
			:loading="loading"
			border 
			:columns="columns" 
			:data="reportData">
		</Table>
		<Table height="400"
		@on-sort-change="startSort"
			v-if="this.$store.state.saveData.showDate==3"
			:loading="loading"
				border :columns="columnsday"
				:data="reportData">
		</Table>
		<Table height="400"
		@on-sort-change="startSort"
			v-if="this.$store.state.saveData.showDate==4"
			:loading="loading" border :columns="columnsother"
				:data="reportData">
		</Table>
		<div class="pages"><span class="inpage"><Page v-if="hackReset" :total="total"   show-total show-sizer @on-page-size-change="changeSize" @on-change="changePage" /></span></div> 
	</div>
</template>
<script>
	import orderTop from "../../../components/order_top.vue"
	import goshowPage from "../../../mixins/index"
	export default {
		name:"supplier_name",
		components:{
			orderTop
		},
		 data () {
			return {
				tHeader:['供应商名称','订单来源', '订单数', '商品数量','GMV(万)',"销量总额(元)","抵扣总额(元)","实付总额(元)","客单价（元/单）"],
				filterVal:['supplierName','orderSource', 'orderNum','goodsAmount', 'grossMerchandiseVolume',"salesTotal","deductionTotal","payAmount","perSales"],
				 filterValother:['supplier_name','order_source', 'order_num','goods_amount', 'GMV',"sales_total","deduction_total","pay_amount","per_sales"],
				 
				 columns: [
					 {
						 title: '供应商统计月报表',
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
							 	title: '供应商名称',
							 	key: 'supplierName',
							 	align: "center",
							 },
							 {
							 title: '订单来源',
							 key: 'orderSource',
							 align: 'center',
							 // sortable: 'custom'
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
							 {
							 title: '详情',
							 key: 'action',
							 align: "center",
							render: (h, params) => {
								return h('Dropdown',[
											h('Button','查看'),
											h('DropdownMenu',{
												slot:"list"
											},[
												h('DropdownItem',{
													nativeOn:{
														click:(name)=>{
															this.$router.push({
																path: '/supplier_name/supplier_day',
																query: {
																	title: params.row.supplierName
																}
															})
														}
													}
												},'日详情'),
											])
										])									
							   }						 
							 }
						 ]
					 }           
        ],
				columnsother: [
					{
						title: '供应商统计报表',
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
								title: '供应商名称',
								key: 'supplier_name',
								align: "center",
							},
							{
							title: '订单来源',
							key: 'order_source',
							align: 'center',
							// sortable: 'custom'
							},
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
							{
								title: 'GMV(万)',
								key: 'GMV',
								align: "center",
								sortable: 'custom',
							},
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
							{
							title: '详情',
							key: 'action',
							align: "center",
							render: (h, params) => {
								return h('Dropdown',[
											h('Button','查看'),
											h('DropdownMenu',{
												slot:"list"
											},[
												h('DropdownItem',{
													nativeOn:{
														click:(name)=>{
															this.$router.push({
																path: '/supplier_name/supplier_day',
																query: {
																	title: params.row.supplier_name
																}
															})
														}
													}
												},'日详情'),
											])
										])									
								}						 
							}
						]
					}           
				],
						 columnsday: [
									 {
										 title: '供应商统计月报表',
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
											 	title: '供应商名称',
											 	key: 'supplierName',
											 	align: "center",
											 },
											 {
											 title: '订单来源',
											 key: 'orderSource',
											 align: 'center',
											 // sortable: 'custom'
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
				
			}
		},
		mixins: [goshowPage],
		mounted(){
			var mianTitle="供应商统计"
			this.mounthData(mianTitle)
		},
		methods:{
			//获取报表
			showSend(date){
				var queryMonth=this.$api.supplierMonth
				var queryWeek=this.$api.supplierWeek
				var queryDay=this.$api.supplierDay
				var queryOther=this.$api.supplierOtherdate
				this.getTabledata(date,queryMonth,queryWeek,queryDay,queryOther)		
			},	
			//清空日期
			clearDate(){
				var mianTitle="供应商统计"
				this.changtitle(mianTitle)
			},
			//获取日期
			showParam(data){
				var mianTitle="供应商统计"+data;
				this.changetitle(mianTitle)		
			},
			//获取月，周
			showMonth(data){
			var mianTitle="供应商统计"
				this.getMonthweek(data,mianTitle)
			
			},	
			//下载
			downExcel(){
					var queryMonth=this.$api.supplierMonth
					var queryWeek=this.$api.supplierWeek
					var queryDay=this.$api.supplierDay
					var queryOther=this.$api.supplierOtherdate
				this.getdownData(queryMonth,queryWeek,queryDay,queryOther)
			},

		}				
	}
</script>

<style>

</style>
