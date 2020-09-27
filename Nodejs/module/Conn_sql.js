
exports.login = function (req, res) {
    let body = req.body;
    var username = req.body.Username;
    var password = req.body.Password;
    var password = require('crypto').createHash('md5').update(password).digest('hex').toString();
    req.getConnection(function (err, connect) {
        if (username && password) {
            connect.query('SELECT * FROM dangki WHERE email = ? OR name=? AND pass = ?', [username, username, password], function (error, results, fields) {
                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.cookie('username', username);
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
exports.search = function (req, res) {
    let body = req.body;
    var search = req.body.search;
    console.log(search);
    req.getConnection(function (err, connect) {
        var query = connect.query('SELECT * FROM nhatki WHERE ID = ? OR title = ?', [search, search], function (err, rows) {
            if (err) {
                //console.log("Error Selecting : %s ", err);
                console.log("error");
            }
            //console.log(rows);
            res.render('index',
                { page_title: "Test Table", data: rows }
            );
        });
    });
}

exports.list = function (req, res) {
    if (!req.session.username) {
        res.redirect('/');
        return;
    } else {
        req.getConnection(function (err, connect) {
            let username = req.session.username;
            var query = connect.query('SELECT * FROM nhatki', function (err, rows) {
                if (err) {
                    console.log("Error! ");
                }
                res.render('index',
                    { page_title: "Test Table", data: rows }
                );
            });
        });
    }
};

exports.register = function (req, res) {
    let body = req.body;
    var username = req.body.Username;
    //var password = bcrypt.hashSync(req.body.Password, 8);
    var password = req.body.Password;
    var password = require('crypto').createHash('md5').update(password).digest('hex').toString();
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
exports.delPost = function (req, res) {
    let body = req.body;
    var ID = req.body.ID;
    console.log(ID);
    req.getConnection(function (err, connect) {
        if (ID) {
            connect.query('DELETE FROM nhatki WHERE ID = ?', ID);
            res.redirect('/index');
        } else {
            res.send('Please enter ID!');
            res.end();
        }
    });
}
exports.test = function (req, res) {
    var ID = req.params.id;
    req.getConnection(function (err, connect) {
        var query = connect.query('SELECT * FROM nhatki WHERE ID= ?', ID, function (err, rows) {
            if (err) {
                console.log("Error! ");
            }
            res.render('index',
                { page_title: "Test Table", data: rows }
            );
        });
    });
}
//module.exports = { list }
