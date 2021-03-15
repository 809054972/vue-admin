import axios from 'axios'

//创建axios，赋给service
//手把手撸码前端API，地址：http://www.web-jshtml.cn/productApi
const BASEURL =  process.env.NODE_ENV === 'production' ? '':'/devApi';
const service = axios.create({
    baseURL: BASEURL,   //http://192.168.0.106.8080/devApi == http://www.web-jshtml.cn/productapi
    timeout: 1000
});
//环境变量
// console.log(process.env.NODE_ENV)
// console.log(process.env.VUE_APP_ABC)

//添加请求拦截器
service.interceptors.request.use(function(config) {
    //在发送请求前应该做什么
    return config;
}, function(error) {
    //对请求错误做什么
    return Promise.reject(error);
});

//添加响应拦截器
service.interceptors.response.use(function(response) {
    //对响应数据做什么
    return response;
}, function(error) {
    //对响应错误做什么
    return Promise.reject(error);
});

export default service;

/**
 * 使用export default时
 * 文件 import 不需要花括号
 */
