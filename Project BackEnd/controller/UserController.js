const User = require("../models/User");


const getAllUsers = async (req, res) => {
  const data = await User.find();
  res.send(data);
};
const getUserById = async (req,res)=>{
  const data = await User.findById(req.params.id);
  res.send(data);
};

const createUser = async (req,res)=>{
  const data = await User.create(req.body);
  res.send(data);
};

const updateUserById = async (req,res)=>{
  const data = await User.findByIdAndUpdate(req.params.id,req.body);
  res.send(data);
};

const deleteUserById = async (req,res)=>{
  const data = await User.findByIdAndDelete(req.params.id);
  res.send(data);
};

const userValidation = async(req, res)=>{
  const data = await User.findOne({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
  });

  if(data){
      
      var token = jwt.sign({...data}, process.env.jwtSecret);
      const ans = {
          isValid: true,
          msg: "Login Successful",
          data: data,
          token: token
      };
      res.send(ans);
  }
  else{
      
      const data = {
          isValid: false,
          msg: "email/password does not match"
      }
      res.send(data);
  }
}

module.exports = { getAllUsers, getUserById, createUser, updateUserById, deleteUserById, userValidation};