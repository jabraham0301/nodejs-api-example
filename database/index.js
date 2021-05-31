const mongoose=require('mongoose')
const connection=mongoose.connect(process.env.URI,{
    dbName:process.env.DB_NAME,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
module.exports=connection