const asyncHandler = require("express-async-handler");

const {createError} = require("../createError");
let Form = require("../models/formModel");
let path = require('path')
let fs = require('fs');
const { response } = require("express");




module.exports = {

    // submit form

  submitForm: asyncHandler(async (req, res, next) => {
const data = req.body
    const saveData = new Form({
      fullname: data.fullname,
      tables: data.tables,
      gst: data.gst, 
      phonenumber: data.phonenumber,
      image:req.file.filename

    });
    saveData.save()
    .then((response) => res.status(200).json({formid: response._id}))
    .catch((err) => { 
      console.log(err)
      return next(createError(500,'image not uploaded'))})
  }),

//   submit form end

// get table count 

getTableCount: asyncHandler(async (req, res, next) => {
  try{
    let tables = await Form.findOne({_id:req.params.id})
    res.status(200).json({count:tables.tables})
  }catch(err) {
    return next(createError(404, 'data not found'))
  }
  
}),


// get form data

getFormData: asyncHandler(async (req, res, next) => {
  try{
    let data = await Form .findOne({_id: req.params.id})
    res.status(200).json({data})
  }catch(err) {
    return next(createError(404, 'data not found'))
  }
})


}
