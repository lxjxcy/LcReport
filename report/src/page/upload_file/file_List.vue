<template>
	<div class="fileList">
		<Table  height="330" :columns="columns1" :data="fileData" style="margin-top:10px"></Table>
	</div>
</template>
<script>
	export default {
		name:"fileList",
		data(){
			return{
				type:"1",
				columns1: [
					{
						title: '序号',
						type: 'index',
						align: "center",
						width:60			
					},
					
					{
						title: '上传用户',
						key: 'userName',
						align: "center",			
					},
                    {
                        title: '文件名',
                        key: 'fileName',
						align: "center",			
                    },
                    {
                        title: '文件大小',
                        key: 'fileSize',
						align: "center",			
                    },
                    {
                        title: '上传时间',
                        key: 'uploadTime',
						align: "center",
						render: (h, params) => {
							var datetime=moment(params.row.uploadTime).format('YYYY-MM-DD HH:mm:ss')
                            return h('div', [
								
                                h('div', datetime)
                            ]);
                        }
                    },
					{ 
						title: '上传用时',
						key: 'takeTime',
						align: "center",
						render: (h, params) => {
								var minutes = parseInt((params.row.takeTime % (1000 * 60 * 60)) / (1000 * 60));
								var seconds = (params.row.takeTime % (1000 * 60)) / 1000;
								var datetime =(seconds>1?parseInt(seconds):seconds) + " 秒 ";
							
								if(minutes>0){
									datetime = minutes + " 分钟 " +datetime;
								}
								if(seconds==0){
									datetime=""
								}
							return h('div', [
								
								h('div', datetime)
							]);
						}
					},
					{
						title: '上传状态',
						key: 'message',
						align: "center",
// 						render: (h, params) => {
// 							var content="导入失败";
// 							  switch (params.row.status) {
// 								  case 0 :
// 									content= '开始导入'
// 									break
// 								  case 1 :
// 									content= '导入中...'
// 									break
// 								  case 2:
// 									content= '导入完成'
// 									break
// 									case 3:
// 									content= '摸版错误'
// 									break
// 								}
// 							return h('div', [
// 								
// 								h('div', content)
// 							]);
// 						}
					}
          ],
        fileData: []
			}
		},
		mounted(){
			this.getfileData()
		},
		methods:{
			getfileData(){
				let path = this.$route.matched[1].path  
				if(path.indexOf('/upload_file/order1') == 0){
					this.type="1"
				}
				if(path.indexOf('/upload_file/order2') == 0){
					this.type="2"
				}
				var params={
					type:this.type
				}
				this.$api.fileLog(params).then(res=>{
					if(res.code==0){
						this.fileData=res.data.rows;
					}
				})
			}
			
		}
		
	}
</script>

<style scoped>
	.fileList{
		
	}

</style>
