/* get express */
const express = require('express');
const app = express();
const port = 8000;
const moment = require('moment')

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
app.get('/mainpage/list', (req, res) => {
	res.render('mainpage');
});

/* show post list */
/* Offset Pagination */
app.get('/products/:page', (req, res) => {
	const page_size = 3; // 각 페이지의 최대 항목 수
	const page = req.params.page || 1 // if page is null then 1, 현재 페이지 번호
	console.log(page);

	const sql = 'SELECT * FROM 게시글';
	maria.query(sql, (err, rows, fields) => {
		for(let i=0; i<rows.length; i++){
			console.log('rows'+JSON.stringify(rows[i]));
			rows[i].작성일자 = moment(rows[i].작성일자).format('YYYY-MM-DD');
		}
		console.log("rows: "+rows[1].date);
		if (err) cosole.log('query is not excuted. select fail...\n' + err);
		else res.render('mainpage.ejs', {list:rows});
	});
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
		else res.redirect('/mainpage/list')
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
