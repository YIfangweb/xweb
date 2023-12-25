<script setup>
import { onMounted, reactive, ref, getCurrentInstance, watch } from 'vue';
import useteacherStore from '../stores/useteacherStore';

const currentInstance = getCurrentInstance();
const { $http } = currentInstance.appContext.config.globalProperties;
const { proxy } = currentInstance;

const selectClass = ref('')

const options = reactive([
    {
        value: '',
        lable: ''
    }
])

onMounted(() => {
    //获取班级列表
    getClasses()
})

const getClasses = () => {
    let pram = new URLSearchParams()
    pram.append('unique', useteacherStore().teacherMsg.tunique)
    proxy.$http.post('/api/getClasses', pram).then(res => {
        for (let i = 0; i < res.data.length; i++) {
            options.push({
                value: res.data[i].classname,
                label: res.data[i].classname
            })
        }
        //删除options中的第一个空数据
        options.shift()
    })
}

const studentList = reactive([{
    id: '',
    name: '',
    classname: '',
    sunique: ''
}])

const pList = reactive([{
    id: '',
    name: '',
    author: '',
    data:''
}])


const dialogVisible = ref(false)

const studentMsg = reactive({
    name: '',
    classname: '',
    id: '',
    sunique: ''
})

const handleOpen = (row) => {
    handleClick(row)
}

const handleClick = (row) => {
    dialogVisible.value = true
    studentMsg.id = row.id
    studentMsg.name = row.name
    studentMsg.classname = row.classname
    studentMsg.sunique = row.sunique
}

const updateStudent = () => {
    let pram = new URLSearchParams()
    pram.append('id', studentMsg.id)
    pram.append('name', studentMsg.name)
    pram.append('classname', studentMsg.classname)
    pram.append('sunique', studentMsg.sunique)
    proxy.$http.post('/api/updateStudentbyT', pram).then(res => {
        if (res.data === 1) {
            ElMessage({
                message: '修改成功！',
                type: 'success',
            })
            studentMsg.id = ''
            studentMsg.name = ''
            studentMsg.classname = ''
            studentMsg.sunique = ''
            dialogVisible.value = false
            location.reload()
        } else {
            ElMessage.error('修改失败');
        }
    })
}

watch(selectClass, () => {
    getPaperList(selectClass.value)
    if (selectClass.value !== '') {
        let pram = new URLSearchParams()
        pram.append('classname', selectClass.value)
        proxy.$http.post('/api/getStudentbyC', pram).then(res => {
            studentList.splice(0, studentList.length)
            for (let i = 0; i < res.data.length; i++) {
                studentList.push({
                    id: res.data[i].sid,
                    name: res.data[i].sname,
                    classname: res.data[i].sclassname,
                    sunique: res.data[i].sunique
                })
            }
        })
    }
})
const pdialogVisible = ref(false)

const pMsg = reactive({
    id: '',
    name: '',
    author: '',
    data:'',
    grade: ''
})

const phandleOpen = (row) => {
    phandleClick(row)
}

const phandleClick = (row) => {
    pdialogVisible.value = true
    pMsg.id = row.id
    pMsg.name = row.name
    pMsg.author = row.author
    pMsg.data = row.data
    pMsg.grade = row.grade
}

const  updatePaper = () => {
    let pram = new URLSearchParams()
    pram.append('id', pMsg.id)
    pram.append('grade', pMsg.grade)
    pram.append('unique', useteacherStore().teacherMsg.tunique)
    proxy.$http.post('/api/updatePaperbyT', pram).then(res =>{
        if (res.data === 1) {
            ElMessage({
                message: '保存成功！',
                type:'success',
            })
            pMsg.id = ''
            pMsg.name = ''
            pMsg.author = ''
            pMsg.data = ''
            pMsg.grade = ''
            pdialogVisible.value = false
            location.reload()
        }
    })
}

const getPaperList = (value) => {
    let pram = new URLSearchParams()
    pram.append('classname', value)
    proxy.$http.post('/api/getPaperbyT', pram).then(res => {
        pList.splice(0, pList.length)
        for (let i = 0; i < res.data.length; i++) {
            pList.push({
                id: res.data[i].pid,
                name: res.data[i].ptitle,
                author: res.data[i].pauthor,
                data: res.data[i].pdata,
                grade: res.data[i].pgrade
            })
        }
    })
}
</script>

<template>
    <div class="selectClass">
        <h2 style="padding-top: 2%;">我的班级</h2>
        <el-select v-model="selectClass" placeholder="请选择班级" style="padding-top: 2%">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-table :data="studentList" ref="singleTableRef" @row-dblclick="handleOpen" highlight-current-row
            style="width: 75%;padding-top: 2%;" border stripe>
            <el-table-column prop="id" label="学生编号" width="200">
            </el-table-column>
            <el-table-column prop="name" label="学生姓名" width="200">
            </el-table-column>
            <el-table-column prop="classname" label="学生班级" width="200">
            </el-table-column>
            <el-table-column prop="sunique" label="学生信息" width="200">
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right" #default="scope">
                <el-button type="primary" @click="handleClick(scope.row)">编辑</el-button>
            </el-table-column>
        </el-table>
        <h2 style="padding-top: 2%;">指导论文</h2>
        <el-table :data="pList" ref="singleTableRef" @row-dblclick="phandleOpen" highlight-current-row
            style="width: 75%;padding-top: 2%;" border stripe>
            <el-table-column prop="id" label="论文编号" width="200">
            </el-table-column>
            <el-table-column prop="name" label="论文题目" width="200">
            </el-table-column>
            <el-table-column prop="author" label="论文作者" width="200">
            </el-table-column>
            <el-table-column prop="grade" label="分数" width="200">
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right" #default="scope">
                <el-button type="primary" @click="phandleClick(scope.row)">指导</el-button>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="dialogVisible" title="学生信息" width="30%" top="10%" center>
        <el-form :model="studentMsg">
            <el-form-item label="学生姓名">
                <el-input v-model="studentMsg.name"></el-input>
            </el-form-item>
            <el-form-item label="学生班级">
                <el-input v-model="studentMsg.classname"></el-input>
            </el-form-item>
            <el-form-item label="学生编号">
                <el-input v-model="studentMsg.id"></el-input>
            </el-form-item>
            <el-form-item label="学生信息">
                <el-input v-model="studentMsg.sunique"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateStudent">修改</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-drawer v-model="pdialogVisible" title="指导论文" width="50%" center>
        <el-form :model="pMsg">
            <el-form-item label="论文编号">
                <el-input v-model="pMsg.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="论文题目">
                <el-input v-model="pMsg.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="论文作者">
                <el-input v-model="pMsg.author" disabled></el-input>
            </el-form-item>
            <el-form-item label="论文正文">
                <el-input v-model="pMsg.data" disabled></el-input>
            </el-form-item>
            <el-form-item label="分数">
                <el-input v-model="pMsg.grade"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updatePaper">保存</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>


<style>
.selectClass {
    width: 88%;
    margin-left: 14%;
}
</style>