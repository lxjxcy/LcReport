import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
 import order_source from '@/page/report-statistics/source/order_source'
 import second_source from '@/page/report-statistics/source/second_source'
 import home from '@/page/home'
 import day_report from '@/page/report-statistics/source/day_report'
 
 import company_name from '@/page/report-statistics/branch-company/company_name'
 import company_day from '@/page/report-statistics/branch-company/company_day'

 import product_detail from '@/page/report-statistics/branch-company/product_detail'
 import integration from '@/page/report-statistics/integration/integration'
 
 import integration_day from '@/page/report-statistics/integration/integration_day'

 import integration_sec from '@/page/report-statistics/integration/integration_sec'
 import activity_name from '@/page/report-statistics/market-activity/activity_name'

 import product_name from '@/page/report-statistics/product-name/product_name'
 import product_day from '@/page/report-statistics/product-name/product_day'

 import project_name from '@/page/report-statistics/project-name/project_name'
 import project_day from '@/page/report-statistics/project-name/project_day'

 import sales_name from '@/page/report-statistics/sales-product/sales_name'
 import sales_day from '@/page/report-statistics/sales-product/sales_day'

 import supplier_name from '@/page/report-statistics/supplier/supplier_name'
 import supplier_day from '@/page/report-statistics/supplier/supplier_day'

 import shop_stores from '@/page/upload_file/shop_stores'
 import lvcheng_app from '@/page/upload_file/lvcheng_app'

 
 import use_name from '@/page/report-statistics/make-use/use_name'
 import create_report from '@/page/create-report/create_report'
 
 
 import use_day from '@/page/report-statistics/make-use/use_day'
 import province_name from '@/page/report-statistics/provinces/province_name'
 import province_day from '@/page/report-statistics/provinces/province_name'

 import user_name from '@/page/report-statistics/users-report/user_name'
 import user_product from '@/page/report-statistics/users-report/user_product'
 


 import login from '@/page/login/login'

