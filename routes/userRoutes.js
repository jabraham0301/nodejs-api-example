const express=require('express')
const {userController}=require('../controllers')
const router=express.Router()
router.get('/:ids',userController.getUsers)
router.put('/:id',userController.putUser)
router.delete('/:id',userController.deleteUser)
module.exports=router