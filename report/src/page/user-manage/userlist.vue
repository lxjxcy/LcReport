<template>
	<div class="all">
		<div class="operation">
			<div class="search-user">
				<searchUser></searchUser>
			</div>
			<div class="add-user"></div>
		</div>
		<div class="tablelist">
			 <Table border height="400" :columns="columns" :data="userlist"></Table>
			 <div class="pages">
				 是是是
				<span class="inpage">
					<Page :total="total" show-total show-sizer @on-page-size-change="changeSize" @on-change="changePage" />
				</span>
			</div>
		</div>
	</div>
</template>
<script>
	import searchUser from "./searchUser.vue"
	export default {
		name:"userlist",
		components:{
			searchUser,
		},
		data () {
            return {
				total:40,
				pageParam:{
					pageNum:1,
					pageSize:10,
				},
                columns: [
					{
						title: '序号',
						key: 'index',
						width: 60,
						align: "center",
						render: (h, params) => {
							var index=params.index+(this.pageParam.pageNum - 1) * this.pageParam.pageSize + 1
							return h('div',{	
							},index)
						}
						
					},
					
                    {
                        title: '账户',
                        key: 'loginName',
						align: "center",
                    },
                    {
                        title: '姓名',
                        key: 'name',
						align: "center",
                    },
                    {
                        title: '角色',
                        key: 'address',
						align: "center",
                    },
					{
						title: '状态',
						key: 'state',
						align: "center",
					},
					{
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                           this.$Message.info('点击了修改')
                                        }
                                    }
                                }, '修改'),
                               h('Button', {
                                    props: {type: 'error', size: 'small'},
                                },[
                                    h('Poptip', {
                                        props: {
                                            confirm: true,
                                            transfer: true,
                                            placement: 'top',
                                            title: '确定要删除吗！',
                                            type: 'error',
                                            size: 'small',
                                            width: '200',

                                        },
                                        on: {
                                            'on-ok':  ()=>{
                                                this.$Message.info('点击了确定')
                                            },
                                            'on-cancel': function(){
                                                this.$Message.info('点击了取消')
                                            }
                                        }
                                    }, '删除')
								])
                            ]);
                        }
                    }
                ],
                userlist: [
                    
                ]
            }
        },
		mounted(){
			this.getlist()
		},
		methods:{
			getlist(){
				for(var i=0;i<24;i++){
					this.userlist.push(
					{
						loginName: 'lvwuy',
						name: "神到",
						address: 'New York No. 1 Lake Park',
						state:"启用",
						date: '2016-10-03'
					},
					)
				}	
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
		}
		
	}
</script>

<style scoped>
	.operation{
		height:120px;
		width:100%;
		background: #fff;
		margin-bottom: 10px;
	}
	.search-user{
		/* height:60px; */
		border-bottom: 1px dashed #ccc;
		padding:0 5px;
		padding-top: 5px;
	}

</style>
