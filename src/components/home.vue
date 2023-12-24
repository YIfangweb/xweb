import loginSVG from "@/assets/login.svg"

<script setup>
import router from '../router';
import  {ref ,onMounted} from "vue";
import usestudentStore from "../stores/usestudentStore.js";
import useteacherStore from "../stores/useteacherStore.js";


// 取出pinia存储的数据

var userName = ref('');

onMounted( ()=>{
  // 判断用户是否登录
  if (Object.keys(usestudentStore().studentMsg).length !== 0){
      userName.value = usestudentStore().studentMsg.sname
  }else if(Object.keys(useteacherStore().teacherMsg).length !== 0){
      userName.value = useteacherStore().teacherMsg.tname
  }else {
      userName.value = '请登录'
  }
})
/**
 * 跳转到登录页或者用户信息页
 */
const toLogin=()=>{
    let u = userName.value
    if(u === '请登录'){
        router.push('/login')  
    }
    if(typeof(u) != 'undefined' && u !== '请登录'){
        router.push('/userInfo')
    }else{
        router.push('/login')
    }
}


</script>

<template>
    <div class="header">
        <a href="https://tfswufe.edu.cn/"><img src="../assets//logo.png" alt="logo.png" class="homelogo"></a>
        <div class="login"  @click="toLogin()">
            <img src="../assets/login.svg" class="loginsvg">
            {{ userName }}
        </div>
    </div>
    <div class="bodys">
        <div class="searcher">
            <el-input v-model="search" placeholder="请输入关键字"></el-input>
            <el-button @click="searchPaper" type="primary">查询</el-button>
        </div>
    </div>
</template>
<style>
.searcher{
    width: 80%;
    height: 80px;
    margin-top: 10px;
}
.bodys{
    width: 80%;
    margin-left: 10%;
}
.header {
    margin-top: 1%;
    height: 60px;
    border-bottom: 1px solid rgb(203, 201, 201);
}

.homelogo {
    margin-left: 10%;
    width: 150px;
    height: 50px;
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
    margin-left: 10%;
    margin-top: 15%;
    width: 30px;
}
</style>