<script setup>
import { ref, onMounted, getCurrentInstance, reactive } from 'vue'
import useteacherStore from "../stores/useteacherStore.js";
import paper from '../components/paper.vue'
import usepaperId from "../stores/usepaperId.js";
import nothing from "./nothing.vue";

const currentInstance = getCurrentInstance();
const { $http } = currentInstance.appContext.config.globalProperties;
const { proxy } = currentInstance;

const writePaper = ref(false)

//给写论文按钮绑定事件
const addPaper = () => {
  writePaper.value = true
}
const drawerClose = () => {
  //提示用户是否确认关闭
  ElMessageBox.confirm('确认关闭吗？您的内容将会保存，不会清除', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    writePaper.value = false
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消关闭'
    });
  });
}

//论文信息
const paperMsg = reactive({
  ptitle: '',
  pdata: ''
})

//upPaper函数，先弹出确认框，用户点击确认后将论文信息传给后端，后端返回1为交论文成功，返回0交论文失败，弹出信息提示用户并关闭弹出框
const submitPaper = () => {
  ElMessageBox.confirm('确认提交吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    let pram = new URLSearchParams();
    pram.append("tunique", useteacherStore().teacherMsg.tunique);
    pram.append("ptitle", paperMsg.ptitle);
    pram.append("pdata", paperMsg.pdata);
    proxy.$http.post("/api/submitPaperBt", pram).then((res) => {
      console.log(res.data)
      if (res.data === 1) {
        ElMessage({
          message: '提交成功！',
          type: 'success',
        })
        location.reload()
        writePaper.value = false
      } else {
        ElMessage.error('提交失败');
      }
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消提交'
    });
  });
}

const uploadPaper = ref(false)


const uploaddrawerClose = () => {
  //提示用户是否确认关闭
  ElMessageBox.confirm('确认关闭吗？文件将会保存，不会清除', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    uploadPaper.value = false
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消关闭'
    });
  });
}
//论文列表数据
const paperList = reactive([
  {
    id: '',
    title: '',
    author: ''
  }
])

const searchValue = ref('')
const search = () => {
  let param = new URLSearchParams();
  param.append("unique", useteacherStore().teacherMsg.tunique);
  param.append("searchData", searchValue.value);
  proxy.$http.post('/api/searchPaper', param).then(res => {
    if (res.data.length === 0) {
      ElMessage.error({
        message: '没有找到相关论文',
        showClose: true
        });
      return
    } else {
      //清空paperList
      paperList.splice(0, paperList.length)
      //papaerList放入请求数据
      for (let i = 0; i < res.data.length; i++) {
        paperList.push({
          id: res.data[i].pid,
          title: res.data[i].ptitle,
          author: res.data[i].pauthor
        })
      }
    }
  })
}

//onMounted函数
onMounted(() => {
  //发送post请求获取论文列表数据
  let pram = new URLSearchParams();
  pram.append("tunique", useteacherStore().teacherMsg.tunique);
  proxy.$http.get("/api/getPaperList?unique=" + useteacherStore().teacherMsg.tunique).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      paperList.push({
        id: res.data[i].pid,
        title: res.data[i].ptitle,
        author: res.data[i].pauthor
      })
    }
    //清除第一条数据
    paperList.shift()
  })
})
const reloadPaper = () => {
    location.reload()
}

const currentRow = ref()
const singleTableRef = ref()
//获取当前行
const getCurrent = (row) => {
  singleTableRef.value.setCurrentRow(row)
}

const openPaper = ref(false)
const currentComponent = {
  1: paper,
  2: nothing
}
const currentComponentName = ref(0)
//打开按钮
const handleOpen = (row, event, column) => {
  usepaperId().paperId = row.id
  openPaper.value = true
  currentComponentName.value = 1
}
const paperClose = () => {
  usepaperId().$reset()
  currentComponentName.value = 0
  openPaper.value = false
  location.reload()
}

const handleClick = (row) => {
  ElMessageBox.confirm('确认删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    let pram = new URLSearchParams();
    pram.append("pid", row.id);
    pram.append("unique", useteacherStore().teacherMsg.tunique);
    proxy.$http.post("/api/deletePaperBt", pram).then((res) => {
      if (res.data === 1) {
        ElMessage({
          message: '删除成功！',
          type:'success',
        })
        location.reload()
      } else {
        ElMessage.error('删除失败');
      }
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除'
      });
  });
}

</script>
<template>
  <div class="headerDiv">
    <div class="searchDiv">
      <el-input class="searchInput" v-model="searchValue" placeholder="请输入论文题目" clearable  @clear="reloadPaper" />
      <el-button type="primary" @click="search"><img src="../assets/search.svg" width="20" alt="">搜索</el-button>
      <el-button type="primary" class="addPaper" @click="addPaper"><img src="../assets/add.svg" width="20"
          alt="">写论文</el-button>
    </div>
    <div class="paperList">
      <el-table :data="paperList" ref="singleTableRef" @row-dblclick="handleOpen" highlight-current-row
        style="width: calc(100% - 10px);" height="500" border stripe class="paperListTable">
        <el-table-column prop="id" label="论文编号" width="200">
        </el-table-column>
        <el-table-column prop="title" label="论文题目" width="400">
        </el-table-column>
        <el-table-column prop="author" label="作者" width="300">
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right" #default="scope">
            <el-button type="primary" @click="handleClick(scope.row)">删除</el-button>
        </el-table-column>
      </el-table>
      <el-drawer v-model="writePaper" :before-close="drawerClose" title="写论文" size="50%" :with-header="true">
        <el-form :model="paperMsg" label-width="100" class="fromStyle">
          <el-form-item label="论文题目">
            <el-input v-model="paperMsg.ptitle" placeholder="请输入论文题目"></el-input>
          </el-form-item>
          <el-form-item label="论文内容">
            <el-input v-model="paperMsg.pdata" type="textarea" :autosize="{ minRows: 20, maxRows: 50 }"
              placeholder="请输入论文内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitPaper()">提交</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
      <el-drawer v-model="openPaper" title="我的论文" size="80%" direction="ltr" :with-header="true"
        :before-close="paperClose">
        <component :is="currentComponent[currentComponentName]"></component>
      </el-drawer>
    </div>
  </div>
</template>
<style scoped>
.headerDiv {
  display: inline-block;
  align-items: center;
  background-color: #f5f5f5;
  width: 87%;
}

.searchDiv {
  display: flex;
  align-items: center;
  height: 100px;
  margin-left: 5px;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  border: 0.5px solid #ebebeb;
}

.searchInput {
  width: 340px;
  margin-left: 15%;
}
.paperList {
  margin-left: 5px;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  border: 0.5px solid #ebebeb;
  height: 600px;
}

.paperListTable {
  margin-top: 10px;
  margin-left: 5px;
}

.fromStyle {
  width: 100%;
}

.selectFile {
  width: 170px;
  height: 170px;
  border-radius: 5px;
  border: 2px dashed #ebebeb;
}
</style>
