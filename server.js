const express = require('express')
const bodyParser = require('body-parser');
const mySql = require("mysql");
var path = require("path");
const fs = require('fs')


const PORT = 3701
const app = express()
const HOST = '174.2.74.56';



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// create connection with mydb in mysql
const pool = mySql.createPool({
  connectionLimit: 100,
  database: "mydb",
  host: "174.2.74.56",
  user: "root",
  password: "cmpt370pass"
})



// display items page
app.get('/', (req, res) => {
  res.redirect("/all.html");
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







// signoff.html
// update mysql for used value
app.post('/signoff', (req, res) => {

  const dataForm = req.body;

  var id = req.body.id;
  let take_out_number = req.body.take_out_number;
  let user = req.body.user;
  var used = req.body.used;

  console.log(id)
  console.log(take_out_number)
  console.log(used)


  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("CONNECTION ESTABLISHED")

    // updates inventory table quantity
    var inv = 'UPDATE inventory SET quantity = quantity - ' + take_out_number + ' WHERE id=' + id;
    connection.query(inv, dataForm, (err, rows) => {

      if (err) {
        console.log(err);
      }
    })

    // gets updated row and fills required fields for consumption table
    var r = 'SELECT * FROM inventory WHERE id=' + id;
    connection.query(r, function (err, result, fields) {

      var row = result[0];

      const d = new Date();
      var date = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

      // adds row to consumption table
      var con = 'INSERT INTO consumption SET ?';
      data = { 'Item ID': row.id, 'Item Name': row.name, 'Room': row.room, 'Quantity Removed': take_out_number, 'Quantity Left': row.quantity, 'Units': row.units, 'Cost': row.cost * take_out_number, 'Date Removed': date, 'User ID': user };
      connection.query(con, data, (err, rows) => {

        if (err) {
          console.log(err);
        }
      })

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


// order





// sort.html 
// get rows in ascending or descending order
app.get('/getsort:id', (req, res) => {


  console.log("CONNECTED");

  pool.getConnection((err, connection) => {


    var sort_by = req.params.id;
    var a = sort_by.slice(3);
    console.log(a)
    var querya = 'SELECT * FROM inventory ORDER BY ' + a + '';
    console.log(querya);

    if (err) throw err;
    console.log("CONNECTION ESTABLISHED");

    connection.query(querya, (err, rows) => {
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



// pull all data from the consumption table
app.get("/getusage", (req, res) => {

  pool.getConnection((err, connection) => {

    if (err) throw err;

    connection.query("SELECT * FROM consumption", (err, rows) => {

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