<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";


const topicList = reactive([
    {
        id:'',
        title: '',
        author: '',
        description: ''
    }
])
const currentInstance = getCurrentInstance();
const { $http } = currentInstance.appContext.config.globalProperties;
const { proxy } = currentInstance;

const topicMsg = reactive({
    id: '',
    title: '',
    author: '',
    description: ''
})

const dialogVisible = ref(false)

const handleOpen = (row) => {
    handleClick(row)
}

onMounted(() => {
    getTopicList()
})
const handleClick = (row) => {
    dialogVisible.value = true
    topicMsg.id = row.id
    topicMsg.title = row.title
    topicMsg.author = row.author
    topicMsg.description = row.description
}

const getTopicList = () => {
    proxy.$http.get("/api/getTopicList").then((res) => {
        topicList.splice(0, topicList.length)
        for (let i = 0; i < res.data.length; i++) {
            topicList.push({
                id: res.data[i].topid,
                title: res.data[i].toptitle,
                author: res.data[i].topauthor,
                description: res.data[i].topdescript
            })
        }
    })
}

</script>
<template>
    <div class="head">
        <h3 style="padding-top: 2%;">热门课题</h3>
        <el-table :data="topicList" style="width:70%;margin-top: 10px;" height="500" border @row-dblclick="handleOpen"
            highlight-current-row stripe>
            <el-table-column prop="id" label="课题编号" width="150">
            </el-table-column>
            <el-table-column prop="title" label="课题名称" width="300">
            </el-table-column>
            <el-table-column prop="author" label="发布者" width="180">
            </el-table-column>
            <el-table-column prop="description" label="课题描述" width="400">
            </el-table-column>
            <el-table-column label="操作" width="100" fixed="right" #default="scope">
                <el-button type="primary" @click="handleClick(scope.row)">查看</el-button>
            </el-table-column>
        </el-table>
    </div>
    <el-drawer title="课题详情" v-model="dialogVisible" size="50%">
        <el-form :model="topicMsg" label-width="80px" class="demo-ruleForm">
            <el-form-item label="课题编号">
                <el-input v-model="topicMsg.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="课题名称">
                <el-input v-model="topicMsg.title"></el-input>
            </el-form-item>
            <el-form-item label="发布者">
                <el-input v-model="topicMsg.author" disabled></el-input>
            </el-form-item>
            <el-form-item label="课题描述">
                <el-input v-model="topicMsg.description" type="textarea" :autosize="{ minRows: 10, maxRows: 50 }"
                    placeholder="请输入课题描述"></el-input>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<style>
.head {
    width: 88%;
    margin-left: 12%;
}
</style>