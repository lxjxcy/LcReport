<template>
	<div class="day_report">
		<div class="goback">
			<goBack gobackUrl="/source/source" nowTitel="按日统计报表"></goBack>
		</div>
		<div class="all">
			<dayTop v-on:getExcel="downExcel"></dayTop>
			<Table height="400" :loading="loading" border :columns="columns" :data="data"></Table>
			<div class="pages"><span class="inpage"><Page :total="total" show-sizer show-total @on-page-size-change="changeSize" @on-change="changePage"/></span></div>
			<!-- <echartDay></echartDay> -->
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import dayTop from "../../components/day_top.vue"
	import echartDay from "./echart_order_day.vue"
	import goBack from "../../components/goBack.vue"
	import goday from "../../mixins/goday"
	export default {
		name:"day_report",
		components:{
			goBack,
			dayTop,
			echartDay
		},
		 data () {
			 
            return {
				total:0,
				loading:false,
				pageParam:{
					pageNum:1,
					pageSize:10,
				},
				tHeader:['日期', '下单用户数', '订单数',"销量总额(万)","抵扣总额(万)","实付总额(万)","客单价（元/单）"],
				filterVal:['date', 'orderUserNum', 'orderNum',"salesTotal","deductionTotal","payAmount","perSales"],
				 columns: [
					 {
						 title: '渠道按日统计',
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
							 	align: 'center',
// 								render: (h, params) => {
// 									var nowdata=new Date(params.row.date)
// 									var changdate =nowdata.getFullYear() + "-" + (nowdata.getMonth() + 1) + "-" + nowdata.getDate()
// 									 return h('div',{	
// 									},changdate)
// 								}
							 },
							 {
							 	title: '下单用户数',
							 	key: 'orderUserNum',
							 	align: 'center'
							 },
							 {
							 	title: '订单数',
							 	key: 'orderNum',
							 	align: "center",
							 },
							{
								title: '销量总额(万)',
								key: 'salesTotal',
								align: "center",
							},
							{
								title: '抵扣总额(万)',
								key: 'deductionTotal',
								align: "center",
							},
							{
								title: '实付总额(万)',
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
		mounted(){
			this.getlist()
		},
		methods:{
			getlist(){
				var sendTitle={
					orderSource:this.$route.query.title,
				}
				var url="/channel/queryDay"
				var mianTitle="渠道按日统计报表"
				this.getDayData(url,mianTitle,sendTitle)
			},
			//选择页数
			changePage(val){
				this.pageParam.pageNum=val;
				this.getlist()
			},
			//每页显示多少条
			changeSize(val){
				this.pageParam.pageSize=val;
				this.getlist()
			},	
			//下载
			downExcel(){
				var sendTitle={
					orderSource:this.$route.query.title,
				}
				var url="/channel/queryDay";
				var ifdata=true;
				this.getdownData(url,sendTitle,ifdata)
			}
			
		}
				
	}
</script>

<style>

</style>
