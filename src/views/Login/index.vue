<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tap">
                <li :class="{'current': item.current}" v-for="item in menuTab" :key="item.id" @click="toggleMenu(item)">{{item.text}}</li>    <!-- key指循环物的唯一性 -->
            </ul>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="login-form" size="medium">
                <el-form-item prop="username" class="item-form">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="password" class="item-form">
                    <label>密码</label>
                    <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="passwords" class="item-form" v-if="model === 'register'">
                    <label>再次输入密码</label>
                    <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="code" class="item-form">
                    <label>验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="13">
                            <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
                        </el-col>
                        <el-col :span="11">
                            <el-button type="success" class="block">获取验证码</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" class="block login-btn" @click="submitForm('ruleForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { stripscript,validateEmail,validatePass,validateVCode } from '@/utils/validate.js';
export default {
    name: 'login', //当前的名称
    data() {
        //验证邮箱格式
        var validateUsername = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入邮箱'));
            } else if(validateEmail(value)) {
                callback(new Error('邮箱格式有误'));
            } else {
                callback();
            }
        };
        //验证密码
        var validatePassword = (rule, value, callback) => {
            // 过滤后的数据
            this.ruleForm.password = stripscript(value);
            value = this.ruleForm.password

            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (validatePass(value)) {
                callback(new Error('密码为6~20位数字+字母!'));
            } else {
                callback();
            }
        };
        //验证重复密码
        var validatePasswords = (rule, value, callback) => {
            //模块是login的话直接跳过
            if(this.model === 'login'){
                callback();
            }
            // 过滤后的数据
            this.ruleForm.passwords = stripscript(value);
            value = this.ruleForm.passwords

            if (value === '') {
                callback(new Error('请输入重复密码'));
            }else if(this.ruleForm.passwords != this.ruleForm.password){
                callback(new Error('两次输入的密码不相同'))
            }else if (validatePass(value)) {
                callback(new Error('密码为6~20位数字+字母!'));
            } else {
                callback();
            }
        };
        var validateCode = (rule, value, callback) => {
            this.ruleForm.code = stripscript(value);
            value = this.ruleForm.code
            if (value === '') {
                return callback(new Error('请输入验证码'));
            }else if(validateVCode(value)){
                return callback(new Error('验证码格式有误'));
            }else{
                callback();
            }
        };
        return {
            model: 'login',
            menuTab: [
                {text: '登录', current: true    , type: 'login'},
                {text: '注册', current: false, type: 'register'}
            ],
            ruleForm: {
                username: '',
                password: '',
                code: '',
                passwords: ''
            },
            rules: {
                username: [
                    { validator: validateUsername, trigger: 'blur' }    //失去焦点触发validatePass
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                passwords: [
                    { validator: validatePasswords, trigger: 'blur' }
                ],
                code: [
                    { validator: validateCode, trigger: 'blur' }
                ]
            }
        }
    },
    components: { //组件放置组件名称

    },
    created() { //创建完成时

    },
    mounted() { //挂载完成时

    },
    //定义函数
    methods: {
        toggleMenu(data) {
            //遍历让所有current变为false
            this.menuTab.forEach(elem => {
                elem.current = false
            })
            //高光
            data.current = true
            //修改模块值
            this.model = data.type
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        }
    },
    props: { //子组件接收父组件参数

    },
    watch: {

    }
}
</script>

<style lang="scss" scoped>  //不加scoped表示对全局有效，加了只对当前有效
#login {
    height: 100vh;  //vh指可视区，100vh满屏，50vh半屏
    background-color: #344a5f;
}
.login-wrap {
    width: 330px;   //ul的宽度
    margin: auto;
}
.menu-tap {
    text-align: center;
    li {
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px; //圆角
        cursor: pointer;    //点击是手势
    }
}
.current {
    background-color: rgba(0,0,0,.1);   //透明
}
.login-form {
    margin-top: 29px;
    label {
        display: block;
        margin-bottom: 3px;
        font-size: 14px;
        color: #fff;
    }
    .item-form {
        margin-bottom: 13px;
    }
}
.block {
    width: 100%;
    display: block;
}
.login-btn {
    margin-top: 19px;
}
</style>