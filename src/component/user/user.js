import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Result, List,WhiteSpace,Modal,Button } from 'antd-mobile';
import browserCookie  from 'browser-cookies'//对当前cookie进行操作
import {logoutSubmit} from '../../redux/user.redux'
@connect(state=>state.user,{logoutSubmit})
class User extends React.Component{
    constructor(props){
        super(props)
        this.logout=this.logout.bind(this);
    }
    logout(){
        const alert=Modal.alert;
        alert('注销', '确定退出登录吗', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                browserCookie.erase('userid');
                this.props.logoutSubmit();
            } },
          ])
        // ; 
        // console.log('退出登录');
    }
    render(){
        const props=this.props;
        const Item =List.Item ;
        const Brief=Item.Brief;
        return props.user?(

            <div>
                 
                <Result
                    img={<img style={{width:50}} alt="头像" src={require(`../img/${this.props.avatar}.png`)}/>}
                    title={this.props.user}
                    message={props.type=='boss'?props.company:null}
                 />
                 <List renderHeader={()=>'简介'}>
                    <Item
                        multipleLine
                    >
                        {props.title}
                        {props.desc.split('/n').map(v=><Brief key={v}>{v}</Brief>)}
                        {props.money?<Brief>薪资：{props.money}</Brief>:null}
                    </Item>
                    
                 </List>
                 <WhiteSpace></WhiteSpace>
                 <List>
                     <Button onClick={this.logout} type="primary">退出登录</Button>
                 </List>
            </div>     
                ):<Redirect to={this.props.redirectTo}></Redirect>
    }
}

export default  User
