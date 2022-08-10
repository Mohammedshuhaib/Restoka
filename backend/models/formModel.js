const mongoose = require('mongoose')

let Schema = mongoose.Schema

const formSchema = new Schema({
    fullname:{type:String, required:true},
    tables:{type:Number,required:true},
    gst:{type:Number, required: true},
    phonenumber:{type:Number, required: true},
    image:{type:String},
},{collection:'formData'})


let model = mongoose.model('formData', formSchema)

module.exports = model