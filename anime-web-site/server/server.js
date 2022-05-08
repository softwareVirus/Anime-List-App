const express = require("express");
const app = express();
const moongose = require('mongoose');
const userRouters = require('./routes/record.js')
const axios = require('axios')
const cors = require('cors')
require("dotenv").config();

app.use(cors())
app.use(express.json())
app.use('/u',userRouters)

app.listen(5000,() => {
  moongose.connect(process.env.ATLAS_URI)
    .then(() => console.log('connected to DATABASE'))
    .catch(err => console.log(err))
})


