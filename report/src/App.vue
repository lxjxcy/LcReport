<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	 height:100%;


  color: #2c3e50;
 
}
ul{
	list-style: none;;
}
.r{
	float: right;
}
.report{
	/* height:80px; */
	background: #fff;
	width:100%;
	margin-bottom:10px;
	padding:10px 10px;
	padding-bottom: 0;
}
.all{
	margin:15px;
}
.ivu-col-span-11{
	width: 100%;
}
.ivu-form-inline .ivu-form-item{
	margin-right: 70px;
}
.type-report{
	height:40px;
	border-bottom: 1px dashed #ccc;
	background: #fff;
	padding:1px 10px;
	
}
.pages{
	padding: 10px;
	background: #fff;
	margin-right: 20px;;
	width:100%;
	overflow: hidden;
}
.pages .inpage{
	float: right;
	overflow: hidden;
	display: inline-block;
}
.goback{
	padding: 8px;
	background-color: #f9f9fa;
	margin: 5px 0;
}
/* 表格行高度 */
.ivu-table td, .ivu-table th{
	height:40px;
}

/* .ivu-date-picker-with-range .ivu-picker-panel-content{
	float: right !important;
} */
/* 单选框位置 */
.ivu-radio-wrapper{
	margin:0 15px;
}
/* //加载背景色 */
.ivu-spin-fullscreen-wrapper .ivu-spin-fix{
	background-color: rgba(0,0,0,.6) !important ;
}

/* 加载动画 */
 .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
		
		
	//按钮图标大小
	.ivu-btn>.ivu-icon{
		font-size: 16px !important;
	}

</style>
