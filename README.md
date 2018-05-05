用户密码加密cmd5  utility加密第三方库


util.js 根据当前redu信息统一判断跳转 ,在user.redux.js 中统一跳转

登录跟注册post数据的时候在server／user.js中返回数据前均设置cookie(_id),
组件重新渲染是在getuserinfo请求中去判断cookie



Socket.io 基于事件的实时双向通信库
    1.基于websoket协议
    2.前后端通过事件进行双向通信
    3.配合express，快速开发实时应用
socket.io和ajax区别
基于不同的网络协议
    ajax基于http协议，单向，实时获取数据只能轮询
    socket.io基于websocket双向通信协议，后端可以主动推送数据
    现代浏览器均支持websocket协议
配合express
    Io=require('soket.io')(http)
    io.on 监听事件
    io.emit 触发事件 
前端
    Import io from 'socket.io-client'
    io.on 监听事件
    io.emit 触发事件     

<!-- 代码优化 -->
shouldcomponentupdata   
immutablejs 不可变的数据结果 对比数据变化减少组件渲染
    1.减少内存使用
    2.并发安全
    3.降低项目复杂度
    4.便于比较复杂数据，定制shouldcomponentupdata方便
    缺点：
    1.学习成本
    2.库略大
    3.对代码入侵严重
      新项目使用，老项目评估再用
<!-- 1.eslint代码校验工具 -->
<!-- 2.react16特有的错误处理机制 -->

<!-- redux reselector缓存优化 -->