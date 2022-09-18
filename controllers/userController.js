const fs = require("fs");
const crypto = require("crypto");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
});


exports.addUser = catchAsync(async (req, res) => {
  req.body.password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  let newUser = await User.create(req.body);
  newUser = newUser.toObject();
  delete newUser.password;

  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
exports.getUserById=catchAsync(async(req, res )=>{
    let found= await User.findById(req.params.id);
    if(found){
        res.status(200).json({
          status:"User Found",
          data:{
            user:found,
          }
        })
    }else{
      res.status(400).json({
        status:"User not Found"
      })
    }
  });
exports.updateUser= catchAsync(async(req,res)=>{
  req.body.password = crypto
  .createHash("sha256")
  .update(req.body.password)
  .digest("hex");
  let userFound= await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  if(userFound){
    res.status(200).json({
      status:"User Found",
      data:{
        user:userFound,
      }
    })
  }else{
  res.status(400).json({
    status:"User not Found"
  })
}
})
exports.deleteUser= catchAsync(async(req,res)=>{
  let userFound= await User.findByIdAndRemove(req.params.id);
  if(userFound){
    res.status(200).json({
      status:"User Deleted",
      data:{
        user:userFound,
      }
    })
  }else{
  res.status(400).json({
    status:"User not Found"
  })
}
})
