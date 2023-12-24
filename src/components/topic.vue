<script setup>
import {getCurrentInstance, onMounted,reactive,ref} from "vue";
import usetopicId from "../stores/usetopicId.js";

const currentInstance = getCurrentInstance();
const { $http } = currentInstance.appContext.config.globalProperties;
const { proxy } = currentInstance;

const topMsg = reactive({
    id: '',
    title: '',
    author: '',
    description: '',
    list: ''
})

onMounted(()=>{
  //清楚数据
    topMsg.id = ''
    topMsg.title = ''
    topMsg.author = ''
    topMsg.description = ''
    topMsg.list = ''
    let pram = new URLSearchParams();
    pram.append("topid",usetopicId().topicId);
    proxy.$http.post("/api/gettopid", pram).then((res) => {
      //让数据绑定到paperMsg上
      topMsg.id = res.data.topid;
      topMsg.title = res.data.toptitle;
      topMsg.author = res.data.topauthor;
      topMsg.description = res.data.topdescript;
      topMsg.list = res.data.toplist;
    })
})


const ctrls = () => {
  //将paperMsg数据传给后端
    let pram = new URLSearchParams();
    pram.append("topid",topMsg.id);
    pram.append("title",topMsg.title);
    pram.append("description",topMsg.description);
    proxy.$http.post("/api/updateTopic", pram).then((res) => {
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
  <el-form :model="topMsg" label-width="80px" class="demo-ruleForm">
    <el-form-item label="课题编号" >
      <el-input v-model="topMsg.id" disabled></el-input>
    </el-form-item>
    <el-form-item label="课题题目">
      <el-input v-model="topMsg.title"></el-input>
    </el-form-item>
    <el-form-item label="发布老师" >
      <el-input v-model="topMsg.author" disabled></el-input>
    </el-form-item>
    <el-form-item label="课题内容">
      <el-input v-model="topMsg.description" type="textarea" :autosize="{ minRows: 10, maxRows: 50}" placeholder="请输入课题内容"></el-input>
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