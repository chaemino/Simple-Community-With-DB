const maria = require('mysql');

//connect mariaDB
const conn = maria.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '1234',
	database: 'my_community',
	multipleStatements: true
});

//create Table 
conn.connect((err) => {
	if (err) throw err;
	
	console.log("Connected");
	
	const asql = "CREATE TABLE IF NOT EXISTS 게시글"+
		"(게시글ID int NOT NULL AUTO_INCREMENT,"+
		"작성자 varchar(20) NOT NULL,"+
		"제목 varchar(50) NOT NULL,"+
		"내용 varchar(1000) NOT NULL,"+
		"작성일자 DATETIME NOT NULL,"+
		"비밀번호 char(4) NOT NULL,"+
		"PRIMARY KEY(게시글ID))";
	conn.query(asql, (err, result) => {
		if (err) throw err;
		console.log(result, "Table created");
	});

	const bsql = "CREATE TABLE IF NOT EXISTS 댓글"+
		"(댓글ID int NOT NULL AUTO_INCREMENT,"+
		"게시글ID int NOT NULL,"+
		"작성자 varchar(20) NOT NULL,"+
		"내용 varchar(500) NOT NULL,"+
		"PRIMARY KEY(댓글ID),"+
		"FOREIGN KEY(게시글ID) REFERENCES 게시글(게시글ID))";
	conn.query(bsql, (err, result) => {
		if (err) throw err;
		console.log(result, "Table created");
	});
});

module.exports = conn;
