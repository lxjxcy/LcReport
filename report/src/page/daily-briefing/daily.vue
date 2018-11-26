<template>
	<div class="all">
		<!-- <Icon type="calendar"></Icon> -->
		<div  style="position: absolute;">
			<i-input icon="ivu-icon ivu-icon-ios-calendar-outline" @on-change="InhandleChange" ref="inputs"  clearable @on-blur="removefocus" :value="valueinput" placeholder="请选择日期" style="width: 200px" @on-focus="focusClick()"></i-input>			
			<div style="position: relative;left:0;top:-13px;">
				<Date-picker
					:open="open"
					
					:value="value3"
					type="date"
					@on-change="handleChange"
					@on-clear="handleClear"
					@on-ok="handleOk">
					<a href="javascript:void(0)" @click="handleClick">
						<!-- <Icon type="ios-calendar-outline"></Icon> -->
					<!--  <template v-if="value3 === ''">选择日期</template>
						<template v-else>{{ value3 }}</template> -->
					</a>
				</Date-picker>
			</div>	
		</div>
       
	</div>
	
</template>

<script>
	let moment = require("moment");
	export default {
		name:"daily",
		data(){
			return{
				 open: false,
				 value1:"3333",
				 valueinput:"",
				value3:"www",
			}
		},
		 methods: {
			 focusClick(){
				 console.log("222")
				 this.open = !this.open;
			 },
			 removefocus(){
				 this.open = false;
			 },
            handleClick () { 
            },
            handleChange(date) {
                this.value3 = date;
				var now= new Date(date).getDay();
				var nowDate=new Date(date).getDate();
				let  nowday= new Date(date).setDate(nowDate);
				let oneDay=1000*60*60*24;
				// let lastDay = moment(nowday-oneDay).format("YYYY-MM-DD");	
				var lDay;
				var nDay;			
				switch(now){
					case  1:
						lDay=3*oneDay;
						nDay=3*oneDay;
					 break;
					 case  2:
					 	lDay=4*oneDay;
					 	nDay=2*oneDay;
					 break;
					 case  3:
					 	lDay=5*oneDay;
					 	nDay=1*oneDay;
					 break;
					 case  4:
					 	lDay=6*oneDay;
					 	nDay=0*oneDay;
					 break;
					 case  5:
					 	lDay=0*oneDay;
					 	nDay=6*oneDay;
					 break;
					 case  6:
					 	lDay=1*oneDay;
					 	nDay=5*oneDay;
					 break;
					 case  0:
					 	lDay=2*oneDay;
					 	nDay=4*oneDay;
					 break;
				}
				this.getweek(nowday,lDay,nDay)
            },
			
			
			
			
			
			
			
			getweek(nowday,lDay,nDay){
				let lastDay = moment(nowday-lDay).format("YYYY-MM-DD");	
				let nextDay = moment(nowday+nDay).format("YYYY-MM-DD");
				this.valueinput=lastDay+"-"+nextDay;
				this.$refs.inputs.blur()
				
			},
			
            handleClear () {
                this.open = false;
				this.valueinput="";
				this.$refs.inputs.blur()
            },
            handleOk () {
                this.open = false;
				this.$refs.inputs.blur()
            },
			onChangeDate(date){
				this.value1=""
			}
        }
			
	}
</script>

<style>

</style>
