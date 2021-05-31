const {userServices,externalServices}=require('../../services')
const {funciones}=require('../../utils')
module.exports=async (req,res)=>{
    let ids=req.params.ids.split(',')
    let users=[]
    let calls=0
    for(let id of ids){
        let user=await userServices.getUserByID(id)
        if(user==null){
            let newUser=await externalServices.getUserExternal(id)
            if(newUser!=null) {
                if(newUser==="Server offline"){
                    res.status(400).json({message:newUser}).end()
                }
                let {data, support} = newUser
                let userObj = {
                    id: data.id,
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    company: "",
                    url: support.url,
                    text: support.text
                }
                await userServices.createUser(userObj)
                users.push(userObj)
            }else{
                calls+=1
                users.push({id:parseInt(id),message:"User not found"})
            }
        }else{
            users.push(user)
        }
    }
    if(req.query.hasOwnProperty('sort_by')&&req.query.hasOwnProperty('order')){
        filtro={...req.query}
        users=funciones.orderUsers(filtro,users)
    }
    if(calls===ids.length){
        res.status(400).json({message:"All users not found"})
    }else{
        res.status(200).json(users)
    }
}