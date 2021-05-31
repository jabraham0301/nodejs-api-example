const {userModel} = require("../../models");
module.exports=async (id)=>await userModel.findOneAndDelete({id},{projection:{_id:0,__v:0}})