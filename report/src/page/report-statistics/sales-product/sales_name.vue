<template>
	<div class="sales_name all">
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
		<div class="pages"><span class="inpage"><Page v-if="hackReset" :total="total" show-total show-sizer @on-page-size-change="changeSize" @on-change="changePage" /></span></div> 
	</div>
</template>
<script>
	import orderTop from "../../../components/order_top.vue"
	import goshowPage from "../../../mixins/index";
	export default {
		name:"sales_name",
		components:{
			orderTop
		},
		 data () {
			return {
				tHeader:['商品名称', '商品原价', "售卖价","订单数",'商品数量','GMV(万)',"销量总额(元)","抵扣总额(元)","实付总额(元)"],
				
				filterVal:['goodsName', 'originalPrice','salePrice', 'orderNum','goodsAmount','grossMerchandiseVolume',"salesTotal","deductionTotal","paymentAmount"],
				filterValother:['_id', 'original_price','sale_Price', 'order_num','goods_amount','GMV',"sales_total","deduction_total","payment_amount"],
				 columns: [
					 {
						 title: '促销商品月报表',
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
							 	title: '商品名称',
							 	key: 'goodsName',
							 	align: "center",
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
																path: '/sales_name/sales_day',
																query: {
																	title: params.row.goodsName
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
						title: '促销商品报表',
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
								title: '商品名称',
								key: '_id',
								align: "center",
							},
							{
								title: '商品原价',
								key: 'original_price',
								align: 'center',
								sortable: 'custom'
							},
							{
								title: '售卖价',
								key: 'sale_price',
								align: "center",
								sortable: 'custom'
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
								title: '销售总额(元)',
								key: 'sales_total',
								align: "center",
								sortable: 'custom',
							},
							{
							title: '抵扣总额(元)',
							key: 'deductible_total',
							align: "center",
							sortable: 'custom',
							},
							{
							title: '实付总额(元)',
							key: 'payment_amount',
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
																path: '/sales_name/sales_day',
																query: {
																	title: params.row._id
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
						title: '促销商品月报表',
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
								title: '商品名称',
								key: 'goodsName',
								align: "center",
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
		mixins: [goshowPage],
		mounted(){
			var mianTitle="促销商品"
			this.mounthData(mianTitle)
		},
		methods:{
			//获取报表
			showSend(date){
				var queryMonth=this.$api.salesMonth
				var queryWeek=this.$api.salesWeek
				var queryDay=this.$api.salesDay
				var queryOther=this.$api.salesOtherdate
				this.getTabledata(date,queryMonth,queryWeek,queryDay,queryOther)		
			},	
			//清空日期
			clearDate(){
				var mianTitle="促销商品"
				this.changtitle(mianTitle)
			},
			//获取日期
			showParam(data){
				var mianTitle="促销商品"+data;
				this.changetitle(mianTitle)		
			},
			//获取月，周
			showMonth(data){
			var mianTitle="促销商品"
				this.getMonthweek(data,mianTitle)
				
			},	
			//下载
			downExcel(){
			var queryMonth=this.$api.salesMonth
			var queryWeek=this.$api.salesWeek
			var queryDay=this.$api.salesDay
			var queryOther=this.$api.salesOtherdate
			this.getdownData(queryMonth,queryWeek,queryDay,queryOther)
			},

		}
				
	}
</script>

<style>

</style>
