const life = require('../models/lifeExpetancyModel')
const csv=require('csvtojson')
const csvfilepath = './csv/test.csv'

//get all life expectancy data
const allLifeExpectancy = async (req,res) => {

       const limit  = req.query.limit
       const allLifeExpectancyData = await life.find({}).sort({countryName: 1}).limit(limit)

       if(allLifeExpectancyData.length > 0) {
           res.status(200).json(allLifeExpectancyData)
       } else {
           res.status(200).json(allLifeExpectancyData)
       }
}


//import life expectancy data from CSV file and add them to data base
const importCSV = async (req, res) => {
      try {
        const lifeDataFromCSV = await csv().fromFile(csvfilepath)
              var newArry = []
              lifeDataFromCSV.map((data) =>{
                      newArry.push({
                              years:Object.keys(data),
                              values:Object.values(data),
                              average:0,
                              countryName: data["Country Name"],
                              indicatorName: data["Indicator Name"],
                              countryCode: data["Country Code"]
                      })
              })
              
              newArry.forEach(arry=>{
                      arry.years.splice(31,3)
                      arry.values.splice(31,3)
                      arry.values = arry.values.map(x=>Number(x))
                      arry.average = arry.values.reduce((a, b) => a + b, 0) / arry.values.length
             })
            
                response = await life.insertMany(newArry)
                res.status(200).json(response)

      } catch (error) {
          console.log(error,'error')
          
      }
}

//search filter 
const searchFilter = async (req, res) => {
        const {filterType,keyword} = req.query
        var results
         if(filterType === 'countryName') {
                results = await life.find({"countryName":{$regex:keyword,$options:"i"}}).limit(40)
         } 
         if(filterType === 'countryCode'){
                results = await life.find({"countryCode":{$regex:keyword,$options:"i"}}).limit(40)
         }
        res.status(200).json(results)                
        
}

//greater
const countryGreater = async (req, res) => {
     var criteria = req.query.criteria
     var response;
     console.log(criteria)
     if(criteria === "highest") {
        response = await life.find({average:{$gt:79}}).sort({average: -1}).limit(30)
     } 

     if(criteria === "lowest") {
        response = await life.find({average:{$lt:59}}).sort({average: -1}).limit(30)
     }

     res.status(200).json(response)
}

//Single country
const getSpecificCountry = async (req,res) =>{
       const {id} = req.params
       const response = await life.find({_id:id}).limit(1)
       res.status(200).json(response)
}


module.exports= {
     allLifeExpectancy,
     importCSV,
     searchFilter,
     countryGreater,
     getSpecificCountry
}