// 用户相关的所有信息
const express=require('express');
const Router=express.Router();
const model=require('./model');
const utils=require('utility');//加密插件
const User=model.getModel('user')

Router.get('/list',function(req,res){
    // User.remove({},function(e,d){})
   User.find({},function(err,doc){
        return res.json(doc)
   })
})
Router.get('/info',function(req,res){
    // 用户有没有cookie
    return res.json({code:1})
})
// 解析post过来的参数，进行判断处理。创建成功后返回给前端
Router.post('/register',function(req,res){
    console.log(req.body.data);
    const {user,pwd,type}=req.body;
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        User.create({user,pwd:md5pwd(pwd),type},function(e,d){
            if(e){
                return res.json({code:1,msg:'后端出错了'})
            }
            return res.json({code:0})
        })
    })
})

Router.post('/login',function(req,res){
    const {user,pwd}=req.body;
    User.findOne({user,pwd:md5pwd(pwd)},{'pwd':0},function(err,doc){//pwd设置为0，不返回密码给前端
        if(!doc){
            return res.json({code:1,msg:'用户名不存在或密码错误'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})


// 给用户的输入密码加严
function md5pwd(pwd){
    const salt='react_must_learnwell@#234~~~';
    return utils.md5(utils.md5(pwd+salt));
}

module.exports=Router