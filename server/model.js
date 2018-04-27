// 操作数据库

const mongoose=require('mongoose');
//�连接mongo 并且使用imooc这个集合
const DB_URL='mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL);
mongoose.connection.on('connnected',function(){
    console.log('mongo connect success')
})

const models={
    user:{
        'user':{type:String,require:true},//用户名
        'pwd':{type:String,require:true},//密码
        'type':{type:String,require:true},//用户类型
        'avatar':{type:String},         //头像
        'desc':{type:String},           //个人简介或者职位简介
        'title':{type:String},          //职位名称
        'company':{type:String},        //公司名称
        'money':{type:String}           //薪资待遇
    },
    chat:{

    }

}
// 批量动态注册
for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}
module.exports={
    getModel:function(name){
        return mongoose.model(name)
    }
}
// 设计字段
// const User=mongoose.model('user',new mongoose.Schema({
//     user:{type:String,require:true},
//     age:{type:Number,require:true}
// }))
