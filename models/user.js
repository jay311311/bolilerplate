const mongoose = require("mongoose");
const bcrypt = require(`bcrypt`);
const saltRounds =  10; // salt가 몇자리 수인지

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

const User = mongoose.model("User",userSchema)

module.exports = {User}