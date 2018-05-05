import React from 'react';
import axios from 'axios'
// withRouter组件可以包装任何自定义组件，将react-router的history、location、match三个对象传入
import {withRouter} from 'react-router-dom'
import {loaddate} from '../../redux/user.redux'
import {connect} from 'react-redux'


@withRouter
@connect(state=>state.user,{loaddate})
class Authroute extends React.Component{
    componentDidMount(){
        const publicList=['/login','/register'];
        const pathname=this.props.location.pathname;
        if(publicList.indexOf(pathname)>-1){
            return null;
        }

        axios.get('/user/info').then(res=>{
                if(res.status=='200'){
                    // console.log(res.data.code);
                    if(res.data.code==0){
                        //有登录信息
                        this.props.loaddate(res.data.data)
                    }else{
                       
                        this.props.history.push('/login')
                    }
                    // console.log(res.data);
                }
            })
        
    }
    render(){
       return null;
    }
}

export default Authroute