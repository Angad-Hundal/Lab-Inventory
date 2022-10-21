const express = require('express')
var path = require("path")

const app = express()
const port = 3100

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile)

app.get('/', (req, res) => {
  
    res.render('home.html')
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})