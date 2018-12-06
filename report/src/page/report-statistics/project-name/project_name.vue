<template>
	<div class="project_name all">
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
		name:"project_name",
		components:{
			orderTop
		},
		 data () {
			return {
				tHeader:['园区名称','订单数量','商品数量','商品数量','GMV(万)','订单总价(元)','订单均价(元)'],
				filterVal:['yearName','orderNum','goodsNum','grossMerchandiseVolume','salesTotal','deductionTotal'],
				filterValother:['_id','order_num','goods_num','GMV','sales_total','deduction_total'],
				 
				 columns: [
					 {
						 title: '项目月报表',
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
							 	title: '园区名称',
							 	key: 'yearName',
							 	align: "center",
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
							 	key: 'salesTotal',
							 	align: "center",
								sortable: 'custom'
							 },
							 {
							 	title: '订单均价(元)',
							 	key: 'deductionTotal',
							 	align: "center",
								sortable: 'custom'
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
																path: '/project_name/project_day',
																query: {
																	title: params.row.yearName
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
						title: '项目报表',
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
								title: '园区名称',
								key: '_id',
								align: "center",
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
								key: 'sales_total',
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
																path: '/project_name/project_day',
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
						title: '项目月报表',
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
								title: '园区名称',
								key: 'yearName',
								align: "center",
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
								key: 'salesTotal',
								align: "center",
								sortable: 'custom'
							},
							{
								title: '订单均价(元)',
								key: 'deductionTotal',
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
			var mianTitle="项目"
			this.mounthData(mianTitle)
		},
		methods:{
			//获取报表
			showSend(date){
				var queryMonth=this.$api.projectMonth
				var queryWeek=this.$api.projectWeek
				var queryDay=this.$api.projectDay
				var queryOther=this.$api.projectOtherdate
				this.getTabledata(date,queryMonth,queryWeek,queryDay,queryOther)		
			},	
			//获取日期
			showParam(data){
			var mianTitle="项目"+data;
			this.changetitle(mianTitle)		
			},
			//清空日期
			clearDate(){
				var mianTitle="项目"
				this.changtitle(mianTitle)
			},
			//获取月，周
			showMonth(data){
			var mianTitle="项目"
				this.getMonthweek(data,mianTitle)
			},
				//下载
				downExcel(){
					var queryMonth=this.$api.projectMonth
					var queryWeek=this.$api.projectWeek
					var queryDay=this.$api.projectDay
					var queryOther=this.$api.projectOtherdate
					this.getdownData(queryMonth,queryWeek,queryDay,queryOther)
					// this.export2Excel()
				},

		}				
	}
</script>

<style>

</style>
