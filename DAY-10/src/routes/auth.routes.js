const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken")
const authRouter = express.Router();
const crypto = require("crypto")

authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "Email already exists",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex")

  const user = await userModel.create({
    email,
    name,
    password : hash,
  });

  const token = jwt.sign({
    id: user._id,
    email: user.email
  },
  process.env.JWT_SECRET
)

res.cookie("jwt_token",token)

  res.status(201).json({
    message: "User Registered",
    user,
    token
  });
});

authRouter.post("/protected",(req,res)=>{
  console.log(req.cookies);

  res.status(200).json({
    message : "this is a protected Route"
  })
})

authRouter.post("/login",async(req,res) =>{
  const {email,password} = req.body;

  const user = await userModel.findOne({email})

  if(!user){
    res.status(409).json({
      message : "Email is not registered"
    })
  }

  const isPassMatched = user.password === crypto.createHash("md5").update(password).digest("hex")

  if(!isPassMatched){
    res.status(409).json({
      message : "Invalid password"
    })
  }

  const token = jwt.sign({
    id: user._id,
  },process.env.JWT_SECRET)


  res.cookie("jwt_token",token)

  res.status(200).json({
    message : "logged IN Successfully",
    user,
  })
})

authRouter.get("/getme",async(req,res)=>{
  const token = req.cookies.token

  const decoded = jwt.verify(token,process.env.JWT_SECRET)
  
  const user = await userModel.findById(decoded.id)

  res.json({
    name: user.name,
    email: user.email,
  })
})
module.exports = authRouter;
