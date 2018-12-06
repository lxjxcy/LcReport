<template>
	<div class="product_name all">
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
		<div class="pages"><span class="inpage"><Page v-if="hackReset" :total="total"  show-total show-sizer @on-page-size-change="changeSize" @on-change="changePage" /></span></div> 
	</div>
</template>
<script>
	import orderTop from "../../../components/order_top.vue"
	import goshowPage from "../../../mixins/index"
	export default {
		name:"product_name",
		components:{
			orderTop
		},
		 data () {
			return {
				tHeader:['商品名称','订单来源','订单数量','商品数量','GMV(万)','商品数量','订单总价(元)','订单均价(元)'],
				filterVal:['goodsName','orderSource','orderNum','goodsNum','grossMerchandiseVolume','totalPrice','averagePrice'],
				filterValother:['goods_name','order_source','order_num','goods_num','GMV','total_price','per_sales'],
				
				 columns: [
					 {
						 title: '商品月报表',
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
								sortable: 'custom',
								},
							 {
							 	title: '订单均价(元)',
							 	key: 'averagePrice',
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
																path: '/product_name/product_day',
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
						title: '商品报表',
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
								key: 'goods_name',
								align: "center",
							},
							{
							title: '订单来源',
							key: 'order_source',
							align: 'center',
							// sortable: 'custom'
							},
							{
								title: '订单数量',
								key: 'order_num',
								align: 'center',
								sortable: 'custom'
							},
							{
								title: '商品数量',
								key: 'goods_num',
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
								title: '订单总价(元)',
								key: 'total_price',
								align: "center",
								sortable: 'custom',
							},
							{
								title: '订单均价(元)',
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
																path: '/product_name/product_day',
																query: {
																	title: params.row.goods_name
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
						title: '商品月报表',
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
		mixins: [goshowPage],
		mounted(){
			var mianTitle="商品"
			this.mounthData(mianTitle)
		},
		methods:{
			//获取报表
			showSend(date){
				var queryMonth=this.$api.goodsMonth
				var queryWeek=this.$api.goodsWeek
				var queryDay=this.$api.goodsDay
				var queryOther=this.$api.goodsOtherdate
				this.getTabledata(date,queryMonth,queryWeek,queryDay,queryOther)		
			},	
			//清空日期
			clearDate(){
				var mianTitle="商品"
				this.changtitle(mianTitle)
			},
			//获取日期
			showParam(data){
				var mianTitle="商品"+data;
				this.changetitle(mianTitle)		
			},
			//获取月，周
			showMonth(data){
			var mianTitle="商品"
			this.getMonthweek(data,mianTitle)	
			},

				//下载
				downExcel(){
				var queryMonth=this.$api.goodsMonth
				var queryWeek=this.$api.goodsWeek
				var queryDay=this.$api.goodsDay
				var queryOther=this.$api.goodsOtherdate
					this.getdownData(queryMonth,queryWeek,queryDay,queryOther)
				},

		}
				
	}
</script>

<style>

</style>
