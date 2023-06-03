// get express
const express = require('express');
const app = express();
const port = 8000;

// ejs
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// mariaDB connect
const maria = require('../maria')
maria.connect();

app.get('/', (req, res) => {
	res.send('Hello World')
});

app.get('/mariaDB', (req, res) ->{
	maria.query('select * from')


app.listen(port, () => {
	console.log('8000!');
});
