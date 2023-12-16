# x管理系统详细文档

##### 项目介绍

        本应用使用前后端分离人不分离模式开发     作者：[YIfangweb](https://github.com/YIfangweb)  日期：2023年12月13日-

###### 前端技术栈

         Vite+Vue3+Element-plus+pinia+Axios

###### 后端技术栈

        spring boot + maven + mybatis + MySQL + JDK17

###### 功能介绍

        1.    用户登录 （两类用户--学生--教师）

        2.    

# 开发中遇到的问题【已解决】

##### -1-    Axios 请求403、500 错误

                描述：在Vue3中，使用axios来发送post请求的时候，出现的请求错误，在开发中，后端接口地址与前端项目地址不同，由此引发跨域问题，就算能请求成功，也会有权限不够，后端未返回数据

                错误原因： 请求存在跨域问题

                解决方式：

                    前端：使用URLSearchParams（）方法来进行post请求的传参

```js
// login.vue
const onslogin = async () => {  
    // 使用URLSearchParams()进行post请求传参  
    let spram = new URLSearchParams();  
    spram.append("sid", user.uname);  
    spram.append("spassword", user.upassword);  
    proxy.$http.post("/api/slogin", spram).then((res) => {  
        if (res.data !== "") {  
            ElMessage({  
                message: '登录成功！',  
                type: 'success',  
            })  
            const store = usestudentStore();  
            store.studentMsg = res.data  
            router.push('/')  
        } else {  
            ElMessage.error('账号或密码错误');  
            user.upassword= '';  
        }  
    })  
}`
```

```js
//main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'

import router from './router';
import App from './App.vue'
import axios from 'axios';
import { createPersistedState} from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(createPersistedState({
    storage: sessionStorage
}))

const app =  createApp(App);

// 配置axios请求地址并暴露为全局变量
axios.defaults.baseURL = 'http://localhost:1314'
app.config.globalProperties.$http=axios

app.use(router)
app.use(pinia)
app.mount('#app')
```

               后端：在Controller控制类中添加@CrossOrigin(origins = "*")和@RequestParam注解

```java
package com.x.xserver.controller;

import com.x.xserver.pojo.student;
import com.x.xserver.pojo.studentloginMsg;
import com.x.xserver.pojo.teacher;
import com.x.xserver.pojo.teacherloginMsg;
import com.x.xserver.service.systemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class systemController {

    @Autowired
    private systemService systemService;

    @RequestMapping("/api/findById")
    public student findById(Integer sid){
        return systemService.findById(sid);
    }

    @RequestMapping("/api/slogin")
    public studentloginMsg sloginByidBypassword(@RequestParam("sid") Integer sid, @RequestParam("spassword") String spassword){
        student student =  systemService.sloginByidBypassword(sid,spassword);
        if(student!=null){
            studentloginMsg studentloginMsg = new studentloginMsg(
                    student.sid,student.sname,student.spassword,
                    student.sclass,student.syear,2,student.sunique,"success"
            );
            return studentloginMsg;
        }else {
            return null;
        }
    }

    @RequestMapping("/api/tlogin")
    public teacherloginMsg tloginByidBypassword(@RequestParam("tid") Integer tid, @RequestParam("tpassword") String tpassword){
        teacher teacher =  systemService.tloginByidBypassword(tid,tpassword);
        if(teacher!=null){
            return new teacherloginMsg(
                    teacher.tid,teacher.tname,teacher.tpassword,
                    teacher.tunique,1,"success"
            );
        }else {
            return null;
        }

    }
}

```







##### -2-    在vue中实现动态更改css

```css
left: v-bind('tCss.left');
```

```js
const tCss = reactive({left : "calc(50% - 2px)"})
tCss.left = "calc(50% - 2px)"
```



##### -3-    在vue3中判断object对象是否为空

```js
Object.keys(usestudentStore().studentMsg).length !== 0
```



##### -4-    pinia持久化储存数据

需要安装 pinia-plugin-persistedstate 插件

```npmignore
npm i pinia-plugin-persistedstate -s
```

在main.js中配置

```js
import { createPersistedState} from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(createPersistedState({
    storage: sessionStorage //设置储存方式
}))
```

使用

```js
import { defineStore } from 'pinia'

let useteacherStore;
export default useteacherStore = defineStore('teacher', {
    state:()=>{
        return {  //一定要返回数据，不然不能储存
            teacherMsg:{}
        }
    },
    getters: {},
    actions: {},
    persist : true  //开启持久化储存
})
```

！！！！！！！特别注意！！！！！！！！

<u>**如果没有持久化储存，检查useStore中是否return数据，我找了几个小时，发现没有return，好好好这么玩**</u>





-5-    