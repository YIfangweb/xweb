import { defineStore } from 'pinia'

//用户类型
let usetopicId;
export default usetopicId = defineStore('usetopicId', {
    state:()=>{
        return {
            topicId: 0
        }
    },
    getters: {},
    actions: {},
    persist : false
})
