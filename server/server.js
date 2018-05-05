const express=require('express');

// body-parser、cookie-parser 是express的两个中间件
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const userRouter=require('./user');
const model=require('./model');
const Chat=model.getModel('chat')


const app=express();
//socket work with express 把socket跟express关联
const server=require('http').Server(app)
const io=require('socket.io')(server)



io.on('connection',function(socket){
    // console.log('user login')
    socket.on('sendmsg',function(data){
        const {from,to,msg}=data;
        const chatid = [from,to].sort().join('_');
        console.log(chatid)
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            console.log(doc._doc)
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
        // console.log(data);
        // io.emit('recvmsg',data)
    })
})

app.use(cookieParser());//解析cookie
app.use(bodyParser.json());//解析post过来的json
app.use('/user',userRouter);
// app.get('/',function(req,res){
// 	res.send('<h1>Hello world</h1>')
// })	
// app.get('/data',function(req,res){
// 	User.findOne({user:'xiaoming'},function(err,doc){
// 		res.json(doc)
// 	})
// })

server.listen(9093,function(){
    console.log('node app start at port 9093')
})

