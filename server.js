const express = require('express')
const mySql = require("mysql");
const bodyParser = require("body-parser");
const fs = require('fs')


var path = require("path")


const PORT = 3100
const app = express()
const HOST = '0.0.0.0';



const pool = mySql.createPool({
  connectionLimit: 100,
  database: "sakila",
  host: "localhost",
  user: "root",
  password: "12345"
})





app.get('/', (req,res) => {

  pool.getConnection((err, connection) => {

    if (err) throw err;
    console.log("CONNECTED")
  })
})



app.listen(PORT, () => {}) 