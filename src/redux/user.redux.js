import axios from 'axios'
import {getRedirectPath} from '../util'//统一判断跳转
// const REGISTER_SUCCESS='REGISTER_SUCCESS';//注册成功
const ERROR_MAG='ERROR_MAG' //报错信息
// const LOGIN_SUCCESS='LOGIN_SUCCESS'//登录
const LOAD_DATA='LOAD_DATA'//用户登录信息
const AUTH_SUCCESS='AUTH_SUCCESS'//优化LOGIN_SUCCESS,REGISTER_SUCCESS,把登录注册跟信息完善统一用authSuccessaction-creater
const initState={
    msg:'',
    isAuth:'',//是否登录成功
    user:'',
    type:'',
    redirectTo:'',
    _id:''
}
// reducer
export function user(state=initState,action){
    switch(action.type){
        case AUTH_SUCCESS:
            return{...state,msg:'',
                    redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        // case REGISTER_SUCCESS:
        //     return{...state,msg:'',
        //             redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        // case LOGIN_SUCCESS:
        //             return{...state,msg:'',
        //             redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case LOAD_DATA:
                    console.log(action);
                    return{...state,...action.payload}                         
        case ERROR_MAG:
            return{...state,msg:action.msg,isAuth:false}
        default:
            return state
    }
    return state;
}

// acrion-creater
function authSuccess(obj){
    const {pwd,...data}=obj;
    return {
        type:AUTH_SUCCESS,
        payload:data  
     }
}
function errorMsg(msg){
    return ({msg,type:ERROR_MAG})
}
// function registerSuccess(data){
//     return {
//        type:REGISTER_SUCCESS,
//        payload:data  
//     }
// }
// function loginSuccess(data){
//     return {
//        type:LOGIN_SUCCESS,
//        payload:data  
//     }
// }
export function loaddate(data){
    console.log(data);
    return {
        type:LOAD_DATA,
        payload:data  
     }
}
// 获取当前用户信息
// export function userinfo(){
//     return dispatch=>{
//           //获取用户信息
//     axios.get('user/info').
//     then(res=>{
//         if(res.status=='200'){
//             console.log(res.data.code);
//             if(res.data.code==0){
//                 //有登录信息
                
//             }else{
//                 this.props.loaddate(res.data.data)
//                 this.props.history.push('/login')
//             }
//             console.log(res.data);
//         }
//     })
//     // 是否登录
//     // 现在的url地址 login不需要跳转
//     // 用户的type 身份是boss还是牛人
//     // 用户是否完善信息（选择头像 个人简介）
//     }
  
// }
//个人完善信息action
export function update(data){
    return dispatch=>{
        axios.post('/user/update',data)
        .then(res=>{
            if(res.status==200 && res.data.code ===0){
                   dispatch(authSuccess(res.data.data)) 
            }else{
                   dispatch(errorMsg(res.data.msg))
            }
        })
    }
    
}


export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('用户名密码必须输入');
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
        .then(res=>{
            if(res.status==200 && res.data.code ===0){
                   dispatch(authSuccess(res.data.data)) 
            }else{
                    dispatch(errorMsg(res.data.msg))
            }
        })
    }
    
}
export function register({user,pwd,repeatpwd,type}){
    if(!user||!type||!pwd){
        return errorMsg('用户名密码必须输入');
    }
    if(pwd !== repeatpwd){
        return errorMsg('密码跟确认密码不一致');
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
        .then(res=>{
            if(res.status==200 && res.data.code ===0){
                   dispatch(authSuccess({user,pwd,type})) 
            }else{
                    dispatch(errorMsg(res.data.msg))
            }
        })
    }
    
}