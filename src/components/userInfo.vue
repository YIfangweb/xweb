
<script setup>
import usestudentStore from "../stores/usestudentStore.js";
import useteacherStore from "../stores/useteacherStore.js";
import useUserType from "../stores/useUserType.js";
import router from "../router/index.js";
import { reactive, ref} from "vue";
import studentTopic from "./studentTopic.vue";
import studentPaper from "./studentPaper.vue";
import studentInfo from "./studentInfo.vue";
import teacherPaper from "./teacherPaper.vue";
import teacherTopic from "./teacherTopic.vue";
import teacherClass from "./teacherClass.vue";
import teacherInfo from "./teacherInfo.vue";


/**
 * 退出登录  清除pinia存储的用户信息
 */
const loginOut = () =>{
  //让用户确定是否退出登录
  ElMessageBox.confirm('确认退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage({
      message: '退出成功！',
      type: 'success',
    })
    usestudentStore().$reset()
    useteacherStore().$reset()
    useUserType().$reset()
    router.push('/')
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消退出'
    })
  })
}

const getUsertype = useUserType().userType

const menuindex = ref(1)

//定义svg路径
const paper = reactive({value:'./src/assets/paperh.svg'})
const topic = reactive({value:'./src/assets/manual.svg'})
const uinfo = reactive({value:'./src/assets/user.svg'})
const myclass = reactive({value:'./src/assets/class.svg'})
const out = reactive({value:'./src/assets/out.svg'})
/**
 * 菜单栏切换
 * @param {*} index
 */
const handleSelect = (index) => {
  menuindex.value = index
  changeSrc(index)
}

/**
 * 定义组件数组 comList[]
 */

const ScomList = {
  1 : studentPaper,
  2 : studentTopic,
  3 : studentInfo
}

const TcomList = {
  1 : teacherPaper,
  2 : teacherTopic,
  4 : teacherClass,
  3 : teacherInfo
}

const menuHeight = reactive({data : "0px"})

/**
 * 获取浏览器视口高度，设置菜单栏高度
 */
menuHeight.data = document.documentElement.clientHeight * 0.7 + "px"

const changeSrc = (index)=>{
  //根据index改变svg路径
  if(index === '1'){
    paper.value = './src/assets/paperh.svg'
    topic.value = './src/assets/manual.svg'
    uinfo.value = './src/assets/user.svg'
    myclass.value = './src/assets/class.svg'
    out.value = './src/assets/out.svg'
  }
  if(index === '2'){
    paper.value = './src/assets/paper.svg'
    topic.value = './src/assets/manualh.svg'
    uinfo.value = './src/assets/user.svg'
    myclass.value = './src/assets/class.svg'
    out.value = './src/assets/out.svg'
  }
  if(index === '3'){
    paper.value = './src/assets/paper.svg'
    topic.value = './src/assets/manual.svg'
    uinfo.value = './src/assets/userh.svg'
    myclass.value = './src/assets/class.svg'
    out.value = './src/assets/out.svg'
  }
  if(index === '4'){
    paper.value = './src/assets/paper.svg'
    topic.value = './src/assets/manual.svg'
    uinfo.value = './src/assets/user.svg'
    myclass.value = './src/assets/classh.svg'
    out.value = './src/assets/out.svg'
  }
  if(index === '5'){
    paper.value = './src/assets/paper.svg'
    topic.value = './src/assets/manual.svg'
    uinfo.value = './src/assets/user.svg'
    myclass.value = './src/assets/class.svg'
    out.value = './src/assets/outh.svg'
  }
}

</script>

<template>
  <div class="Studentmenu" v-if="getUsertype ==='学生'">
    <div class="welcome">
      <img src="../assets//logo.png" class="logoPng" alt="">
      <h1 class="welcomeText">Hello</h1>
      <h2 class="userName">{{usestudentStore().studentMsg.sname}}</h2>
    </div>
    <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
      <el-menu-item index="1"><img :src="paper.value" width="20" alt="" class="myimg">我的论文</el-menu-item>
      <el-menu-item index="2"><img :src="topic.value" width="20" alt="" class="myimg">我的课题</el-menu-item>
      <el-menu-item index="3"><img :src="uinfo.value" width="20" alt="" class="myimg">我的信息</el-menu-item>
      <el-menu-item index="4" v-on:click="loginOut()"><img :src="out.value" width="20" alt="" class="myimg">退出登录</el-menu-item>
    </el-menu>
  </div>
  <div class="Teachermenu" v-if="getUsertype ==='教师'">
    <div class="welcome">
      <img src="../assets//logo.png" class="logoPng" alt="">
      <h1 class="welcomeText">Hello</h1>
      <h2 class="userName">{{useteacherStore().teacherMsg.tname}}</h2>
    </div>
    <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
      <el-menu-item index="1"><img :src="paper.value" width="20" alt="" class="myimg">我的论文</el-menu-item>
      <el-menu-item index="2"><img :src="topic.value" width="20" alt="" class="myimg">我的课题</el-menu-item>
      <el-menu-item index="3"><img :src="uinfo.value" width="20" alt="" class="myimg">我的信息</el-menu-item>
      <el-menu-item index="4"><img :src="myclass.value" width="20" alt="" class="myimg">我的班级</el-menu-item>
      <el-menu-item index="5" v-on:click="loginOut()"><img :src="out.value" width="20" alt="" class="myimg">退出登录</el-menu-item>
    </el-menu>
  </div>
  <div class="bodys" v-if="getUsertype ==='学生'">
    <keep-alive>
      <component :is="ScomList[menuindex]"></component>
    </keep-alive>
  </div>
  <div class="bodys" v-if="getUsertype ==='教师'">
    <keep-alive>
      <component :is="TcomList[menuindex]"></component>
    </keep-alive>
  </div>
</template>

<style scoped>
.Teachermenu,.Studentmenu{
    width: 12%;
    height: v-bind('menuHeight.data');
    float: left;
}

.el-menu-vertical-demo{
    height: 100%;
    width: 100%;
    text-align: center;
    line-height: v-bind('menuHeight.data');
    padding-top: 40%;
}
.welcomeText,.userName{
    text-align: center;
    margin-top: 10%;
    font-family: 'myFont',serif;
}
.logoPng{
    margin-left: 10%;
    margin-top: 20%;
    width: 80%;
    height: 20%;
}
.myimg{
  margin-left: 10%;
  margin-right: 10%;
}
</style>