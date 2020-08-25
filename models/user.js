const mongoose = require("mongoose");
const bcrypt = require(`bcrypt`);
const saltRounds =  10; // salt가 몇자리 수인지
var jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength :50
     },
    email:{
        type:String,
        trim:true, /*스페이스(빈칸을)없애는 것*/
        uniqu:1 /*이메일은 고유할 것*/
    },
    password: {
        type:String,
        minlength :5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    image:{
        type:String,
        token:{
            type:String
        },
        tokenExp:{
            type:Number
        }
    } 
})

userSchema.pre(`save`, function(next){
    var user  = this;

    if(user.isModified(`password`)){
        //비밀번호를 암호화 시킨다
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
               
            });
        });
    } else{
        next()
    }
    



})

userSchema.methods.comparePassword = function(plainPassword , cb){
    //plainPassword   tkfkdgo9         암호와된 비밀번호   $2b$10$u13W.x2s3epNaw7Uo4fqve/.38oYC2w0VFsUhoVLIw41ZBQAf17Tq
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err)  return cb(err),
        cb(null, isMatch)
    })

}


userSchema.methods.generateToken = function(cb){

    var user = this;
    console.log(`user._id`,user._id)


    //jsonwebtoken을 이용해서 token을 생성하기
 var token = jwt.sign(user._id.toHexString(), 'secretToken');
// user._id +`secretToken` = token

user.token = token
user.save(function(err, user){
    if(err) return cb(err)
    cb(null, user)
})

}
const User = mongoose.model("User",userSchema)

module.exports = {User}