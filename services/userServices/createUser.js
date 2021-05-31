const {userModel} = require("../../models");
module.exports=async (newUser)=>await userModel.create(newUser,)