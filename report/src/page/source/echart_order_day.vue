<template>
	<div class="echart_order_day all-echart">
		<Row :gutter="20">
			<col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
				<infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
					<count-to :end="infor.count" count-class="count-style"/>
					<p>{{ infor.title }}</p>
				</infor-card>
			</col>
		</Row>
	</div>
</template>
<script>
	export default {
		name:"echart_order_day",
			data() {
				return {
					key: 'sss',
					inforCardData: [
						{ title: '新增用户', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
						{ title: '累计点击', icon: 'md-locate', count: 232, color: '#19be6b' },
						{ title: '新增问答', icon: 'md-help-circle', count: 142, color: '#ff9900' },
						{ title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
						{ title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
						{ title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
					],
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
								color:"#000",
							},
							
						},
						color: ['#32fff5'],
						textStyle:{
							color:'#000',
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

<style>

</style>
