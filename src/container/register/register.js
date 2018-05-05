import React from 'react'
import Logo from '../../component/logo/logo'
import {Redirect} from 'react-router-dom'
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
import {register} from '../../redux/user.redux'
import { connect} from 'react-redux'
import imoocForm from '../../component/imooc-form/imooc-form'
const RadioItem = Radio.RadioItem;


@connect(state=>state.user,{register})
@ imoocForm
class Register extends React.Component{
    constructor(props){
        super(props);
        // this.state={
        //     type:'genius',//用户类型，boss或genius牛人
        //     user:'',
        //     pwd:'',
        //     repeatpwd:''
        // }
        this.hanleRegister=this.hanleRegister.bind(this)
    }
    hanleRegister(){
        this.props.register(this.props.state);
    }
    componentDidMount(){
        this.props.handleChange('type','genius')
    }
    // handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     })
    // }
    render(){
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
              <Logo ></Logo >  
              <h2>注册页</h2>
              <WingBlank>
              {this.props.msg?
                            <p className="error-msg">{this.props.msg}</p>
                            :null}
                  <List>
                    
                      <InputItem
                        onChange={v=>this.props.handleChange('user',v)}
                      >用户名</InputItem>
                      <WhiteSpace />
                      <InputItem
                        type="password"
                        onChange={v=>this.props.handleChange('pwd',v)}
                      >密码</InputItem>
                      <WhiteSpace />
                      <InputItem
                        type="password"
                        onChange={v=>this.props.handleChange('repeatpwd',v)}
                      >确认密码</InputItem>
                  <WhiteSpace />
                  <RadioItem  
                        checked={this.props.state.type=='genius'} 
                        onChange={()=>this.props.handleChange('type','genius')}
                  >
                      牛人            
                   </RadioItem>
                   <RadioItem  
                        checked={this.props.state.type=='boss'} 
                        onChange={()=>this.props.handleChange('type','boss')}
                   >
                      Boss
                   </RadioItem>
                   <Button type="primary"
                        onClick={this.hanleRegister}
                   >注册</Button>
                   </List>
              </WingBlank>
            </div>
        )
    }
}

export default Register