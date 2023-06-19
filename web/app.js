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
	res.redirect('/mainpage/1')
});

/* show post list */
/* Offset Pagination */
app.get('/mainpage/:page', (req, res) => {
	const page = (Number(req.params.page)-1)*3;
	var size = page+2;
	var total_size = 0;

	console.log("page:"+page)
	console.log("size:"+size)
	
	const sql1 = `SELECT COUNT(*) as count FROM 게시글;`;
	maria.query(sql1, (err, row, fields) =>{
		if (err) console.log("select count query error\n"+err);
		if (size >= row[0]) size = row[0]; 
		total_size = (row[0].count/3)+1;
	});

	const sql2 = `SELECT * FROM 게시글 ORDER BY 게시글ID DESC LIMIT ${page}, 3`;
	maria.query(sql2, (err, rows, fields) => {
		for(let i=0; i<rows.length; i++){
			rows[i].작성일자 = moment(rows[i].작성일자).format('YYYY-MM-DD');
		}
		if (err) console.log('query is not excuted. select fail...\n' + err);
		else res.render('mainpage.ejs', {list:rows, total:total_size});
	});
});

/*detail page*/
app.get('/post/:postID', (req, res) => {
	const postID = req.params.postID;
	console.log("post detail page") // check enter this page

	const sql1 = `SELECT * FROM 게시글 WHERE 게시글ID=${postID};`;
	const sql2 = `SELECT * FROM 댓글 WHERE 게시글ID=${postID};`;	
	maria.query(sql1+sql2, (err, results, field) => {
		const sql1_result = results[0];
		const sql2_result = results[1];
		sql1_result[0].작성일자 = moment(sql1_result[0].작성일자).format('YYYY-MM-DD');
		for(let i=0; i<sql2_result.length; i++){
			sql2_result[i].작성일자 = moment(sql2_result[i].작성일자).format('YYYY-MM-DD HH:MM:SS');
		}
		if(err) console.log("query is not excuted.\n"+err);
		else res.render("detail-page.ejs", {row1:sql1_result[0], row2:sql2_result});
	});
});

/*delete post*/
app.get('/post/delete/:postID', (req, res) =>{
	const postID = req.params.postID;
	console.log(postID)

	const sql = `DELETE FROM 게시글 WHERE 게시글ID=${postID}`;
	maria.query(sql, (err, rows, fields) => {
		if(err) console.log("query is not excuted.\n"+err);
		else res.redirect('/');
	});
});

/*comment*/
app.post('/post/comment/:postID', (req, res) => {
	const postID = req.params.postID;
	const body = req.body;
	console.log(body);

	const sql = "INSERT INTO 댓글(게시글ID, 작성자, 내용, 작성일자) VALUES(?,?,?,now())";
	const params = [postID, body.writer, body.commentText];
	console.log(sql);
	console.log(params);

	maria.query(sql, params, (err) => {
		if(err) console.log("query is not excuted.\n"+err);
		else res.redirect('/post/'+postID);
	});
});

/*delete comment*/
app.post('/comment/delete/:commentID/:postID', (req, res) =>{
	const cID = req.params.commentID;
	const pID = req.params.postID;
	console.log(cID);
	console.log(pID);

	const sql = `DELETE FROM 댓글 WHERE 댓글ID=${cID}`;
    maria.query(sql, (err, rows, fields) => {
		console.log(rows);
        if(err) console.log("query is not excuted.\n"+err);
		else res.redirect('/post/'+pID);
     });
});

/* write post page*/
app.get('/new-post/write', (req, res) => {
	res.render('write-page');
});

/* click write button */
app.post('/new-post/writeOk', (req, res) => {
	const body = req.body;
	console.log(body);

	const sql = "INSERT INTO 게시글(작성자, 제목, 내용, 작성일자, 비밀번호) VALUES(?,?,?,now(),?)";
	const params = [body.username, body.title, body.content, body.password];
	console.log(sql);
	console.log(params);

	maria.query(sql, params, (err) => {
		if(err) throw err;
		else res.redirect('/')
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
