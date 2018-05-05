// 用户聊天
import React from 'react';
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux'
import { getChatId } from '../../util';


// 如果不是跨域请求直接io()就行，现在是跨域参用以下方法
// const socket=io('ws://localhost:9093')

@connect(state=>state,{getMsgList,sendMsg,recvMsg,readMsg})
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text:'',
            msg:[]
        }
    }
    handleSubmit(){
        // socket.emit('sendmsg',{text:this.state.text})
        // this.setState({text:''})
        // socket.emit('sendmsg',{text:this.state.text})
        const from=this.props.user._id
        const to =this.props.match.params.user
        const msg=this.state.text
        this.props.sendMsg({from,to,msg});
        this.setState({
            text:'',
            showEmoji:false
        })
    }
    // 组件移除生命周期函数
    componentWillUnmount(){
        const to=this.props.match.params.user;
        this.props.readMsg(to)
    }
    componentDidMount(){

        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg()
        }
        console.log(this.props);
        
        
        // this.props.getMsgList();
        // this.props.recvMsg()
        // socket.on('recvmsg',data=>{
        //     this.setState({
        //         msg:[...this.state.msg,data.text]
        //     })
        // })
    }
    //antd-mobile修正跑马灯bug
    fixCarousel(){
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        })
    }
    render(){
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))
        // {console.log(this.props)}
        const userid=this.props.match.params.user;
        const Item=List.Item;
        const users=this.props.chat.users;
        // console.log(this.props)
        const chatid=getChatId(userid,this.props.user._id);
        // console.log(chatid);
        const chatmsgs=this.props.chat.chatmsg.filter(
                        v=>
                            v.chatid==chatid
                        );
        // 当没有用户id或者无法找到的时候直接返回空
        if(!users[userid]){
            return null
        }
        return (
            <div id='chat-page'>
                <NavBar 
                    icon={<Icon type="left" />}
                    onLeftClick={() =>{this.props.history.goBack()}}
                     mode='dark'>
                    {users[userid].name}
                    
                </NavBar>
        
                {chatmsgs.map(v=>{
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    // {console.log(v.from,userid,avatar)}
                    return v.from==userid?(
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >
                            {v.content}
                            </Item>    
                        </List>
                        ):(
                        <List key={v._id}>
                            <Item
                                extra={<img alt="avatar" src={avatar} />}
                                 className="chat-me"
                            >
                            {v.content}
                            </Item>    
                        </List> 
                                 
                        )       
                    
                    // return <p key={v._id}>{v.content}</p>
                })}
                <div className="stick-footer">
                <List>
                    <InputItem
                        placeholder='请输入'
                        value={this.state.text}
                        onChange={v=>{this.setState({text:v})}}
                        extra={
                                <div>
                                    <span
										style={{marginRight:15}}
										onClick={()=>{
											this.setState({
												showEmoji:!this.state.showEmoji
											})
											this.fixCarousel()
										}}
									>
                                        😃
                                     </span>
                                   <span onClick={()=>this.handleSubmit()}>
                                        发送
                                    </span>     
                                </div>
                                
                              }
                    >
                    </InputItem>
                </List>
                {this.state.showEmoji?
                    <Grid
                    data={emoji}
                    columNum={9}
                    carouselMaxRow={4}
                    isCarousel={true}
                    onClick={el=>{
                        console.log(el);
                        this.setState({
                            text:this.state.text+el.text
                        })
                        
                    }}
                   />:null
                }
                    
            </div> 
            </div>
                          

        )
    }
}
export default Chat
