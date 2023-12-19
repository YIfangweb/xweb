<script setup>
import usestudentStore from "../stores/usestudentStore.js";
import {getCurrentInstance, onMounted, reactive} from "vue";
import router from "../router/index.js";

//studentInfo的数据使用usestudentStore中的studentMsg
const studentMsg = reactive({
  sname:'',
  spassword:'',
  sclassname:'',
  sid:'',
  sunique:''
})

onMounted(()=>{
  studentMsg.sname = usestudentStore().studentMsg.sname
  studentMsg.spassword = usestudentStore().studentMsg.spassword
  studentMsg.sclassname = usestudentStore().studentMsg.sclassname
  studentMsg.sid = usestudentStore().studentMsg.sid
  studentMsg.sunique = usestudentStore().studentMsg.sunique
})

const currentInstance = getCurrentInstance();
const { $http } = currentInstance.appContext.config.globalProperties;
const { proxy } = currentInstance;

/**
 * updateUser函数，先弹出确认框，用户点击确认后将sid,sname,spassword传给后端，后端返回1为修改成功，返回0修改失败，弹出信息提示用户并关闭弹出框
 * 用户点击取消关闭弹出框 并弹出显示取消修改
 */
const updateUser = () =>{
  ElMessageBox.confirm('确认修改密码吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    let pram = new URLSearchParams();
    pram.append("sid", studentMsg.sid);
    pram.append("spassword", studentMsg.spassword);
    proxy.$http.post("/api/updateStudent", pram).then((res) => {
      console.log(res.data)
      if (res.data === 1) {
        ElMessage({
          message: '修改成功！请重新登录',
          type: 'success',
        })
        const store = usestudentStore();
        store.$reset();
        store.studentMsg = studentMsg
        router.push('/login')
      } else {
        ElMessage.error('修改失败');
      }
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消修改'
    });
  });
}
</script>
<template>
    <div class="studentInfo">
        <el-form :model="studentMsg" label-width="100" class="fromStyle">
            <el-form-item label="姓名">
                <el-input v-model="studentMsg.sname" disabled></el-input>
            </el-form-item>
            <el-form-item label="学号">
                <el-input v-model="studentMsg.sid" disabled></el-input>
            </el-form-item>
            <el-form-item label="班级">
                <el-input v-model="studentMsg.sclassname" disabled></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="studentMsg.spassword" show-password></el-input>
            </el-form-item>
            <el-form-item label="唯一识别码">
              <el-input v-model="studentMsg.sunique" disabled></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateUser()">修改密码</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<style>
  .studentInfo{
    margin-left: 12%;
    width: 88%;
    background-color: #ffffff;
  }
  .fromStyle{
    padding-top: 15%;
    width: 50%;
  }
</style>