const {userServices,externalServices}=require('../services')
const mongoose=require('mongoose')
const {userModel}=require('../models')
process.env.URI='mongodb://localhost:27017/testing'
let userObj=null
beforeAll(async ()=>{
    await mongoose.connect(process.env.URI,{useNewUrlParser:true,useUnifiedTopology:true})
})
describe('Get user for first time',()=>{
    it('SERVICE getUserById',async ()=>{
        //this user dont exist in db
        let user=await userServices.getUserByID(1)
        expect(user).toBeNull()
    })
    it('SERVICE getUserExternal',async()=>{
        let user=await externalServices.getUserExternal('1',"http://reqres.in/api/users")
        let {data,support}=user
        userObj={
            id: data.id,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            company: "",
            url: support.url,
            text: support.text
        }
        expect(userObj).toMatchObject({
            id:1,
            email:"george.bluth@reqres.in",
            first_name: "George",
            last_name: "Bluth",
            company:"",
            url:"https://reqres.in/#support-heading",
            text:"To keep ReqRes free, contributions towards server costs are appreciated!"
        })
    })
    it('SERVICE createUser',async ()=>{
        let user=await userServices.createUser(userObj)
        expect(user).toMatchObject({
            id:1,
            email:"george.bluth@reqres.in",
            first_name: "George",
            last_name: "Bluth",
            company:"",
            url:"https://reqres.in/#support-heading",
            text:"To keep ReqRes free, contributions towards server costs are appreciated!"
        })
    })
})
describe('Get same user for second time',()=>{
    it('SERVICE getUserById',async ()=>{
        //this user exists in db
        let user=await userServices.getUserByID(1)
        expect(user).toMatchObject({
            id:1,
            email:"george.bluth@reqres.in",
            first_name: "George",
            last_name: "Bluth",
            company:"",
            url:"https://reqres.in/#support-heading",
            text:"To keep ReqRes free, contributions towards server costs are appreciated!"
        })
    })
})
describe('Put user email',()=>{
    it('SERVICE putUser',async()=>{
        let userModified=await userServices.putUser(1,{email:"prueba@prueba.com"})
        expect(userModified).toEqual(true)
    })
    it('SERVICE getUserById',async ()=>{
        //this user exists in db
        let user=await userServices.getUserByID(1)
        expect(user).toMatchObject({
            id:1,
            email:"prueba@prueba.com",
            first_name: "George",
            last_name: "Bluth",
            company:"",
            url:"https://reqres.in/#support-heading",
            text:"To keep ReqRes free, contributions towards server costs are appreciated!"
        })
    })
})
describe('Delete user',()=>{
    it('SERVICE deleteUser',async()=>{
        //this user is in db
        let deletedUser=await userServices.deleteUser(1)
        expect(deletedUser).toMatchObject({
            id:1,
            email:"prueba@prueba.com",
            first_name: "George",
            last_name: "Bluth",
            company:"",
            url:"https://reqres.in/#support-heading",
            text:"To keep ReqRes free, contributions towards server costs are appreciated!"
        })
    })
})
afterAll(async()=>{
    await userModel.deleteMany()
})