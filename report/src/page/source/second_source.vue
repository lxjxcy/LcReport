<template>
	<div class="second_source">
		<div class="goback">
			<goBack gobackUrl="/source/source" nowTitel="二级渠道统计"></goBack>
		</div>
		<div class="all">
			<dayTop v-on:getExcel="downExcel"></dayTop>
			<Table height="400" :loading="loading"  border :columns="columns" :data="data"></Table>
			<div class="pages"><span class="inpage"><Page :total="total" show-sizer show-total @on-page-size-change="changeSize" @on-change="changePage"/></span></div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import goBack from "../../components/goBack.vue"
	import dayTop from "../../components/day_top.vue"
import goday from "../../mixins/goday"
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
				pageParam:{
					pageNum:1,
					pageSize:10,
				},
				tHeader:['二级渠道',  '订单数',"销量总额(元)","抵扣总额(元)","实付总额(元)","客单价（元/单）"],
				filterVal:['orderChildSource', 'orderNum',"salesTotal","deductionTotal","payAmount","perSales"],
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
										title: '二级渠道',
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
				
				var mianTitle="二级渠道按统计报表"
				this.getsed(url,mianTitle,sendTitle)
				

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
