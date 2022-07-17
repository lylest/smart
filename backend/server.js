require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const lifeRoutes = require('./routes/lifeRoutes')

const app = express();

// middleware
app.use(cors());
app.use(express.json())
app.use((req, res, next) => {
       console.log(req.path, req.method)
       next()
})

app.use('/api/life',lifeRoutes)

//connect to the database
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            //listen for requests
            app.listen(process.env.PORT,()=>{
                console.log('connecting to the db & listening on this port  number',process.env.PORT);
            })
        })
    .catch((err) => {console.log(err,'from database')})