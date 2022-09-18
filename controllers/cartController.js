const fs = require("fs");
const crypto = require("crypto");
const Cart = require("../models/Cart");
const catchAsync = require("../utils/catchAsync");

exports.getAllCarts = catchAsync(async (req, res) => {
  const carts = await Cart.find();
  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: carts.length,
    data: {
      carts,
    },
  });
});

exports.addCart = catchAsync(async (req, res) => {
    const newCart = await Cart.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        product: newCart,
      },
    });
  });
  
exports.deleteCartById = catchAsync(async(req,res) => {
    let deletedItem = await Cart.findByIdAndDelete(req.params.id);
    if(deletedItem){
        res.status(200).json({
        status: "Cart Deleted",
        data:{
          product: deletedItem
        }
      });
    }else{
        res.status(404).json({
            status: "Cart Not Found",
          });
    }
 })
 //Shopping cart with the id
 exports.payCartById = catchAsync(async (req,res) => {
    let found = await Cart.findByIdAndUpdate(req.params.id,{
        $set:{
            status:"PAID"
        }
    }
    ,{new:true});
                
    const carts = await Cart.find();
    if(found){
        res.status(200).json({
        status: "success",
        results: carts.length,
        data:{
          product: carts
        }
      });
    } else {
      res.status(404).json({
        status: "Cart Not Found",
      });
    }
    })
    //Cambio de estatus a Paid para todos los shopping carts que tengan estado PENDING a PAID en 
    //esto deberi cambiar el unico carrito que seria el ultimo creado
    exports.payCart = catchAsync(async (req,res) => {
        let valores = await Cart.find({status:"PENDING"});
        let found;
        for(let i=0;i<valores.length;i++){
            console.log(valores[i]._id)
            found = await Cart.findByIdAndUpdate(valores[i]._id,{
                $set:{
                    status:"PAID"
                }
            }
            ,{new:true});
        }                    
        const carts = await Cart.find();
        if(found){
            res.status(200).json({
            status: "success",
            results: carts.length,
            data:{
              product: carts
            }
          });
        } else {
          res.status(404).json({
            status: "Cart Not Found",
          });
        }
        })