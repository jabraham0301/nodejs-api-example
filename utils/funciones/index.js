const orderUsers=(filtro,users)=>{
    let {sort_by,order}=filtro
    let userOrdered=users.sort((a,b)=>typeof a[sort_by]=="number"?a[sort_by]-b[sort_by] : a[sort_by].localeCompare(b[sort_by]))
    if(order==="DESC"){
        userOrdered.reverse()
    }
    return userOrdered
}
module.exports={
    orderUsers
}