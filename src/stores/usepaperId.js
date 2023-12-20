import { defineStore } from 'pinia'

//用户类型
let usepaperId;
export default usepaperId = defineStore('paperId', {
    state:()=>{
        return {
            paperId: 0
        }
    },
    getters: {},
    actions: {},
    persist : false
})
