<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import router from '../router';
import  usestudentStore  from "../stores/usestudentStore"
// axios全局调用配置
const currentInstance = getCurrentInstance();
const { $http } = currentInstance.appContext.config.globalProperties;
const { proxy } = currentInstance;

const logindata = ref(null);

const user = reactive({
    uname: '',
    upassword: ''
})

/**
 * 登录方法 登录时判断用户是否登录
 * 登录->前往用户信息 未登录->前往登录
 */
const onlogin = async () => {
    // 使用URLSearchParams()进行post请求传参
    let pram = new URLSearchParams();
    pram.append("sid", user.uname);
    pram.append("spassword", user.upassword);
    proxy.$http.post("/api/slogin", pram).then((res) => {
        if (res.data != "") {
            ElMessage({
                message: '登录成功！',
                type: 'success',
            })
            const store = usestudentStore();
            store.studentMsg = res.data
            router.push('/')
        } else {
            ElMessage.error('账号或密码错误');
            user.upassword= '';
        }
    })
}

/**
 * 监听键盘enter事件
 */
document.addEventListener('keydown', (e) => {
	let key = window.event.keyCode;
    if (key == 13) {
        onlogin();
	}
})

</script>

<template>
    <div class="bodybox">
        <div class="loginbox">
            <img src="../assets/logo.png" class="loginlogo">
            <p class="wc">欢迎回来</p>
            <el-form :model="user" ref="logindata">
                <el-form-item prop="uname">
                    <el-input v-model="user.uname" placeholder="请输入您的账号" clearable class="un" />
                </el-form-item>
                <el-form-item prop="upassword">
                    <el-input v-model="user.upassword" placeholder="请输入您的密码" show-password class="up" />
                </el-form-item>
                <el-form-item>
                    <el-button class="sub" type="primary" @click="onlogin()">登录</el-button>
                </el-form-item>
            </el-form>

        </div>
        <div class="signinbox">

        </div>
        <div class="titlebox">

        </div>
    </div>
</template>

<style>
.bodybox {
    margin: 0 auto;
    margin-top: 8%;
    width: 50%;
    height: 450px;
}

.loginbox {
    float: left;
    width: 50%;
    height: 450px;
    background-color: #ffffff;
    text-align: center;
    border: 1px solid rgb(197, 197, 197);
    border-radius: 15px;
}

.loginlogo {
    width: 150px;
    height: 50px;
    margin-top: 5%;
}

.wc {
    font-size: 20px;
    margin-top: 5%;
}

.un {
    width: 80%;
    margin-top: 5%;
    margin-left: 10%;
}

.up {
    width: 80%;
    margin-top: 5%;
    margin-left: 10%;
}

.sub {
    width: 60%;
    height: 35px;
    margin-top: 5%;
    margin-left: 20%;
}

.signinbox {
    width: 50%;
    height: 450px;
    background-color: #6d1e1e;
    margin-left: 50%;
}
</style>