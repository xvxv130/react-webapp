import axios from 'axios'

// 用户列表抽离成聊天的列表
const USER_LIST='USER_LIST'

const initState={
    userList:[]
}

// reducers
export function chatuser(state=initState,action){
    switch(action.type){
        case USER_LIST:
        // console.log(action.payload)
            return {...state,userList:action.payload}
        default:
            return state

    }
}
// action-creater
function userList(data){
    return {type:USER_LIST,payload:data}
}


// 获取数据
export function getUserList(type){
    return dispatch=>{
        axios.get('user/list?type='+type).then(res=>{
                if(res.data.code=='0'){
                    dispatch(userList(res.data.data))
                }
            })
    }
}
