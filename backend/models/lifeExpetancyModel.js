const mongoose = require('mongoose')

const Schema =  mongoose.Schema

const lifeExpetancyModel = new Schema({
             indicatorName: { type: String, required: true},
             countryName:{ type: String, required: true},
             countryCode:{ type: String, required: true},
             average:    { type: Number, required: true},
             years:      {type: Array, required: true},
             values:     {type:Array, required: true,},
           
},{timestamps: true})

module.exports = mongoose.model("life",lifeExpetancyModel)