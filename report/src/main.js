// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import router from './router'
import axios from "./axiosconfig/index.js"
// import "./directive"
// import {Option ,Modal ,Message ,Select ,Sider,RadioGroup,Col ,Row,DatePicker ,Input ,FormItem , Form ,Button, Radio,Dropdown,Icon,Card ,Menu,Upload,Breadcrumb,Table,Submenu,Page,DropdownMenu,DropdownItem,BreadcrumbItem,MenuItem} from 'iview';
// Vue.component('Option',Option );
// Vue.component('Modal',Modal );
// Vue.component('Message',Message );
// Vue.component('Select',Select );
// Vue.component('Sider',Sider );
// Vue.component('RadioGroup',RadioGroup );
// Vue.component('Col',Col );
// Vue.component('Row',Row );
// Vue.component('DatePicker',DatePicker);
// Vue.component('Input',Input);
// Vue.component('FormItem',FormItem);
// Vue.component('Form',Form);
// Vue.component('Button',Button);
// Vue.component('Radio',Radio);
// Vue.component('Dropdown',Dropdown);
// Vue.component('Icon',Icon);
// Vue.component('Card',Card);
// Vue.component('Menu',Menu);
// Vue.component('Upload',Upload);
// Vue.component('Breadcrumb',Breadcrumb);
// Vue.component('Table',Table);
// Vue.component('Page',Page);
// Vue.component('DropdownMenu',DropdownMenu);
// Vue.component('DropdownItem',DropdownItem);
// Vue.component('BreadcrumbItem',BreadcrumbItem);
// Vue.component('MenuItem',MenuItem);
// Vue.component('Submenu',Submenu);

// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts ;

import 'babel-polyfill'
// import $ from 'jquery'
// import 'bootstrap'
import iView from 'iview';


import 'iview/dist/styles/iview.css';
// import global_ from './global.js'
// Vue.prototype.GLOBAL = global_

// axios.defaults.withCredentials = true;
// Vue.prototype.axios = axios;

 router.beforeEach((to, from, next) => {
	 let token = store.state.token;
    if (to.matched.some(record => record.meta.Auth)) { // 判断该路由是否需要登录权限,能检测出带参数的路由
        if (token) {  // 通过vuex state获取当前的token是否存在
            next()
        } else {
            next({
                path: '/',
                // query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {

        next()
    }
})


if (JSON.parse(window.sessionStorage.getItem('userInfo'))) {
  store.commit('saveUserinfo', JSON.parse(window.sessionStorage.getItem('userInfo')))
}
if (JSON.parse(window.sessionStorage.getItem('saveData'))) {
  store.commit('saveDatainfo', JSON.parse(window.sessionStorage.getItem('saveData')))
}
if (window.sessionStorage.getItem('token')) {
  store.commit('setToken', window.sessionStorage.getItem('token'))
}

// Vue.prototype.$Message = Message;
// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$Modal = Modal;
// Vue.prototype.$alert = MessageBox.alert;
// Vue.prototype.$confirm = Message.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;
// Vue.prototype.$message = Message;
// Vue.prototype.$IVIEW = {}

Vue.config.productionTip = false
Vue.use(iView);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
