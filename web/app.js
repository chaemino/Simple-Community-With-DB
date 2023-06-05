/* get express */
const express = require('express');
const app = express();
const port = 8000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

/* ejs */
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

/* mariaDB connect */
const maria = require('../maria/maria.js')
//maria.connect();

app.get('/', (req, res) => {
	res.send('Hello World')
});

/* view all posts page render*/
app.get('/mainpage', (req, res) => {
	res.render('mainpage');
});

/* write post page*/
app.get('/write', (req, res) => {
	res.render('write-page');
});

/* click write button */
app.post('/writeOk', (req, res) => {
	const body = req.body;
	console.log(body);

	const sql = "INSERT INTO 게시글(작성자, 제목, 내용, 작성일자, 비밀번호) VALUES(?,?,?,now(),?)";
	const params = [body.username, body.title, body.content, body.password];
	console.log(sql);
	console.log(params);

	maria.query(sql, params, (err) => {
		if(err) throw err;
		else res.redirect('/mainpage')
	});
});

app.get('/mariaDB', (req, res) =>{
	maria.query('select * from 게시글', (err, rows, fields) => {
		if (err) throw err;
		console.log(rows);
		console.log(fields);
	});
	res.send('Connect DB')
});

app.listen(port, () => {
	console.log('8000!');
});
