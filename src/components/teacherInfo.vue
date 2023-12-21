<script setup>
import useteacherStore from "../stores/useteacherStore.js";
import {getCurrentInstance, onMounted, reactive} from "vue";
import router from "../router/index.js";


const teacherMsg = reactive({
  tname:'',
  tpassword:'',
  tid:'',
  tunique:''
})

onMounted(()=>{
    teacherMsg.tname = useteacherStore().teacherMsg.tname
    teacherMsg.tpassword = useteacherStore().teacherMsg.tpassword
    teacherMsg.tid = useteacherStore().teacherMsg.tid
    teacherMsg.tunique = useteacherStore().teacherMsg.tunique
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
    pram.append("tid", teacherMsg.tid);
    pram.append("tpassword", teacherMsg.tpassword);
    proxy.$http.post("/api/updateteacher", pram).then((res) => {
      console.log(res.data)
      if (res.data === 1) {
        ElMessage({
          message: '修改成功！请重新登录',
          type: 'success',
        })
        const store = useteacherStore();
        store.$reset();
        store.teacherMsg = teacherMsg
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
    <div class="teacherInfo">
        <el-form :model="teacherMsg" label-width="100" class="fromStyle">
            <el-form-item label="姓名">
                <el-input v-model="teacherMsg.tname" disabled></el-input>
            </el-form-item>
            <el-form-item label="工号">
                <el-input v-model="teacherMsg.tid" disabled></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="teacherMsg.tpassword" show-password></el-input>
            </el-form-item>
            <el-form-item label="唯一识别码">
              <el-input v-model="teacherMsg.tunique" disabled></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateUser()">修改密码</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<style>
  .teacherInfo{
    margin-left: 12%;
    width: 88%;
    background-color: #ffffff;
  }
  .fromStyle{
    padding-top: 15%;
    width: 50%;
  }
</style>