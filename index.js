require('dotenv').config({path:`./environments/.env.${process.env.NODE_ENV}`})
const mongoConnection=require('./database')
const server=require('./server')
const PORT=process.env.PORT||3030
mongoConnection.then(()=>{
    server.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
}).catch(e=>console.log(e))
