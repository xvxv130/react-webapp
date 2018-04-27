import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {Provider,connect} from 'react-redux'
import './config'//请求统一拦截器
import Login from './container/login/login'
import Register from './container/register/register'
import Authroute from './component/authroute/authroute' 
import './index.css'
const store=createStore(reducer,compose(applyMiddleware(thunk)
            ,window.devToolsExtension ? window.devToolsExtension():f=>f))

function Boss(){
    return <h1>boss</h1>
}                       

ReactDOM.render(
        (<Provider store={store}>
           <BrowserRouter>
             <div>
                 {/* 检测路由 */}
                 <Authroute></Authroute>
                 <Route path='/boss'   component={Boss}></Route>
                <Route path='/login'   component={Login}></Route>
                <Route path='/register' component={Register}></Route>   
             </div>
               {/* <Switch>
                   
                    {/* <Redirect path='/:location'  component={Dashboard}></Redirect>   */}
                {/* </Switch> */} 
            </BrowserRouter>
        </Provider>),
        document.getElementById('root')
    );
                        
                        
