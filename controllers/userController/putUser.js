const {userServices,externalServices}=require('../../services')

module.exports=async (req,res)=>{
    let id=req.params.id
    let updateFields=req.body
    if(await userServices.putUser(id,updateFields)){
        let user=userServices.getUserByID(id)
        res.status(200).json(user)
    }else{
        let possibleUser=await externalServices.getUserExternal(id)
        if(possibleUser.hasOwnProperty('data')){
            let {data, support} = possibleUser
            let userObj = {
                id: data.id,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                company: "",
                url: support.url,
                text: support.text
            }
            Object.assign(userObj,updateFields)
            await userServices.createUser(userObj)
            res.status(200).json(userObj)
        }else{
            res.status(404).json({message:"User not found"})
        }
    }
}