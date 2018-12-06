<template>
	<div>
		<Form :model="search2" label-position="left">
			<FormItem label="报表类型"
				:rules="{required: true, trigger: 'blur'}">
				<RadioGroup v-model="search2.reportType" @on-change="changeModels">
					<Radio v-for="item in workOrderList" :label="item.label" :key="item.value"></Radio>
				</RadioGroup>
			</FormItem>
		</Form>
		
	</div>
	
</template>

<script>
	export default {
		name:"reportType",
		data(){
			return{
				workOrderList:[
					{
					label:'月报',
					value:'1'
					},{
					label:'周报',
					value:'2'
					},
					{
					label:'日报',
					value:'3'
					},
// 					{
// 					label:'任意时段报表',
// 					value:'4'
// 					}
				],
				search2:{
					reportType:'',
				},
			}
		},
		methods:{
			changeModels(e){
				this.$emit("changechild",e)
			}
		}
		
		
		 
	}
</script>

<style>

</style>
