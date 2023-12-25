<script setup>
import { ref, onMounted, getCurrentInstance, reactive } from 'vue'
import useteacherStore from "../stores/useteacherStore.js";
import usetopicId from "../stores/usetopicId.js";
import topic from "./topic.vue";
import nothing from "./nothing.vue";

const currentInstance = getCurrentInstance();
const { $http } = currentInstance.appContext.config.globalProperties;
const { proxy } = currentInstance;


const searchValue = ref('')

const topicList = reactive([
  {
    id: '',
    title: '',
    author: '',
    description: '',
    list: ''
  }
])

const topicMsg = reactive({
  title: '',
  descript: ''
})

const search = () => {
  let param = new URLSearchParams();
  param.append("searchData", searchValue.value);
  proxy.$http.post('/api/searchTopic', param).then(res => {
    if (res.data.length === 0) {
      ElMessage.error({
        message: '没有找到相关课题',
        showClose: true
      })
      return
    } else {
      //清空topicList
      topicList.splice(0, topicList.length)
      //topicList放入请求数据
      for (let i = 0; i < res.data.length; i++) {
        topicList.push({
          id: res.data[i].topid,
          title: res.data[i].toptitle,
          author: res.data[i].topauthor,
          description: res.data[i].topdescript,
          list: res.data[i].toplist
        })
      }
    }
  })
}

const reloadTopic = () => {
  location.reload()
}



onMounted(() => {
  let param = new URLSearchParams();
  param.append("unique", useteacherStore().teacherMsg.tunique);
  proxy.$http.post('/api/getTopic', param).then(res => {
    for (let i = 0; i < res.data.length; i++) {
      topicList.push({
        id: res.data[i].topid,
        title: res.data[i].toptitle,
        author: res.data[i].topauthor,
        description: res.data[i].topdescript,
        list: res.data[i].toplist
      })
    }
    topicList.shift();
  })
})

const addTopicDrawer = ref(false)

const addTopic = () => {
  addTopicDrawer.value = true
}
const addTopicSub = () => {
  let param = new URLSearchParams();
  param.append("unique", useteacherStore().teacherMsg.tunique);
  param.append("title", topicMsg.title);
  param.append("description", topicMsg.descript);
  proxy.$http.post('/api/addTopic', param).then(res => {
    if (res.data == 1) {
      ElMessage.success({
        message: '新建课题成功',
        showClose: true
      })
      addTopicDrawer.value = false
      reloadTopic()
    } else {
      ElMessage.error({
        message: '新建课题失败',
        showClose: true
      })
    }
  })
}

const openPaper = ref(false)
const currentComponent = {
  1: topic,
  2: nothing
}
const currentComponentName = ref(0)
//打开按钮
const handleOpen = (row, event, column) => {
  usetopicId().topicId = row.id
  openPaper.value = true
  currentComponentName.value = 1
}
const TopicClose = () => {
  usetopicId().$reset()
  currentComponentName.value = 0
  openPaper.value = false
  reloadTopic()
}

const handleClick = (row) => {
  if (confirm('确定要删除该课题吗？')) {
    let param = new URLSearchParams();
    param.append("unique", useteacherStore().teacherMsg.tunique);
    param.append("topid", row.id);
    proxy.$http.post('/api/deleteTopic', param).then(res => {
      if (res.data == 1) {
          ElMessage.success({
            message: '删除成功',
            showClose: true
          })
          reloadTopic()
        } else {
          ElMessage.error({
            message: '删除失败',
            showClose: true
          })
        }   
    })
  }
}

</script>
<template>
  <div class="head">
    <div class="searchDiv">
      <el-input class="searchInput" v-model="searchValue" placeholder="请输入课题名称" clearable @clear="reloadTopic" />
      <el-button type="primary" @click="search"><img src="../assets/search.svg" width="20" alt="">搜索</el-button>
      <el-button type="primary" class="addTopic" @click="addTopic"><img src="../assets/add.svg" width="20"
          alt="">新建课题</el-button>
    </div>
    <div class="TOPtable">
      <el-table :data="topicList" style="width:100%;margin-top: 10px;margin-left: 5px;" height="500" border
        @row-dblclick="handleOpen" highlight-current-row stripe>
        <el-table-column prop="id" label="课题编号" width="150">
        </el-table-column>
        <el-table-column prop="title" label="课题名称" width="300">
        </el-table-column>
        <el-table-column prop="author" label="发布者" width="180">
        </el-table-column>
        <el-table-column prop="description" label="课题描述" width="400">
        </el-table-column>
        <el-table-column label="操作" width="100" fixed="right" #default="scope">
          <el-button type="primary" @click="handleClick(scope.row)">删除</el-button>
        </el-table-column>
      </el-table>
      <el-drawer v-model="addTopicDrawer" title="新建课题" size="50%" :with-header="true">
        <el-form :model="topicMsg" label-width="100" class="fromStyles">
          <el-form-item label="课题题目">
            <el-input v-model="topicMsg.title" placeholder="请输入课题题目"></el-input>
          </el-form-item>
          <el-form-item label="课题描述">
            <el-input v-model="topicMsg.descript" type="textarea" :autosize="{ minRows: 20, maxRows: 50 }"
              placeholder="请输入课题描述"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addTopicSub">提交</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
      <el-drawer v-model="openPaper" title="我的课题" size="80%" direction="ltr" :with-header="true"
        :before-close="TopicClose">
        <component :is="currentComponent[currentComponentName]"></component>
      </el-drawer>
    </div>
  </div>
</template>
<style>
.head {
  width: 87%;
  margin-left: 12%;
}

.searchDiv {
  display: flex;
  align-items: center;
  height: 100px;
  margin-left: 5px;
  width: calc(100%-5px);
  background-color: #fff;
  border-radius: 5px;
  border: 0.5px solid #ebebeb;
}

.searchInput {
  width: 340px;
  margin-left: 15%;
}
.fromStyles{
  width: 100%;
}
</style>