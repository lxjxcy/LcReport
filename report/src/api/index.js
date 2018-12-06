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