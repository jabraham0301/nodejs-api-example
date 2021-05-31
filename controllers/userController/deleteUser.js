const {userServices} = require("../../services");
module.exports=async (req,res)=>{
    let id=req.params.id
    let deletedUser=await userServices.deleteUser(id)
    if(deletedUser!=null){
        res.status(200).json(deletedUser)
    }else{
        res.status(404).json({message:"User not found"})
    }
}