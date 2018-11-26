<template>
	<div class="all">
		<Icon type="calendar"></Icon>
		<i-input icon="ivu-icon ivu-icon-ios-calendar-outline" @on-blur="removefocus" :value="value3" placeholder="请选择日期" style="width: 200px" @on-focus="focusClick()"></i-input>
		 <!-- <Date-picker :value="value1" format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 200px"></Date-picker> -->
       <Date-picker
        :open="open"
        :value="value3"
        confirm
        type="date"
        @on-change="handleChange"
        @on-clear="handleClear"
        @on-ok="handleOk">
        <a href="javascript:void(0)" @click="handleClick">
            <!-- <Icon type="ios-calendar-outline"></Icon> -->
            <template v-if="value3 === ''">选择日期</template>
            <template v-else>{{ value3 }}</template>
        </a>
    </Date-picker>
	</div>
	
</template>

<script>
	export default {
		name:"daily",
		data(){
			return{
				 open: false,
				value3:"2010-12-12-2018-12-12"
			}
		},
		 methods: {
			 focusClick(){
				 // alert("111")
				 console.log("222")
				 this.open = !this.open;
			 },
			 removefocus(){
				 this.open = false;
			 },
            handleClick () {
                
            },
            handleChange (date) {
                this.value3 = date;
            },
            handleClear () {
                this.open = false;
            },
            handleOk () {
                this.open = false;
            }
        }
			
	}
</script>

<style>

</style>
