<script setup>
import { ref, onMounted, getCurrentInstance, reactive } from 'vue'


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

const search = () => {
  let param = new URLSearchParams();
  param.append("unique", useteacherStore().teacherMsg.tunique);
  param.append("searchData", searchValue.value);
  proxy.$http.post('/api/searchTopic', param).then(res => {
    if (res.data.length === 0) {
      ElMessage.error(  {
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

const reloadTopic =()=>{
    location.reload()
}

const handleOpen = (row, event, column) => {
  usetopicId().topicId = row.id
  location.href = '/teacherPaper'
}

</script>
<template>
    <div class="head">
        <div class="searchDiv">
            <el-input class="searchInput" v-model="searchValue" placeholder="请输入课题名称" clearable @clear="reloadTopic" />
            <el-button type="primary" @click="search"><img src="../assets/search.svg" width="20" alt="">搜索</el-button>
            <el-button type="primary" class="addTopic" @click="addTopic"><img src="../assets/add.svg" width="20" alt="">新建课题</el-button>
        </div>
        <div class="TOPtable">
            <el-table :data="topicList" style="width:100%;margin-top: 10px;margin-left: 5px;" height="500" border
            @row-dblclick="handleOpen"
            highlight-current-row
            stripe>
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
        </div>
    </div>
</template>
<style>
.head {
    width: 88%;
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

.addTopic{
    margin-left: 25%;
}
</style>