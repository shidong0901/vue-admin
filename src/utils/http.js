import Fly from 'flyio/dist/npm/fly';

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Message from '@/utils/message'
import MessageBox from '@/utils/messageBox'

// 创建fly实例
let fly = new Fly();

NProgress.configure({
    showSpinner: false
})

// 正在请求的请求url数组
let pending = [];

// 是否正在请求
let isPending = url => pending.includes(url);

// 移除完成的请求
let removePending = url => {
    let index = pending.findIndex(item => item === url);
    pending.splice(index, 1);
};

fly.interceptors.request.use(request => {
    // 定义needIntercept判断是否需要拦截相同request,Promise.all中的请求不需要拦截
    if (request.headers.needIntercept && isPending(request.url)) {
        //终止请求
        return Promise.reject(new Error('重复请求已被拦截!'));
    }
    pending.push(request.url);
    request.headers.needNprogress && NProgress.start();
    return request;
});

fly.interceptors.response.use(response => {
    removePending(response.request.url);
    !pending.length && NProgress.done();
    // 将response.data转换成json对象
    'string' === typeof response.data && (response.data = JSON.parse(response.data));
    if (1 === response.data.success) {
        return response.data;
    }
    Message.error(response.data.result || '系统错误,请联系管理员!');
    return Promise.reject(new Error(response.data.result || '系统错误,请联系管理员!'));
}, error => {
    removePending(error.request.url);
    !pending.length && NProgress.done();
    // 弹窗提示系统错误
    MessageBox.alert('系统错误,请联系管理员!', 'error');
    return Promise.reject(new Error('系统错误,请联系管理员!'));
});

let request = (url, params, method = 'POST', needIntercept = true, needNprogress = true) => {
    let result = fly.request(url, params, {
        method: method,
        headers: {
            'needIntercept': needIntercept,
            'needNprogress': needNprogress
        }
    });
    return result;
}

export default {
    request
}