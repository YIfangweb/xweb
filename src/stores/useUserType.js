import { defineStore } from 'pinia'

//用户类型
let useUserTypeStore;
export default useUserTypeStore = defineStore('userType', {
    state:()=>{
        return {
            userType:''
        }
    },
    getters: {},
    actions: {},
    persist : true
})