export default new Router({
  routes: [
		{
			path: '/',
			name: 'login',
			component:login
			// component: resolve => require(['@/page/login/login'], resolve),
		},
    {
			path: '/source',
			name: 'home',
      meta: {Auth: true},
			component:home,
			// component: resolve => require(['@/page/home'], resolve),
			children:[
				//渠道维度
				{
					path:'/source/source',
					name:'order_source',
					meta: {Auth: true},
					component:order_source
					// component: resolve => require(['@/page/report-statistics/source/order_source'], resolve),
				},
				{
					path:'/source/day_report',
					name:'day_report',
					meta: {Auth: true},
					component:day_report

					// component: resolve => require(['@/page/report-statistics/source/day_report'], resolve),
				},
				{
					path:'/source/second_source',
					name:'second_source',
					meta: {Auth: true},
					component:second_source
					// component: resolve => require(['@/page/report-statistics/source/second_source'], resolve),
				},
				
				//分公司维度
				{
					path:'/company_name',
					name:'company_name',
					meta: {Auth: true},
					component:company_name
					// component: resolve => require(['@/page/report-statistics/branch-company/company_name'], resolve),
				},
				{
					path:'/company_name/company_day',
					name:'company_day',
					meta: {Auth: true},
					component:company_day
					// component: resolve => require(['@/page/report-statistics/branch-company/company_day'], resolve),
				},
				{
					path:'/company_name/product_detail',
					name:'product_detail',
					meta: {Auth: true},
					component:product_detail
					// component: resolve => require(['@/page/report-statistics/branch-company/product_detail'], resolve),
				},
				//整合方维度
				{
					path:'/integration',
					name:'integration',
					meta: {Auth: true},
					component:integration

					// component: resolve => require(['@/page/report-statistics/integration/integration'], resolve),
				},
				{
					path:'/integration/integration_day',
					name:'integration_day',
					meta: {Auth: true},
					component:integration_day
					// component: resolve => require(['@/page/report-statistics/integration/integration_day'], resolve),
				},
				{
					path:'/integration/integration_sec',
					name:'integration_sec',
					meta: {Auth: true},
					component:integration_sec
					// component: resolve => require(['@/page/report-statistics/integration/integration_sec'], resolve),
				},
				
				
				//应用维度
				{
					path:'/use_name',
					name:'use_name',
					meta: {Auth: true},
					component:use_name,
					// component: resolve => require(['@/page/report-statistics/make-use/use_name'], resolve),
				},
				{
					path:'/use_name/use_day',
					name:'use_day',
					meta: {Auth: true},
					component:use_day
					// component: resolve => require(['@/page/report-statistics/make-use/use_day'], resolve),
				},
				//营销活动
				{
					path:'/activity_name',
					name:'activity_name',
					meta: {Auth: true},
					component:activity_name
					// component: resolve => require(['@/page/report-statistics/market-activity/activity_name'], resolve),
				},
				//商品名称维度
				{
					path:'/product_name',
					name:'product_name',
					meta: {Auth: true},
					component:product_name
					// component: resolve => require(['@/page/report-statistics/product-name/product_name'], resolve),
				},
				{
					path:'/product_name/product_day',
					name:'product_day',
					meta: {Auth: true},
					component:product_day
					// component: resolve => require(['@/page/report-statistics/product-name/product_day'], resolve),
				},
				//项目名称维度
				{
					path:'/project_name',
					name:'project_name',
					meta: {Auth: true},
					component: resolve => require(['@/page/report-statistics/project-name/project_name'], resolve),
				},
				{
					path:'/project_name/project_day',
					name:'project_day',
					meta: {Auth: true},
					component:project_day
					// component: resolve => require(['@/page/report-statistics/project-name/project_day'], resolve),
				},
				//促销商品维度
				{
					path:'/sales_name',
					name:'sales_name',
					meta: {Auth: true},
					component:sales_name
					// component: resolve => require(['@/page/report-statistics/sales-product/sales_name'], resolve),
				},
				{
					path:'/sales_name/sales_day',
					name:'sales_day',
					meta: {Auth: true},
					component:sales_day
					// component: resolve => require(['@/page/report-statistics/sales-product/sales_day'], resolve),
				},
				//供应商维度
				{
					path:'/supplier_name',
					name:'supplier_name',
					meta: {Auth: true},
					component:supplier_name
					// component: resolve => require(['@/page/report-statistics/supplier/supplier_name'], resolve),
				},
				{
					path:'/supplier_name/supplier_day',
					name:'supplier_day',
					meta: {Auth: true},
					component:supplier_day
					// component: resolve => require(['@/page/report-statistics/supplier/supplier_day'], resolve),
				},
				
				//省份维度
				{
					path:'/province_name',
					name:'province_name',
					meta: {Auth: true},
					component:province_name
					// component: resolve => require(['@/page/report-statistics/provinces/province_name'], resolve),
				},
				{
					path:'/province_name/province_day',
					name:'province_day',
					meta: {Auth: true},
					component:province_day
					// component: resolve => require(['@/page/report-statistics/provinces/province_day'], resolve),
				},
				//用户维度
				{
					path:'/user_name',
					name:'user_name',
					meta: {Auth: true},
					component: resolve => require(['@/page/report-statistics/users-report/user_name'], resolve),
				},
				{
					path:'/user_name/user_product',
					name:'user_product',
					meta: {Auth: true},
					component: resolve => require(['@/page/report-statistics/users-report/user_product'], resolve),
				},
				//文件导入
				{
					path:'/upload_file/order1',
					name:'lvcheng_app',
					meta: {Auth: true},
					component:lvcheng_app
					// component: resolve => require(['@/page/upload_file/file_name'], resolve),
				},
				{
					path:'/upload_file/order2',
					name:'shop_stores',
					meta: {Auth: true},
					component:shop_stores
					// component: resolve => require(['@/page/upload_file/file_name'], resolve),
				},
				//报表生成
				{
					path:'/create-report/create_report',
					name:'create_report',
					meta: {Auth: true},
					component:create_report
					// component: resolve => require(['@/page/create-report/create_report'], resolve),
				},
				//用户管理
// 				{
// 					path:'/user-manage/userlist',
// 					name:'userlist',
// 					meta: {Auth: true},
// 					component: resolve => require(['@/page/user-manage/userlist'], resolve),
// 				},
				
			]
    }, 
  ]
})
