const {classes}=require('../utils')
let user=new classes.modelClass.CreateModel({
    id:Number,
    email:String,
    first_name:String,
    last_name:String,
    company:String,
    url:String,
    text:String
},'user')
let userModel=user.create()
module.exports=userModel