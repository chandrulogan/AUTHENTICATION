var express = require('express');
var router = express.Router();
const {mongoose, usersModel} = require('../dbSchema')
const {dbUrl} = require('../dbConfig')
const{hashCompare, hashPassword} = require('../auth')

mongoose.connect(dbUrl);


router.get('/', async(req,res)=>{
  try {
    const users = await usersModel.find()
    res.send({
      statusCode: 200,
      data: users
    })
  } catch(error) {
    console.log(error)
    res.send({
      statusCode:400,
      message:"Internal Server Error",
      error
    })
  }
})


router.post('/signup', async(req,res)=>{
  try{
      let user = await usersModel.find({
      email: req.body.email,
      })
        if(user.length)
        {
          res.send({
            statusCode:200,
            message:"User Already Exist"
          })
        }else{
          let hashedPwd = await hashPassword(req.body.password)
          req.body.password = hashedPwd
          let newUser = await usersModel.create(req.body)
          res.send({
          statusCode:200,
          message:"Sign Up Successfull"
      })
        }
  }catch(error){
    console.log(error)
    res.send({
      statusCode:400,
      message:"Internal Server Error",
      error
    })
  }
})


router.post('/signin',async(req,res)=>{
  try{
      let user = await usersModel.find({
      email: req.body.email,
      })
      if(user.length)
      {
          let hash = await hashCompare(req.body.password, user[0].password)
          if(hash){
            res.send({
              statusCode:200,
              message:"Sign-in successfull"
            })
          }else{
            res.send({
              statusCode:400,
              message:"Invalid Credentials"
            })
          }
        }else{
        res.send({
          statusCode:400,
          message:"User Does not exist"
      })
      }
  }catch(error){
    console.log(error)
      res.send({
      statusCode:400,
      message:"Internal Server Error",
      error
    })
  }
})

module.exports = router;
