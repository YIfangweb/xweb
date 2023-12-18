<script setup>
import { ref } from 'vue'

const searchValue = ref('')
const search = () => {
    console.log(searchValue.value)
}
//给写论文按钮绑定事件
const addPaper = () => {
    console.log('写论文')
}
//给交论文按钮绑定事件
const upPaper = () => {
    console.log('交论文')
}
//论文列表数据
const paperList = ref([
    {
        id: '1314520',
        title: '关于大数据的研究1',
        author: '高兴文',
        teacher: '罗玲',
        grade: '88',
        status: '已批改'
    },
  {
    id: '1314521',
    title: '关于大数据的研究2',
    author: '高兴文',
    teacher: '罗玲',
    grade: '88',
    status: '已批改'
  }
  ,{
    id: '1314522',
    title: '关于大数据的研究3',
    author: '高兴文',
    teacher: '罗玲',
    grade: '88',
    status: '已批改'
  }
])

const currentRow = ref()
const singleTableRef = ref()
//获取当前行
const getCurrent = (row) => {
  singleTableRef.value.setCurrentRow(row)
}
const handleCurrentChange = (val) => {
  currentRow.value = val
}

//打开按钮
const handleOpen = () => {
  console.log(currentRow)
}
//编辑按钮
const handleEdit = () => {
  console.log(currentRow)
}
//删除按钮
const handleDelete = () => {
  console.log(currentRow)
}


</script>
<template>
  <div class="headerDiv">
      <div class="searchDiv">
            <el-input
                class="searchInput"
                v-model="searchValue"
                placeholder="请输入论文题目"
                clearable
            />
            <el-button type="primary" @click="search"><img src="../assets/search.svg" width="20" alt="">搜索</el-button>
            <el-button type="primary" class="addPaper" @click="addPaper"><img src="../assets/add.svg" width="20" alt="">写论文</el-button>
            <el-button type="primary" @click="upPaper"><img src="../assets/add.svg" width="20" alt="">交论文</el-button>
      </div>
      <div class="paperList">
          <el-table
              :data="paperList"
              ref="singleTableRef"
              @current-change="handleCurrentChange"
              highlight-current-row
              style="width: calc(100% - 10px);"
              height="500"
              border
              stripe
              class="paperListTable">
            <el-table-column
                prop="id"
                label="论文编号"
                width="90">
            </el-table-column>
              <el-table-column
                  prop="title"
                  label="论文题目"
                  width="300">
              </el-table-column>
              <el-table-column
                  prop="author"
                  label="作者"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="teacher"
                  label="指导老师"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="grade"
                  label="成绩"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="status"
                  label="状态"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="action"
                  label="操作"
                  fixed="right"
                  width="250">
                <el-button type="primary"  @click="handleOpen()">打开</el-button>
                <el-button type="primary"  @click="handleEdit()">编辑</el-button>
                <el-button type="danger"  @click="handleDelete()">删除</el-button>
              </el-table-column>
          </el-table>
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
.addPaper{
    margin-left: 25%;
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
</style>
