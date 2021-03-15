import service from '@/utils/request'

/**
 * 获取验证码
 */
export function GetSms() {
    service.request({
        method: 'post',
        url: '/getSms/',
        data
        // data:data，左边的data是变量名（key），是后台接收的。右边的data是接收的参数。如果两者同名则可以写成一个（ES6写法）
    });
}

/**
 * 获取用户角色
 */

/*
* 登录
*/


/*
* 注册
*/