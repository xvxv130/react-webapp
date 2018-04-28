// 用户列表抽离成聊天的列表
const USER_LIST='USER_LIST'

const initState={
    userList:[]
}

// reducers
function chatuser(state=initState,action){
    switch(action.type){
        case USER_LIST:

        default:
            return state

    }
}
// action-creater
function userList(data){
    return {type:USER_LIST,payload:data}
}


// 获取数据
function getUserList(type){
    return dispatch=>{
        
    }
}
