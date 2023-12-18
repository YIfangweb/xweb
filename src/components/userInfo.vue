
<script setup>
import usestudentStore from "../stores/usestudentStore.js";
import useteacherStore from "../stores/useteacherStore.js";
import router from "../router/index.js";
import {reactive, ref} from "vue";
import studentTopic from "./studentTopic.vue";
import studentPaper from "./studentPaper.vue";
import studentInfo from "./studentInfo.vue";


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

/**
 * 定义组件数组 comList[]
 */
const comList ={
    1 : studentPaper,
    2 : studentTopic,
    3 : studentInfo
}

const menuHeight = reactive({data : "0px"})

/**
 * 获取浏览器视口高度，设置菜单栏高度
 */
menuHeight.data = document.documentElement.clientHeight * 0.7 + "px"


</script>

<template>

  <div class="menu">
    <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
      <el-menu-item index="1">我的论文</el-menu-item>
      <el-menu-item index="2">我的课题</el-menu-item>
      <el-menu-item index="3">我的信息</el-menu-item>
      <el-menu-item index="4" v-on:click="loginOut()">退出登录</el-menu-item>
    </el-menu>
  </div>
  <div class="bodys">
    <keep-alive>
      <component :is="comList[menuindex]"></component>
    </keep-alive>
  </div>
</template>

<style scoped>
.menu {
    width: 12%;
    height: v-bind('menuHeight.data');
    float: left;
    margin-top: 15%;
}
</style>