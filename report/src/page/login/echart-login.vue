<template>
	<div class="echart-login">
		<div id="employee" :style="{width: '500px', height: '330px'}"></div>
	</div>
</template>
<script>	
	export default {
		name:"echart-login",
		data() {
			return {
				key: 'sss'
			}
		},
		mounted(){
			this.getChart();
		},
		methods: {
			 getChart(){
				 let employee = this.$echarts.init(document.getElementById('employee'))
				 employee.setOption({
					 title: {
						 
					 	text: '订单量',
						padding:5,
						borderColor:"#fff",  
					 	x:'left',
					 	textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
					 		// fontFamily: 'Arial, Verdana, sans...',
					 		fontSize: 12,
					 		backgroundColor:"#f0f",
					 		fontStyle: 'normal',
					 		fontWeight: 'normal',
					 		color:"#fff",
					 	},
					 	
					 },
					 color: ['#32fff5'],
					 textStyle:{
					 	color:'#fff',
					 },
					 
				    xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
						axisLine: {
							lineStyle: {
								type: 'solid',
								color: '#30dbe3',
								width: '1'
							}
						},
						
						splitLine: {
							show: false
						}, //去除网格线
						splitArea: {
							show: false
						}, //保留网格区域
					},
					yAxis: {
						type: 'value',
						axisLine: {
							lineStyle: {
								type: 'solid',
								color: '#30dbe3',
								width: '1'
							}
						},
						
						splitLine: {
							show: false
						}, //去除网格线
						splitArea: {
							show: false
						}, //保留网格区域
					},
					tooltip : {
						trigger: 'item',
						formatter: "{c}%)"
					},
					series: [{
						data: [35, 67, 90, 12, 45, 50, 80],
						type: 'bar',
						x:20,
						barWidth : 20,//柱图宽度
						itemStyle: {
							normal: {							
								label: {
									show: true,
									position: 'top',
									formatter: '{c}%'　　　　//这是关键，在需要的地方加上就行了
								}
							}
						},
					}]
				});
			}
	
		},
	}

</script>
<style scoped>
	
	
</style>