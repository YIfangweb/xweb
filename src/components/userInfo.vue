
<script setup>
import studentPaper from "../components/studentPaper.vue";
import studentTopic from "../components/studentTopic.vue";
import studentInfo from "../components/studentInfo.vue";
import usestudentStore from "../stores/usestudentStore.js";
import useteacherStore from "../stores/useteacherStore.js";
import router from "../router/index.js";
import { ref } from "vue";

/**
 * 退出登录  清除本地存储的用户信息
 */
const loginOut = () =>{
  usestudentStore().$reset()
  useteacherStore().$reset()
  router.push('/')
}

const menuindex = ref(1)
/**
 * 菜单栏切换
 * @param {*} index
 */
const handleSelect = (index) => {
  menuindex.value = index
}
</script>

<template>
  <div class="menu">
    <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
      <el-menu-item index="1"><i class="el-icon-document"></i>我的论文</el-menu-item>
      <el-menu-item index="2"><i class="el-icon-message"></i>我的课题</el-menu-item>
      <el-menu-item index="3"><i class="el-icon-user"></i>我的信息</el-menu-item>
      <el-menu-item index="4" v-on:click="loginOut()"><i class="el-icon-switch-button"></i>退出登录</el-menu-item>
    </el-menu>
  </div>
  <div class="bodys">
    <div v-if="menuindex === 1">
      <studentPaper></studentPaper>
    </div>
    <div v-if="menuindex === 2">
      <studentTopic></studentTopic>
    </div>
    <div v-if="menuindex === 3">
      <studentInfo></studentInfo>
    </div>
  </div>
</template>

<style scoped>
.menu {
    width: 10%;
    height: 100%;
    float: left;
    margin-top: 15%;
}
</style>