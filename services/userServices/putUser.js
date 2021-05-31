const {userModel}=require('../../models')
module.exports=async (id,updateFields)=>{
    let res=await userModel.updateOne({id},updateFields)
    return res.nModified===1
}