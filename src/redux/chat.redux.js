import React from 'react';
import axios from 'axios'
import io from 'socket.io-client'
// 如果不是跨域请求直接io()就行，现在是跨域参用以下方法
const socket=io('ws://localhost:9093')


//获取聊天列表
const MSG_LIST='MSG_LIST'
// 读取信息
const MSG_RECV='MSG_RECV'
// 标识已读
const MSG_READ='MSG_READ'

const initState={
    chatmsg:[],
    unread:0,//未读信息数
    users:{} //全部用户
}

// reducers
export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            // console.log(action);
            // action.payload.msgs.map(v=>{
            //     console.log(v.read,v.to,action.payload.userid);
            // })
            console.log(action.payload.msgs.filter(
                v=>!v.read && v.to==action.payload.userid
            ).length)
            return {
                ...state,
                users:action.payload.users,
                chatmsg:action.payload.msgs,
                unread:action.payload.msgs.filter(
                    v=>!v.read && v.to==action.payload.userid
                ).length
            }
        case MSG_RECV:
        console.log(action.payload.to);
            console.log(action);
            const n=action.payload.to==action.userid?1:0;
            return {...state,
                    chatmsg:[...state.chatmsg,action.payload],
                    unread:state.unread+n
                   }

        case MSG_READ:
        const {from,num}=action.payload;
                return {
                    ...state,
                    chatmsg:state.chatmsg.map(v=>({...v,read:from==v.from?true:v.read})),
                    unread:state.unread-num
                }
        default:
            return state
    }
}

// action-creater
function msgList(msgs,users,userid){
    return {type:'MSG_LIST',payload:{msgs,users,userid}}
}

function msgRecv(msg,userid){
    return {userid,type:'MSG_RECV',payload:msg}
}

export function recvMsg(){
    return (dispatch,getState)=>{
        socket.on('recvmsg',function(data){
            const userid=getState().user._id;
            dispatch(msgRecv(data,userid))
        })
       
    }
}
// action
export function getMsgList(){
    return (dispatch,getState)=>{
        axios.get('/user/getmsglist')
            .then(res=>{
                if(res.status==200 && res.data.code==0){
                    // console.log(res.data.user)
                    // 获取用户当前userid去拍断未读信息数
                    const userid=getState().user._id;
                    dispatch(msgList(res.data.msgs,res.data.user,userid))
                }
            })
    }
} 

export function sendMsg({from,to,msg}){
    // console.log(msg);
    return dispatch=>{
        socket.emit('sendmsg',{from,to,msg})
    }
    
}
function msgRead({from,userid,num}){
    return {type:MSG_READ,payload:{from,userid,num}}
}
export function readMsg(from){
    return (dispatch,getState)=>{
        axios.post('/user/readmsg',{from})
            .then(res=>{
                const userid=getState().user._id;
                if(res.status==200 && res.data.code ==0){
                    dispatch(msgRead({from,userid,num:res.data.num}))
                }
            })
    }
}