import { createRouter,createWebHashHistory} from "vue-router";

// 配置路由
const routes = [
    { path: '/',name:"login", component: ()=>import("../components/login.vue") },
    { path: '/userInfo',name:"userInfo", component: ()=>import("../components/userInfo.vue") },
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router;