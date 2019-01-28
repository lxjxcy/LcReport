<template>
	<div class="create_report">
	<Tabs :value="indexname" @on-click="getName" type="card">
        <TabPane label="月报" name="name1"></TabPane>
        <TabPane label="周报" name="name2"></TabPane>
        <TabPane label="日报" name="name3"></TabPane>
		<TabPane label="用户" name="name4"></TabPane>
    </Tabs>	
		<router-view/>
	</div>
	
</template>
<script>
	import Cmonth from "./c_month.vue"
	import Cweek from "./c_week.vue"
	import Cday from "./c_day.vue"
	import Cuser from "./c_user.vue"
	export default {
		name:"create_report",
		components:{
			Cweek,
			Cmonth,
			Cday,
			Cuser
		},
		data(){
			return{
				indexname:"name1",
				
			}
		},
		mounted() {
			this.$store.state.loading=false;
			
			let path = this.$route.matched[1].path  
			if(path.indexOf('/create-report/c_month')!=0){
				this.indexname="name1";	
				return
			}
			if(path.indexOf('/create-report/c_week')!=0){
				this.indexname="name2";	
							return
			}
			if(path.indexOf('/create-report/c_day')!=0){
				this.indexname="name3";	
							return
			}
			if(path.indexOf('/create-report/c_user')!=0){
				this.indexname="name4";	
							return
			}
			
		},
		methods:{
			getName(name){
				this.$store.state.loading=false;
				this.indexname=name;
				if(name=="name1"){
					this.$router.push("/create-report/c_month");

				}
				if(name=="name2"){
					this.$router.push("/create-report/c_week");

				}
				if(name=="name3"){
					this.$router.push("/create-report/c_day");

				}
				if(name=="name4"){
					this.$router.push("/create-report/c_user");

				}
				
				
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
