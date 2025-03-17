const Order = require('../models/Order');
const User = require('../models/User');

const getAllOrder = async (req, res) => {
  const data = await Order.find();
  res.send(data);
};

const getOrderDetailById = async (req,res)=>{
  const data = await Order.findById(req.params.id);
  res.send(data);
};

const createOrder = async (req, res) => {
  const data = await Order.create(req.body);
  res.send(data);
};

const updateOrder = async (req, res) => {
  const data = await Order.findByIdAndUpdate(req.params.id, req.body);
  res.send(data);
};

const deleteOrder = async (req, res) => {
  const data = await Order.findByIdAndDelete(req.params.id);
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


module.exports = { getAllOrder, getOrderDetailById, createOrder, updateOrder, deleteOrder, userValidation };