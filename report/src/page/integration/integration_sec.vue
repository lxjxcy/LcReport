<template>
	<div class="integration_sec">
		<div class="goback">
			<goBack gobackUrl="/integration" nowTitel="二级整合方报表"></goBack>
		</div>
		<div class="all">
			<dayTop v-on:getExcel="downExcel"></dayTop>
			<Table height="400" :loading="loading" border :columns="columns" :data="data"></Table>
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
		name:"integration_sec",
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
				tHeader:['商家整合','订单数量','销售总额(元)','抵扣总额(元)','实付总额(元)','客单价（元/单）'],
				filterVal:['merchantIntegration','orderNum','salesTotal','deductionTotal','payAmount','perSales'],
				 columns: [
					 {
						title: '二级整合方报表',
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
								title: '商家整合',
								key: 'merchantIntegration',
								align: 'center'
							},
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
					integrationParty:this.$route.query.title,
				}
				if(this.$store.state.saveData.showDate==1){
					var url="/report/integration/querySecMonth"
				}else{
					var url="/report/integration/querySecWeek"
				}
				
				var mianTitle="二级整合方报表"
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
						integrationParty:this.$route.query.title,
					}
					if(this.$store.state.saveData.showDate==1){
						var url="/report/integration/querySecMonth"
					}else{
						var url="/report/integration/querySecWeek"
					}
					var ifdata=false;
					this.getdownData(url,sendTitle,ifdata)
				},
			
		}
				
	}
</script>

<style>

</style>
