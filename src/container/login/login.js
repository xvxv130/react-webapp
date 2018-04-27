import React from 'react'
import Logo from '../../component/logo/logo'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'


@connect(state=>state.user,{login})
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:'',
            pwd:'',
        }
        this.register=this.register.bind(this);
        this.hanleLogin=this.hanleLogin.bind(this)
    }
    register(){
        // return <Redirect to='/register'></Redirect>
        this.props.history.push('/register')
    }
    hanleLogin(){
        this.props.login(this.state);
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
              <Logo ></Logo >  
              <h2>登录页</h2>
              <WingBlank>
              {this.props.msg?
                            <p className="error-msg">{this.props.msg}</p>
                            :null}
                  <List>
                      <InputItem
                         onChange={v=>this.handleChange('user',v)}
                      >用户</InputItem>
                      <WhiteSpace />
                      <InputItem
                         onChange={v=>this.handleChange('pwd',v)}
                         type='password'
                      >密码</InputItem>
                  </List>
                  <WhiteSpace />
                  <Button 
                     onClick={this.hanleLogin}
                     type="primary"
                  >登录</Button>
                  <WhiteSpace />
                  <Button  onClick={this.register} type="primary">注册</Button>
              </WingBlank>
            </div>
        )
    }
}

export default Login