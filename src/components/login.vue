<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import router from '../router';
import  usestudentStore  from "../stores/usestudentStore"
import  useteacherStore from "../stores/useteacherStore"

// axios全局调用配置
const currentInstance = getCurrentInstance();
const { $http } = currentInstance.appContext.config.globalProperties;
const { proxy } = currentInstance;

//学生默认数据
const slogindata = ref(null);

const user = reactive({
    uname: '',
    upassword: ''
})

//老师默认数据
const tlogindata = ref(null);

const tuser = reactive({
  tuname: '',
  tupassword: ''
})

/**
 * 学生登录方法 登录时判断用户是否登录
 * 登录->前往用户信息 未登录->前往登录
 */
const onslogin = async () => {
    // 使用URLSearchParams()进行post请求传参
    let spram = new URLSearchParams();
    spram.append("sid", user.uname);
    spram.append("spassword", user.upassword);
    proxy.$http.post("/api/slogin", spram).then((res) => {
        if (res.data !== "") {
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
 * 教师登录方法 登录时判断用户是否登录
 * 登录->前往用户信息 未登录->前往登录
 */
const ontlogin = async () => {
  // 使用URLSearchParams()进行post请求传参
  let tpram = new URLSearchParams();
  tpram.append("tid", tuser.tuname);
  tpram.append("tpassword", tuser.tupassword);
  proxy.$http.post("/api/tlogin", tpram).then((res) => {
    if (res.data !== "") {
      ElMessage({
        message: '登录成功！',
        type: 'success',
      })
      const store = useteacherStore();
      store.teacherMsg = res.data
      router.push('/')
    } else {
      ElMessage.error('账号或密码错误');
      tuser.tupassword= '';
    }
  })
}
const YZmsg = ref('点击进行验证')

/**
 * 验证是否是人机
 */
const onyanzheng=()=>{
  YZmsg.value = '验证通过√'
}


const changeMsg = ref('您是老师？点我登录')
const changeNum = ref(0)
const tCss = reactive({left : "calc(50% - 2px)"})
const imgUrl = reactive({Purl:'./src/assets/s.png'})

/**
 * 切换登录
 */
const onchangeMsg=()=>{
  if(changeNum.value === 0){
    changeMsg.value = '您是学生？点我登录'
    changeNum.value = 1
    tCss.left = "0"
    imgUrl.Purl = './src/assets/t.png'
    return;
  }
  if(changeNum.value === 1){
    changeMsg.value = '您是老师？点我登录'
    changeNum.value = 0
    tCss.left = "calc(50% - 2px)"
    imgUrl.Purl = './src/assets/s.png'
  }
}

</script>

<template>
    <div class="bodybox">
        <div class="sloginbox">
            <img src="../assets/logo.png" class="loginlogo">
            <p class="wc">欢迎回来</p>
            <el-form :model="user" ref="slogindata">
                <el-form-item prop="uname">
                    <el-input v-model="user.uname" placeholder="请输入您的学号" clearable class="un" />
                </el-form-item>
                <el-form-item prop="upassword">
                    <el-input v-model="user.upassword" placeholder="请输入您的密码" show-password class="up" />
                </el-form-item>
                <el-form-item>
                    <el-button class="yanzheng" plain @click="onyanzheng()">{{ YZmsg }}</el-button>
                </el-form-item>
              <el-form-item>
                <el-button class="sub" type="primary" @click="onslogin()">登录</el-button>
              </el-form-item>
            </el-form>
        </div>
        <div class="tloginbox">
          <img src="../assets/logo.png" class="loginlogo">
          <p class="wc">欢迎回来</p>
          <el-form :model="tuser" ref="tlogindata">
            <el-form-item prop="tuname">
              <el-input v-model="tuser.tuname" placeholder="请输入您的工号" clearable class="un" />
            </el-form-item>
            <el-form-item prop="tupassword">
              <el-input v-model="tuser.tupassword" placeholder="请输入您的密码" show-password class="up" />
            </el-form-item>
            <el-form-item>
              <el-button class="yanzheng" plain @click="onyanzheng()">{{ YZmsg }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button class="sub" type="primary" @click="ontlogin()">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="titlebox">
            <img v-bind:src="imgUrl.Purl" class="Login-img">
            <el-button @click="onchangeMsg()" class="changeBtn">{{ changeMsg }}</el-button>
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

.sloginbox {
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

.tloginbox {
    width: 50%;
    height: 450px;
    background-color: #ffffff;
    margin-left: 50%;
    text-align: center;
    border: 1px solid rgb(197, 197, 197);
    border-radius: 15px;
}
.titlebox{
  width: calc(50% + 4px);
  height: 500px;
  background: #dcf9fc url('../assets/Login-Background.svg') no-repeat left bottom;
  position: relative;
  top: calc(-100% - 25px);
  left: v-bind('tCss.left');
  border-radius: 15px;
  transition: all 0.25s linear 0s;
  text-align: center;
}
.yanzheng{
  width: 60%;
  height: 35px;
  margin-top: 5%;
  margin-left: 20%;
}
.Login-img{
  width: 100%;
}
.changeBtn{

}
</style>