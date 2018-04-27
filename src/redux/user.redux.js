import axios from 'axios'
import {getRedirectPath} from '../util'//统一判断跳转
const REGISTER_SUCCESS='REGISTER_SUCCESS';//注册成功
const ERROR_MAG='ERROR_MAG' //报错信息
const LOGIN_SUCCESS='LOGIN_SUCCESS'//登录
const initState={
    msg:'',
    isAuth:'',//是否登录成功
    user:'',
    pwd:'',
    type:'',
    redirectTo:''
}
// reducer
export function user(state=initState,action){
    switch(action.type){
        case REGISTER_SUCCESS:
            return{...state,msg:'',
                    redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case LOGIN_SUCCESS:
                    return{...state,msg:'',
                    redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}            
        case ERROR_MAG:
            return{...state,msg:action.msg,isAuth:false}
        default:
            return state
    }
    return state;
}

// acrion-creater
function errorMsg(msg){
    return ({msg,type:ERROR_MAG})
}
function registerSuccess(data){
    return {
       type:REGISTER_SUCCESS,
       payload:data  
    }
}
function loginSuccess(data){
    return {
       type:LOGIN_SUCCESS,
       payload:data  
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
                   dispatch(loginSuccess(res.data.data)) 
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
                   dispatch(registerSuccess({user,pwd,type})) 
            }else{
                    dispatch(errorMsg(res.data.msg))
            }
        })
    }
    
}