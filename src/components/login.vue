<script setup>
    import axios from '../api/axios.js';
    import { ref, reactive, unref } from 'vue'
    const params = reactive({
        verify: { key: null }
    })
    const initAfter = (res) => {
        if (res?.ret?.code === 200) {
            localStorage.setItem('mi-captcha-key', res?.data?.key)
            params.verify.key = res?.data?.key
        }
    }
    //是否通过验证
    const isReady = ref(false);

    const logindata =ref(null);
    
    const user = reactive({
        uname: '',
        upassword: ''
    })

    const onlogin = async() =>{
        const form = unref(logindata);
        axios({
            method:'post',
            url:'/login',
            params:{
                sid: user.uname,
                spassword: user.upassword
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });

    }

</script>

<template>
    <div class="bodybox">
        <div class="loginbox">
            <img src="../assets/logo.png" class="loginlogo">
            <p class="wc">欢迎回来</p>
            <el-form 
            :model="user"
            ref="logindata">
                <el-form-item  prop="uname">
                    <el-input v-model="user.uname" placeholder="请输入您的账号" clearable class="un" />
                </el-form-item>
                <el-form-item  prop="upassword">
                    <el-input v-model="user.upassword" placeholder="请输入您的密码" show-password class="up" />
                </el-form-item>
                <el-form-item>
                    <div style="margin-left: 10%;margin-top: 5%;">
                        <mi-captcha 
                        :width="300" 
                        :height="35"
                        bgColor="#fff" 
                        textColor="#000"
                        borderColor="#000"
                        theme-color="#fff" 
                        boxShadow="false"
                        init-action="v1/captcha/init" 
                        @init="initAfter"
                        verify-action="v1/captcha/verification" 
                        :verify-params="params.verify" />
                    </div>
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
.loginlogo{
    width: 150px;
    height: 50px;
    margin-top: 5%;
}
.wc{
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
.sub{
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