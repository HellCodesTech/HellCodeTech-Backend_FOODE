
const Vendor=require('../models/Vendor');
const jwt=require('jsonwebtoken');
const bc=require('bcryptjs')
const dotEnv1=require('dotenv')

dotEnv1.config();
const secretkey=process.env.WhatIsYourName;


const vendorRegister=async(req,res)=>{
   const{username,email,password}=req.body;

    try {
       const vendorEmail=await Vendor.findOne({email})
       if(vendorEmail)
       {
        return res.status(400).json('Email alreay teken');

       }
       const hashedPassword=await bc.hash(password,10);

       const newVendor=new Vendor({
        username,email,password:hashedPassword
       });
       await newVendor.save();
       res.status(201).json('user reigister succussfully...!')
       console.log('registered:')
    } catch (error) {
      console.error(error);
       res.status(500).json({error:"Internal servar error"}) 
    }
}

//vendor login

const vendorLogin=async(req,res)=>{
   const{email,password}=req.body;
   try {
      const vendor=await Vendor.findOne({email})
       if(!vendor || !(await bc.compare(password,vendor.password)))
       {
          return res.status(401).json('Invalid username or password!')
       }
     const token=jwt.sign({vendorId:vendor._id},secretkey,{expiresIn:"1h"})
   
       res.status(200).json({succuss:"login succussfully",token})
       console.log(email,"this is token",token)
   } catch (error) {
      res.status(404).json(error)
   }
}


//get vendors
const getAllVendors=async(req,res)=>
{
   try {
      const vendor=await Vendor.find().populate('firm');
      res.json(vendor);
   } catch (error) {
      console.error(error);
      res.status(500).json({error:"internal server error"})
      
   }
}

const getVendorById=async(req,res)=>{
   
   const vendorId=req.params.id;
   try {
      const vendor=await Vendor.findById(vendorId).populate('firm')
      if(!vendor)
      {
      return res.status(400).json({error:"vendor not found"})
      }
      res.status(200).json(vendor)
   } catch (error) {
      console.log(error)
      res.status(500).json("Internal server error")
   }
}
//exports

module.exports ={vendorRegister,vendorLogin,getAllVendors,getVendorById}