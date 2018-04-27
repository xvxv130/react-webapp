import React from 'react';
import axios from 'axios'
// withRouter组件可以包装任何自定义组件，将react-router的history、location、match三个对象传入
import {withRouter} from 'react-router-dom'

@withRouter
class Authroute extends React.Component{
    componentDidMount(){
        const publicList=['/login','/register'];
        const pathname=this.props.location.pathname;
        if(publicList.indexOf(pathname)>-1){
            return null;
        }
        //获取用户信息
        axios.get('user/info').
            then(res=>{
                if(res.status=='200'){
                    console.log(res.data.code);
                    if(res.data.code==0){
                        //有登录信息
                        
                    }else{
                        this.props.history.push('/login')
                    }
                    console.log(res.data);
                }
            })
        // 是否登录
        // 现在的url地址 login不需要跳转
        // 用户的type 身份是boss还是牛人
        // 用户是否完善信息（选择头像 个人简介）
    }
    render(){
       return null;
    }
}

export default Authroute