import { defineStore } from 'pinia'

let usestudentStore;
export default  usestudentStore = defineStore('student', {
    state : ()=>{
        return {
            studentMsg:{}
        }
    },
    getters: {},
    actions: {},
    persist : true
})