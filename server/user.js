// 用户相关的所有信息
const express=require('express');
const Router=express.Router();
const model=require('./model');
const utils=require('utility');//加密插件
const User=model.getModel('user')
const Chat=model.getModel('chat')
const _filter={'pwd':0,'_v':0}
// psot方法使用body来获取值，而get方法使用query来获取请求参数
Router.get('/list',function(req,res){
    const {type}=req.query;
    // User.remove({},function(e,d){})
   User.find({type},function(err,doc){
        return res.json({code:0,data:doc})
   })
})
Router.get('/getmsglist',function(req,res){
    const user=req.cookies.userid
    User.find({},function(e,userdoc){
        let users={}
        userdoc.forEach(v=>{
            users[v.id]={name:v.user,avatar:v.avatar}
        })
    
        // Chat.remove({},function(e,d){});//清楚chat聊天数据
        // {'$or':[from:user,to:user]}
        Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
            if(!err){
                return res.json({code:0,msgs:doc,user:users})
            }
        })
    })
    
})
Router.get('/info',function(req,res){
    // 用户有没有cookie
    const {userid}=req.cookies;
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
   
})
// 当前用户读取对方发来的信息
Router.post('/readmsg',function(req,res){
    const userid= req.cookies.userid;
    const {from}=req.body;
    Chat.update(
        {from,to:userid},
        {'$set':{read:true}},
        {'multi':true},
        function(err,doc){
            console.log(doc);
            // { n: 1, nModified: 1, ok: 1 } n:数据量 nModified：修改的数据 ok：修改是否成功
            if(!err){
                return res.json({code:0,num:doc.nModified})
            }
            return res.json({code:1,msg:'修改失败'})
    })
})
// 解析post过来的参数，进行判断处理。创建成功后返回给前端
Router.post('/register',function(req,res){
    console.log(req.body.data);
    const {user,pwd,type}=req.body;
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        //save方法可以获取到用户的_id
        const userModel=new User({user,pwd:md5pwd(pwd),type});
        userModel.save(function(e,d){
            if(e){
                return res.json({code:1,msg:'后端出错了'})    
            }
            const {user,type,_id}=d;
            res.cookie('userid',_id);
            return res.json({code:0,data:{user,type,_id}})
            
        })
        //create 无法获取到当前用户分配的_id 
        // User.create({user,pwd:md5pwd(pwd),type},function(e,d){
        //     if(e){
        //         return res.json({code:1,msg:'后端出错了'})
        //     }
        //     return res.json({code:0})
        // })
    })
})
// post用户完善信息
Router.post('/update',function(req,res){
    // 用户有没有cookie,防止用户开两个页面的情况
    const {userid}=req.cookies;
    console.log(userid);
    if(!userid){
        return res.json({code:1})
    }
    const body=req.body;
    // 查找用户id并更新数据
    User.findByIdAndUpdate(userid,body,function(err,doc){
        const data=Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data})
    })
})

Router.post('/login',function(req,res){
    const {user,pwd}=req.body;
    User.findOne({user,pwd:md5pwd(pwd)},_filter,function(err,doc){//pwd设置为0，不返回密码给前端
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