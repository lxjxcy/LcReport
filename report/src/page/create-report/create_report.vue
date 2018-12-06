<template>
	<div class="create_report">
	<Tabs :value="indexname" @on-click="getName" type="card">
        <TabPane label="月报" name="name1"><Cmonth></Cmonth></TabPane>
        <TabPane label="周报" name="name2"><Cweek></Cweek></TabPane>
        <TabPane label="日报" name="name3"><Cday></Cday></TabPane>
    </Tabs>		
	</div>
	
</template>
<script>
	import Cmonth from "./c_month.vue"
	import Cweek from "./c_week.vue"
	import Cday from "./c_day.vue"
	export default {
		
		name:"create_report",
		components:{
			Cweek,
			Cmonth,
			Cday
		},
		data(){
			return{
				indexname:"name1",
				
			}
		},
		mounted() {
			this.$store.state.loading=false;
		},
		methods:{
			getName(name){
				this.$store.state.loading=false;
				this.indexname=name
				
				
			}
		}
		
	}
</script>

<style>
	.ivu-tabs-bar{
		margin-bottom: 0;
	}
	.create_report{
		margin:10px;
	}

</style>
