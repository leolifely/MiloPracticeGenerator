const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const cors = require('cors');

const saltRounds = 10;
const app = express();
const port = 3000;
app.use(cors());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'sql-svc',
    password: 'violin',
    database: 'practice_records',
    multipleStatements: true
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to MySQL.');
});

app.use(express.json());

app.post('/WritePractices', (req, res) => {
    console.log("Received POST request on /WriteDB, user: ", req.body.username)
    const duration = req.body.duration;
    const date = req.body.date;
    const user = req.body.username;
    const password = req.body.password;
    validateUser(password, user).then((result) => {
        if (result) {
            var sql = "INSERT INTO practices (user_id, date, duration) VALUES (?, ?, ?)";
            connection.query("SELECT id FROM users WHERE username = ?", [user], function(err, result) {
                if (err) throw err;
                console.log(result);
                const id = result[0].id;
                connection.query(sql, [id, date, duration], function(err, result) {
                    if (err) throw err;
                    console.log(result);
                });
            });
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    });
});

app.post('/ReadPractices', (req, res) => {
    console.log("Received POST request on /ReadPractices, user: ", req.body.username)
    const user = req.body.username;
    validateUser(req.body.password, user).then((result) => {
        if (result) {
            var sql = "SELECT * FROM practices WHERE user_id = (SELECT id FROM users WHERE username = ?)";
            connection.query(sql, [user], function(err, result) {
                if (err) throw err;
                res.json(result);
            });
        }
        else {
            res.sendStatus(403);
        }
    });
});

app.post('/SignUp', (req, res) => {
    console.log("Received POST request on /SignUp, user: ", req.body.user);
    const username = req.body.user;
    const password = req.body.password;

    bcrypt
        .hash(password, saltRounds)
        .then((hash) => {
            let sql = "INSERT INTO users (username, password) VALUES (?, ?)";
            connection.query(sql, [username, hash], function(err, result) {
                if (err) throw err;
                console.log(result);
            
        });
    });
    res.sendStatus(200);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function validateUser(password, user) {
    let sql = "SELECT password FROM users WHERE username = ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, [user], function(err, result) {
            if (err) reject(err);
            console.log(result);
            bcrypt
                .compare(password, result[0].password)
                .then(res => {
                    resolve(res);
                }).catch(err => {
                    console.error(err);
                    reject(err);
                });
        });
    });
}