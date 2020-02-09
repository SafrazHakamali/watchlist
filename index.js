//basic bolierplate setup//
const pg = require('pg');
const config = {
user: 'safraz',
host: '127.0.0.1',
database: 'safraz',
port: 5432,
};
const pool = new pg.Pool(config);
pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});
const express = require('express');
const app = express();
app.use(express.static(__dirname+'/public/'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
const methodOverride = require('method-override')
app.use(methodOverride('_method'));
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
const cookie = require('cookie-parser');
app.use(cookie());
var hash = require('js-sha256');
const salt = "salt";

// Register & Login CRUD //
app.post('/1loggedinmovies', (request, response) => {
	let textreg = 'INSERT INTO users (name,password) VALUES ($1,$2)';
	const valuereg = [request.body.name,hash(request.body.name+request.body.password+salt)];
	pool.query (textreg,valuereg,(err,result)=>{});
	response.cookie('name',valuereg[0]);
	response.cookie('hash',valuereg[1]);
	let text = 'INSERT INTO movielist (title,year,review) VALUES ($1,$2,$3)';
	const value = [request.body.title,request.body.year,request.body.review];
	let queryString = `SELECT * FROM movielist`;
	pool.query (queryString,(err2,result2)=>{
		const array = [];
		const movieTitles = [];
		const movieids = [];
		for (i=0;i<result2.rows.length;i++) {
			item = {};
			item.title = result2.rows[i].title;
			item.id = parseInt(result2.rows[i].id);
			item.image = result2.rows[i].image;
			array.push(item);
		};
		const data2 = {item:array};
		console.log(data2);
		response.render("index",data2);
	});
});

app.post('/loggedinmovies', (request, response) => {
	let textLogin = 'SELECT * FROM users WHERE name = $1'
	const nameValue = [request.body.name];
	const hashPassword = hash(request.body.name+request.body.password+salt);
	pool.query (textLogin,nameValue,(err,result)=>{
		if (err) {
			console.log('PSQL error - ',err);
		};
		if(result.rows[0].password == hashPassword) {
			response.cookie('name',nameValue[0]);
			response.cookie('hash',hashPassword);
			let queryString = `SELECT * FROM movielist`;
			pool.query (queryString,(err2,result2)=>{
				const array = [];
				const movieTitles = [];
				const movieids = [];
				for (i=0;i<result2.rows.length;i++) {
					item = {};
					item.title = result2.rows[i].title;
					item.id = parseInt(result2.rows[i].id);
					item.image = result2.rows[i].image;
					array.push(item);
				};
				const data2 = {item:array};
				console.log(data2);
				response.render("index",data2);
			});
		} else {
			response.render("tryagainlogin");
		};
	});
});


//Watchlist CRUD//
app.post('/movieswl',(request,response)=> {
	let username = request.cookies.name;
	let userhash = request.cookies.hash;
	let textUserCheck = 'SELECT * FROM users WHERE name = $1'
	let valueUserCheck = [username];
	pool.query(textUserCheck,valueUserCheck,(err, result)=> {
		let textwl = 'INSERT INTO watchlist (userid, movieid) VALUES ($1,$2)';
		let valuewl = [result.rows[0].id,parseInt(request.body.id)];
		pool.query(textwl,valuewl,(err2,result2)=>{
			if(err) {
				console.log(err);
			};
		});
	});
	let queryString = `SELECT * FROM movielist`;
	pool.query (queryString,(err2,result2)=>{
		const array = [];
		const movieTitles = [];
		const movieids = [];
		for (i=0;i<result2.rows.length;i++) {
			item = {};
			item.title = result2.rows[i].title;
			item.id = parseInt(result2.rows[i].id);
			item.image = result2.rows[i].image;
			array.push(item);
		};
		const data2 = {item:array};
		console.log(data2);
		response.render("index",data2);
	});
});

//Movie CRUD//
app.post('/movies', (request, response) => {
	let text = 'INSERT INTO movielist (title,year,review) VALUES ($1,$2,$3)';
	const value = [request.body.title,request.body.year,request.body.review];
	pool.query (text,value,(err,result)=>{});
	let queryString = `SELECT title FROM movielist`;
	pool.query (queryString,(err,result)=>{
		const movieTitles = [];
		for (i=0;i<result.rows.length;i++) {
			movieTitles.push(result.rows[i].title)
		};
		//movieTitles.push(request.body.title);
		const data = {titles: movieTitles};
		response.render("index",data);
	});
});

app.put('/movies/:id', (request, response) => {
	let text = `UPDATE movielist SET title=$1, year=$2, review=$3 WHERE id=$4`;
    const value = [request.body.title,request.body.year,request.body.review,parseInt(request.params.id)];
    pool.query (text,value,(err,result)=>{
    	if(err) {
    		console.log("PUT SQL ERROR - ",err);
    	};
    });
   	let data = {title: value[0], year: value[1], review: value[2]};
    response.render("show", data);
});

app.delete('/movies/:id', (request, response) => {
	let text = `DELETE FROM movielist WHERE id=$1`;
    const value = [parseInt(request.params.id)];
    pool.query (text,value,(err,result)=>{
    	if(err) {
    		console.log("DELETE SQL ERROR - ",err);
    	};
    });
   	let data = {};
    response.render("show", data);
});

// Gets //
// - index - //
app.get("/movies", (request,response)=>{
	let text = `SELECT * FROM movielist`;
	pool.query (text,(err2,result2)=>{
			const array = [];
			const movieTitles = [];
			const movieids = [];
			for (i=0;i<result2.rows.length;i++) {
				item = {};
				item.title = result2.rows[i].title;
				item.id = parseInt(result2.rows[i].id);
				item.image = result2.rows[i].image;
				array.push(item);
			};
			const data2 = {item:array};
			console.log(data2);
			response.render("index",data2);
		});
});


// - index - //
app.get("/watchlist", (request,response)=>{
	let username = request.cookies.name;
	let userhash = request.cookies.hash;
	let textUserCheck = 'SELECT * FROM users WHERE name = $1'
	let valueUserCheck = [username];
	pool.query(textUserCheck,valueUserCheck,(err, result)=> {
		console.log(result.rows[0].id);
		let text = `SELECT * FROM movielist INNER JOIN watchlist ON (movielist.id=watchlist.movieid) WHERE watchlist.userid = $1`;
		let value = [parseInt(result.rows[0].id)];
		pool.query (text,value,(err2,result2)=>{
			const array = [];
			const movieTitles = [];
			const movieids = [];
			for (i=0;i<result2.rows.length;i++) {
				item = {};
				item.title = result2.rows[i].title;
				item.id = parseInt(result2.rows[i].movieid);
				item.image = result2.rows[i].image;
				array.push(item);
			};
			const data2 = {item:array};
			console.log(data2);
			response.render("watchlist",data2);
		});
	});
});

// - new - //
app.get("/movies/new", (request,response)=>{
	response.render("new");
});
// - show - //
app.get("/movies/:id", (request,response)=>{
    let text = `SELECT * FROM movielist WHERE id = $1`;
    const value = [parseInt(request.params.id)];
	pool.query (text,value,(err,result)=>{
    	let data = {id: value[0],title: result.rows[0].title, year: result.rows[0].year, review: result.rows[0].review, image:result.rows[0].image};    
    	response.render("show", data);
	});
});
// - edit - //
app.get("/movies/:id/edit", (request,response)=>{
	let text = `SELECT * FROM movielist WHERE id = $1`;
    const value = [parseInt(request.params.id)];
	pool.query (text,value,(err,result)=>{
    	let data = {id: value[0], title: result.rows[0].title, year: result.rows[0].year, review: result.rows[0].review};    
		response.render("edit",data);
	});
});

app.get("/movies/:id/delete",(request,response)=>{
	let text = `SELECT * FROM movielist WHERE id = $1`;
    const value = [parseInt(request.params.id)];
	pool.query (text,value,(err,result)=>{
    	let data = {id: value[0], title: result.rows[0].title, year: result.rows[0].year, review: result.rows[0].review};    
		response.render("delete",data);
	});
});

app.get("/register",(request,response)=> {
	response.render("register");
});

app.get("/login",(request,response)=> {
	response.render("login");
});

app.get("/",(request,response)=> {
	response.render("start");
});

// boilerplate for listening and ending the program
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
let onClose = function(){
  console.log("closing");
  server.close(() => {
    console.log('Process terminated');
    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);