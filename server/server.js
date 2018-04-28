const express=require('express');

// body-parser、cookie-parser 是express的两个中间件
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const userRouter=require('./user');
const app=express();

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

app.listen(9093,function(){
    console.log('node app start at port 9093')
})

