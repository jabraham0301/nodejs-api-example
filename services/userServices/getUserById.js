const {userModel}=require('../../models')
module.exports=async (id)=>await userModel.findOne({id},{_id:0,__v:0})