const express = require('express')
const bodyParser = require('body-parser');
const mySql = require("mysql");
var path = require("path");
const fs = require('fs')


const PORT = 3650
const app = express()
const HOST = '127.0.0.1';



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// create connection with mydb in mysql
const pool = mySql.createPool({
  connectionLimit: 100,
  database: "mydb",
  host: "localhost",
  user: "root",
  password: "12345"
})



// display items page
app.get('/', (req, res) => {
  res.redirect("/items.html");
})



app.get('/', (req,res) => {

  pool.getConnection((err, connection) => {

    if (err) throw err;

    console.log("CONNECTED")
  })
})


// items.html
// Add item to mysql
app.post('/items', (req, res)=> {
   console.log("Get ready for posting");

   const dataForm = req.body;
   console.log(req.body);

   var id = req.body.id;
   var name = req.body.name;
   var quantity = req.body.quantity;
   var units = req.body.units;

   console.log(id)
   console.log(name)
   console.log(quantity)
   console.log(units)


   pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("CONNECTION ESTABLISHED")

    connection.query('INSERT INTO inventory SET ?', dataForm, (err, rows) => {
        connection.release();

        if (err) {
            console.log(err);
        }
    })
}) }) 

  


app.use('/', express.static(__dirname));

app.listen(PORT, () => { console.log(`Server running on port: ${PORT}`) });