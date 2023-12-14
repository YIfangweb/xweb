import { createRouter,createWebHashHistory} from "vue-router";

// 配置路由
const routes = [
    { path: '/',name:"home", component: ()=>import("../components/home.vue") },
    { path: '/login',name:"login", component: ()=>import("../components/login.vue") },
    { path: '/userInfo',name:"userInfo", component: ()=>import("../components/userInfo.vue") },
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router;