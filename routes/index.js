const express=require('express')
const cluster=express.Router()
const userRoutes=require('./userRoutes')
cluster.use('/users',userRoutes)
module.exports=cluster