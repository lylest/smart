const express = require('express')
const { allLifeExpectancy,importCSV,searchFilter,countryGreater,getSpecificCountry} = require('../controllers/lifeControllers')

const router = express.Router()

//GET all life expectancy data
router.get('/',allLifeExpectancy)

//Import CSV data
router.post('/import',importCSV)

//Search with filter
router.get('/search',searchFilter)

//Search with filter
router.get('/filter',countryGreater)

//get speceific country
router.get('/country/:id',getSpecificCountry)



module.exports = router