项目主线
用户中心 》 登录     》 注册     》 信息完善
牛人     》 求职信息 》 职位列表  》 聊天
BOSS     》 管理职位  》查看牛人  》 聊天

前端：react    redux      router4   
后端：express  socket.io  mongodb

页面骨架：项目用create-react-app脚手架直接创建
         src为前端源码目录，server后端express目录，
         进入应用时获取用户信息，未登陆跳转login页。
         login、register不需要权限。用户信息、聊天列表、职位列表共享底部tabbar
         项目交互采用axios发送请求，求职者跟招聘者聊天用的socket.io双向数据绑定
         redux管理所以数据，样式基本使用antd-mobile现成组件。
功能文件夹：
           component组件文件{
                    authroute:获取当前用户信息，没有的跳登录
                    avatar-selector:用户完善信息头像选择
                    boss:获取数据展示牛人列表
                    genius:获取数据展示boss列表
                    chat:聊天页，表情用了emoji，消息的获取，发送，离开此组件时要设置未读信息数为0
                    dashboard:二级路由页消息，个人中心，消息列表的
                    img:头像文件
                    logo:logo组件
                    msg:消息列表，有未读信息随时提醒，点击跳转聊天页
                    navlink:公用tabbar
                    user:个人用户中心
                    usercard:聊天列表     
           }
           container容器文件{
                    bossinfo:boss个人信息页
                    geniusinfo:牛人信息页
                    login:登陆
                    register:注册
          }
           reducer.js是合并reducer功能 {
                    chat.redux:聊天消息页数据管理
                    chatuser.redux：当前用户的聊天列表
                    user.redux：当前用户的信息数据
           }
           util.js项目公共工具文件
           config.js统一数据请求拦截loading效果
         




琐碎记录：

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
