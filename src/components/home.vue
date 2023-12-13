import loginSVG from "@/assets/login.svg"

<script setup>
import router from '../router';

//用户名
var userName;
//状态码
var number;
/**
 * 检测用户是否登录
 */
function onIsLogin(){
    return userName,number;
}

/**
 * 跳转到登录页
 */
function toLogin(){
    router.push('/login')
    console.log('from home to login')
}

</script>

<template>
    <div class="header">
        <a href="https://tfswufe.edu.cn/"><img src="../assets//logo.png" alt="logo.png" class="logo"></a>
        <div class="login" v-on:mousedown="toLogin()">
            <img src="../assets/login.svg" class="loginsvg">
            {{ userName }}
        </div>
    </div>
</template>
<style>
.header {
    margin-top: 1%;
    height: 60px;
    border-bottom: 1px solid rgb(203, 201, 201);
}

.logo {
    margin-left: 10%;
    width: 150px;
}

.login {
    display: inline-block;
    margin-left: 60%;
    width: 100px;
    height: 60px;
    line-height: 60px;
}
.login:hover{
    cursor: pointer;
}
.loginsvg {
    margin-top: 13px;
    margin-left: 10%;
    width: 30px;
}
</style>