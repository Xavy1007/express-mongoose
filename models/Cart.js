const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    required: true,
    default:'PENDING'
  },
  products:[
    {
        id:{
            type:String,
            rquire:true
        },
        price:{
            type:Number,
            required: [true, "price is required"],
        },
        amount:{
            type:Number,
            required: [true, "price is required"],
        },
        _id:false
    }
  ]
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
