module.exports = {
    devserver:{
        Proxy:{
            '/api':{
                target:'http://localhost:1314',
                changeOrigin:true,
                ws:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}