const express = require('express')
const bodyParser = require('body-parser');
const mySql = require("mysql");
var path = require("path");
const fs = require('fs')


const PORT = 3670
const app = express()
const HOST = '10.0.0.145';



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// create connection with mydb in mysql
const pool = mySql.createPool({
  connectionLimit: 100,
  database: "mydb",
  host: "10.0.0.145",
  user: "root",
  password: "12345"
})



// display items page
app.get('/', (req, res) => {
  res.redirect("/search.html");
})



app.get('/', (req, res) => {

  pool.getConnection((err, connection) => {

    if (err) throw err;

    console.log("CONNECTED")
  })
})



// items.html
// Add item to mysql
app.post('/items', (req, res) => {

  const dataForm = req.body;

  var id = req.body.id;
  var name = req.body.name;
  var quantity = req.body.quantity;
  var units = req.body.units;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("CONNECTION ESTABLISHED")

    connection.query('INSERT INTO inventory SET ?', dataForm, (err, rows) => {
      connection.release();

      if (err) {
        console.log(err);
      }
    })
  })
})




// used in search.html
// get all the rows from inventory 
app.get('/getinventory', (req, res) => {

  console.log("CONNECTED");

  pool.getConnection((err, connection) => {

    if (err) throw err;
    console.log("CONNECTION ESTABLISHED");

    connection.query('SELECT * FROM inventory', (err, rows) => {
      connection.release();

      if (!err) {
        res.send({ rows });
      }
      else {
        console.log(err);
      }
    })
  })
})




// pull all data from the expenses table
app.get("/getexpensedata", (req, res) => {

  pool.getConnection((err, connection) => {

    if (err) throw err;

    connection.query("SELECT * FROM expenses", (err, rows) => {
      connection.release();

      if (!err) {
        res.send({ rows });
      }
      else {
        console.log(err);
      }
    })
  })
})




app.use('/', express.static(__dirname));

app.listen(PORT, () => { console.log(`Server running on port: ${PORT}`) });