import { post } from '../axiosconfig/'
import { get } from '../axiosconfig/'
export default {
	//获取验证码
	getCode(params) {
		return post('/report/user/getCode', params)
	},
	//登录
	login(params) {
		return get('/report/user/loginUser', params)
	},
	//修改密码
	changePass(params){
		return get('/report/user/updatePassword', params)
	},
	//文件导入日志
	fileLog(params){
		return get('/report/log/queryFileUploadLogs', params)
	},
	//数据是否清洗完成
	cleanOut(params){
		return get('/report/shell/validateOrderByCleanup', params)
	},
	//查看是否已生成报表
	existReport(params){
		return post('/report/channel/existReport', params)
	},

//	用户订单详情
	getOrderDetails(params){
		return get('/report/userStat/queryOrderDetails', params)
	},
	//下载用户excel摸版
	downloadTemplate(params){
		return get('/report/userStat/downloadTemplate',params,{responseType: 'blob'})
	},
	//生成用户维度报表
	runUser(params){
		return post('/report/shell/runUser',params)
	},
	//角色列表
	getRoleList(params){
		return get('/report/role/queryRoleList',params)
	},
	//新增角色
	addRole(params){
		return post('/report/role/insertRole',params)
	},
	//角色删除修改
	updateRole(params){
		return post('/report/role/updateRole',params)
	},
	//用户列表
	getUserList(params){
		return post('/report/user/queryUserList',params)
	},
	//查询用户
	searchUserlist(params){
		return get('/report/user/userFuzzyQuery',params)
	},//查询用户
	searchRolelist(params){
		return get('/report/role/roleFuzzyQuery',params)
	},
	
	//注册用户
	registerUser(params){
		return get('/report/user/registerUser',params)
	},
	//用户修改删除
	updateUser(params){
		return post('/report/user/updateUser',params)
	},
	//用户、角色查询权限接口
	getPermission(params){
		return get('/report/user/queryPermission',params)
	},
	
	
	
	
	
	
	
	
	
	
	
	//生成日报
	runMonth:"/report/shell/runMonth",//生成月报表
	runWeek:"/report/shell/runWeek",//生成周报表
	runDay:"/report/shell/runDay",//生成日报表
	//渠道维度
	channelMonth:"/report/channel/queryMonth",//月
	channelWeek:"/report/channel/queryWeek",//周
	channelDay:"/report/channel/queryDay",//日
	channelOtherdate:"/report/channel/aggregateQuery",//任意时段报表
	channelSecMonth:"/report/channel/querySecMonth",//月报二级渠道
	channelSecWeek:"/report/channel/querySecWeek",//周报二级渠道
	channelSecOther:"/report/channel/aggregationSecQuery",//任意时段二级渠道
	
	//分公司
	companyMonth:"/report/company/queryMonth",
	companyWeek:"/report/company/queryWeek",
	companyDay:"/report/company/queryDay",
	companyOtherdate:"/report/company/aggregateQuery",
	companyDetailMonth:"/report/company/queryGoodsDetailMonth",
	companyDetailWeek:"/report/company/queryGoodsDetailWeek",
	companyDetailOther:"/report/company/aggregationSecQuery",
	
	// 整合方
	integrationMonth:"/report/integration/queryMonth",
	integrationWeek:"/report/integration/queryWeek",
	integrationDay:"/report/integration/queryDay",
	integrationOtherdate:"/report/integration/aggregateQuery",
	integrationSecMonth:"/report/integration/querySecMonth",
	integrationSecWeek:"/report/integration/querySecWeek",
	integrationSecOther:"/report/integration/aggregationSecQuery",
	
	
	//营销活动
	MarkethingMonth:"/report/Markething/queryMonth",
	MarkethingWeek:"/report/Markething/queryWeek",
	MarkethingOtherdate:"/report/Markething/aggregateQuery",
	//商品名称
	goodsMonth:"/report/goods/queryMonth",
	goodsWeek:"/report/goods/queryWeek",
	goodsDay:"/report/goods/queryDay",
	goodsOtherdate:"/report/goods/aggregateQuery",
	//项目名称
	projectMonth:"/report/project/queryMonth",
	projectWeek:"/report/project/queryWeek",
	projectDay:"/report/project/queryDay",
	projectOtherdate:"/report/project/aggregateQuery",
	//促销商品
	salesMonth:"/report/sales/queryMonth",
	salesWeek:"/report/sales/queryWeek",
	salesDay:"/report/sales/queryDay",
	salesOtherdate:"/report/sales/aggregateQuery",
	//供应商
	supplierMonth:"/report/supplier/queryMonth",
	supplierWeek:"/report/supplier/queryWeek",
	supplierDay:"/report/supplier/queryDay",
	supplierOtherdate:"/report/supplier/aggregateQuery",
}