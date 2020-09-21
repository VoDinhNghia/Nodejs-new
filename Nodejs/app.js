const express = require('express');
const app = express();
const { render } = require('ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static('./module'));
app.set('views', './views'); // Thư mục views nằm cùng cấp với file app.js
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
//var bcrypt = require('bcrypt');
var session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
var connection = require('express-myconnection');
const mysql = require('mysql');
app.use(
    connection(mysql, {
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'nodejs'
    }, 'request')
);
var sql = require('./module/Conn_sql');
app.get('/', function (req, res) {
    res.render('login');
});
app.get('/index', sql.list);
app.post('/search', sql.search);
app.get('/post', function (req, res) {
    res.render('post')
});
app.post('/post-list', sql.post_list);
app.post('/login-sucsses', sql.login);
app.get('/register', function (req, res) {
    res.render('register');
});
app.post('/register-susces', sql.register);
app.post('/delPost', sql.delPost);
app.get("/test/:id", sql.test);

//error: page not found 404/
app.use((req, res, next) => {
    let err = new Error('Page not found.');
    err.status = 404;
    next(err);
});
//handling error
app.use((err, req, res, next) => {
    res.status(err.status | 500);
    res.send(err.message);
});
const server = app.listen(8000, function () {
    const host = server.address().port;
    console.log("Server on port: " + host);
});
