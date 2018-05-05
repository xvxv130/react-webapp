import React from 'react'
import Logo from '../../component/logo/logo'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import imoocForm from '../../component/imooc-form/imooc-form'
// function hello(){
//     console.log('hello imooc i love react')
// }
// function wapperhello(fn){
//     return function(){
//         console.log('before say hello');
//         fn();
//         console.log('after say hello')
//     }
// }
// hello=wapperhello(hello);
// hello();
// 高阶组件 属性代理／反向继承
// function WapperHello(Comp){
//     class WrapHello extends Comp{
//         componentDidMount(){
//             console.log('高阶组件新增的生命周期，加载完成')
//         }
//         render(){
//           return(
//             <div>
//             <p>这是HOC高阶组件特有的元素</p>
//             <Comp {...this.props}></Comp>
//         </div>
//           )
                
            
//         }

//     }
    // class WrapHello extends React.Component{
    //     render(){
    //       return(
    //         <div>
    //         <p>这是HOC高阶组件特有的元素</p>
    //         <Comp {...this.props}></Comp>
    //     </div>
    //       )
                
            
    //     }

    // }
//     return WrapHello;
// }
// @WapperHello 
// class Hello extends React.Component{
//     render(){
//         return <h2>hello i love react</h2>
//     }
// }

// Hello=WapperHello(Hello);

@connect(state=>state.user,{login})
@imoocForm
class Login extends React.Component{
    constructor(props){
        super(props);
        // this.state={
        //     user:'',
        //     pwd:'',
        // }
        this.register=this.register.bind(this);
        this.hanleLogin=this.hanleLogin.bind(this)
    }
    //  handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     })
    // }
    
    register(){
        // return <Redirect to='/register'></Redirect>
        this.props.history.push('/register')
    }
    hanleLogin(){
        this.props.login(this.props.state);
    }
//    this.props.handleChange,this.props.state都是imoocForm中获取的数据
    render(){
        return (
            <div>
                {this.props.redirectTo && this.props.redirectTo!='/login' ?<Redirect to={this.props.redirectTo}></Redirect>:null}
               {/* <Hello />  */}
              <Logo ></Logo >  
              <h2>登录页</h2>
              <WingBlank>
              {this.props.msg?
                            <p className="error-msg">{this.props.msg}</p>
                            :null}
                  <List>
                      <InputItem
                         onChange={v=>this.props.handleChange('user',v)}
                      >用户</InputItem>
                      <WhiteSpace />
                      <InputItem
                         onChange={v=>this.props.handleChange('pwd',v)}
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