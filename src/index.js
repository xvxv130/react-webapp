import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import './config'//请求统一拦截器
import Login from './container/login/login'
import Bossinfo from './container/bossinfo/bossinfo'
import Geniusinfo from './container/geniusinfo/geniusinfo'
import Register from './container/register/register'
import Authroute from './component/authroute/authroute'
import Chat from './component/chat/chat'  
import Dashboard from './component/dashboard/dashboard'
import './index.css'
const store=createStore(reducer,compose(applyMiddleware(thunk)
            ,window.devToolsExtension ? window.devToolsExtension():f=>f))

                 
//boss genius me msg 4个页面
ReactDOM.render(
        (<Provider store={store}>
           <BrowserRouter>
             <div>
                 {/* 检测路由 */}
                 <Authroute></Authroute>
                 <Switch>
                    <Route path='/bossinfo'   component={Bossinfo}></Route>
                    <Route path='/geniusinfo'   component={Geniusinfo}></Route>
                    <Route path='/login'   component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/chat/:user' component={Chat}></Route>
                    <Route    component={Dashboard}></Route>
                 </Switch>     
                 
             </div>
               {/* <Switch>
                   
                    {/* <Redirect path='/:location'  component={Dashboard}></Redirect>   */}
                {/* </Switch> */} 
            </BrowserRouter>
        </Provider>),
        document.getElementById('root')
    );
                        
                        
