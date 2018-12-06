<template>
	<div class="second_source">
		<div class="goback">
			<goBack gobackUrl="/user_name" nowTitel="用户商品统计"></goBack>
		</div>
		<div class="all">
			<dayTop v-on:getExcel="downExcel"></dayTop>
			<Table height="400" @on-sort-change="startSort" :loading="loading"  border :columns="columns" :data="data"></Table>
			<div class="pages"><span class="inpage"><Page :total="total" show-sizer show-total @on-page-size-change="changeSize" @on-change="changePage"/></span></div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import goBack from "../../../components/goBack.vue"
	import dayTop from "../../../components/day_top.vue"
import goday from "../../../mixins/goday"
	export default {
		name:"second_source",
		components:{
			goBack,
			dayTop
		},
		 data () { 
      return {
				total:0,
				loading:false,
				sortParam:{},
				pageParam:{
					pageNum:1,
					pageSize:10,
				},
				tHeader:['商品名称',  '订单数','商品数量','GMV(元)',"销量总额(元)","抵扣总额(元)","实付总额(元)","客单价（元/单）"],
				filterVal:['orderChildSource', 'orderNum','goodsAmount', "grossMerchandiseVolume","salesTotal","deductionTotal","payAmount","perSales"],
						columns: [
							{
								title: '二级渠道统计报表',
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
										key: 'orderChildSource',
										align: 'center',	
									},
// 									{
// 										title: '下单用户数',
// 										key: 'orderUserNum',
// 										align: 'center'
// 									},
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
										title: '销量总额(元)',
										key: 'salesTotal',
										align: "center",
										sortable: 'custom',
										render: (h, params) => {
											var toFix=params.row.salesTotal.toFixed(2)
											return h('div',{	
											},toFix)
										}
									},
									{
										title: '抵扣总额(元)',
										key: 'deductionTotal',
										align: "center",
										sortable: 'custom',
										render: (h, params) => {
											var toFix=params.row.deductibleTotal.toFixed(2)
											return h('div',{	
											},toFix)
										}
									},
									{
										title: '实付总额(元)',
										key: 'payAmount',
										align: "center",
										sortable: 'custom',
										render: (h, params) => {
											var toFix=params.row.payAmount.toFixed(2)
											return h('div',{	
											},toFix)
										}
									},
									{
										title: '客单价(元/单)',
										key: 'perSales',
										align: "center",
										sortable: 'custom',
										render: (h, params) => {
											var toFix=params.row.perSales.toFixed(2)
											return h('div',{	
											},toFix)
										}
									},
								]
							}            
				],
				
				data: []
				
			}
		},
		mixins: [goday],
		mounted(){
			this.getlist()
		},
		methods:{
			getlist(){
				var sendTitle={
					orderSource:this.$route.query.title,
				}
				if(this.$store.state.saveData.showDate==1){
					var url="/report/channel/querySecMonth"
				}
				if(this.$store.state.saveData.showDate==2){
					var url="/report/channel/querySecWeek"
				}
				
				var mianTitle="用户商品统计报表"
				this.getsed(url,mianTitle,sendTitle)
			},
			//下载
			downExcel(){
				var sendTitle={
					orderSource:this.$route.query.title,
				}
				if(this.$store.state.saveData.showDate==1){
					var url="/report/channel/querySecMonth"
				}
				if(this.$store.state.saveData.showDate==2){
					var url="/report/channel/querySecWeek"
				}
				var ifdata=false;
				this.getdownData(url,sendTitle,ifdata)
			},
			
		}
	}
</script>

<style>

</style>
