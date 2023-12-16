import { defineStore } from 'pinia'

let useteacherStore;
export default useteacherStore = defineStore('teacher', {
    state:()=>{
        return {
            teacherMsg:{}
        }
    },
    getters: {},
    actions: {},
    persist : true
})
