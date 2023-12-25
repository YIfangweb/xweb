<script setup>
import {getCurrentInstance, onMounted,reactive,ref} from "vue";
import usepaperId from "../stores/usepaperId.js";

const currentInstance = getCurrentInstance();
const { $http } = currentInstance.appContext.config.globalProperties;
const { proxy } = currentInstance;

const paperMsg = reactive({
  pid: '',
  ptitle: '',
  pteacher: '',
  pauthor: '',
  pgrade: '',
  pstatus: '',
  pdata: ''
})

onMounted(()=>{
  //清楚数据
    paperMsg.pid = ''
    paperMsg.ptitle = ''
    paperMsg.pteacher = ''
    paperMsg.pauthor = ''
    paperMsg.pgrade =''
    paperMsg.pstatus = ''
    paperMsg.pdata = ''
    let pram = new URLSearchParams();
    pram.append("pid",usepaperId().paperId);
    proxy.$http.post("/api/getPaper", pram).then((res) => {
      //让数据绑定到paperMsg上
      paperMsg.pid = res.data.pid;
      paperMsg.ptitle = res.data.ptitle;
      paperMsg.pteacher = res.data.pteacher;
      paperMsg.pauthor = res.data.pauthor;
      paperMsg.pgrade = res.data.pgrade
      paperMsg.pstatus = res.data.pstatus;
      paperMsg.pdata = res.data.pdata;
    })
})


const ctrls = () => {
  //将paperMsg数据传给后端
    let pram = new URLSearchParams();
    pram.append("pid",paperMsg.pid);
    pram.append("ptitle",paperMsg.ptitle);
    pram.append("pdata",paperMsg.pdata);
    proxy.$http.post("/api/updatePaper", pram).then((res) => {
      if(res.data === 1){
        ElMessage({
          message: '修改成功！',
          type:'success',
        })
      }else{
        ElMessage.error('修改失败');
      }
    })
}

</script>

<template>
  <el-form :model="paperMsg" label-width="80px" class="demo-ruleForm">
    <el-form-item label="论文编号" >
      <el-input v-model="paperMsg.pid" disabled></el-input>
    </el-form-item>
    <el-form-item label="论文题目">
      <el-input v-model="paperMsg.ptitle"></el-input>
    </el-form-item>
    <el-form-item label="指导老师" >
      <el-input v-model="paperMsg.pteacher" disabled></el-input>
    </el-form-item>
    <el-form-item label="作者" >
      <el-input v-model="paperMsg.pauthor" disabled></el-input>
    </el-form-item>
    <el-form-item label="分数" >
      <el-input v-model="paperMsg.pgrade" disabled></el-input>
    </el-form-item>
    <el-form-item label="论文内容">
      <el-input v-model="paperMsg.pdata" type="textarea" :autosize="{ minRows: 10, maxRows: 50}" placeholder="请输入论文内容"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="ctrls" type="primary">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<style>
.demo-ruleForm {
  margin: 0 auto;
  width: 80%;
  margin-top: 20px;
}
</style>