
exports.list = function (req, res) {
    req.getConnection(function (err, connect) {
        var query = connect.query('SELECT * FROM nhatki', function (err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
            }
            res.render('index',
                { page_title: "Test Table", data: rows }
            );
        });
    });
};
exports.search = function (req, res) {
    let body = req.body;
    var a = req.body.q;
    console.log(a);
    req.getConnection(function (err, connect) {
        let sql_search = 'SELECT * FROM nhatki WHERE ID = 2';
        var query = connect.query(sql_search, function (err, rows) {
            if (err) {
                //console.log("Error Selecting : %s ", err);
                console.log("error");
            }
            res.render('index',
                { page_title: "Test Table", data: rows }
            );
        });
    });
}
exports.login = function (req, res) {
    let body = req.body;
    var username = req.body.Username;
    var password = req.body.Password;
    req.getConnection(function (err, connect) {
        if (username && password) {
            connect.query('SELECT * FROM dangki WHERE email = ? OR name=? AND pass = ?', [username, username, password], function (error, results, fields) {
                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.redirect('/index');
                } else {
                    res.send('Tên mật khẩu hoặc đang nhập không đúng vui lòng nhập lại');
                }
                res.end();
            });
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    });
}
exports.register = function (req, res) {
    let body = req.body;
    var username = req.body.Username;
    //var password = bcrypt.hashSync(req.body.Password, 8);
    var password = req.body.Password;
    var email = req.body.Email;
    var mobile = req.body.Mobile;
    req.getConnection(function (err, connect) {
        if (username && password && email && mobile) {
            connect.query('INSERT INTO dangki(name, pass, email, mobile) VALUES (?,?,?,?)', [username, password, email, mobile]);
            res.redirect('/');
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    });
}
exports.post_list = function (req, res) {
    let body = req.body;
    var title = req.body.title;
    var contend = req.body.contend;
    req.getConnection(function (err, connect) {
        if (title && contend) {
            connect.query('INSERT INTO nhatki(title, Ngay, contend) VALUES (?,curdate(),?)', [title, contend]);
            res.redirect('/index');
        } else {
            res.send('Please enter contend!');
            res.end();
        }
    });
}
//module.exports = { list }