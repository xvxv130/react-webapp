//公共 工具函数

export function getRedirectPath({type,avatar}){
    // 根据用户细心信息 返回跳转地址
    // user.type    /boss  /genius
    // user.avater /bossinfo  /geniusinfo
    let url=(type==='boss')? '/boss':'/genius'
    // 没有头像-》完善信息，有头像跳转到相应页面
    if(!avatar){
        url+='info'
    }
    return url
}

// 获取信息唯一标示chatid
export function getChatId(userID,targetId){
    return [userID,targetId].sort().join('_')
}