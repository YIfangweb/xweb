
<script setup>
import usestudentStore from "../stores/usestudentStore.js";
import useteacherStore from "../stores/useteacherStore.js";
import router from "../router/index.js";

/**
 * 退出登录  清除本地存储的用户信息
 */
const loginOut = () =>{
  usestudentStore().$reset()
  useteacherStore().$reset()
  router.push('/')
}
</script>

<template>
    <el-button @click="loginOut()" >
      退出登录
    </el-button>
</template>