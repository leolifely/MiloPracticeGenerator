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
    console.log("Received POST request on /WriteDB, user: ", req.body.id)
    const duration = req.body.duration;
    const date = req.body.date;
    const id = req.body.id;
    var sql = "INSERT INTO practices (user_id, date, duration) VALUES (?, ?, ?)";
    connection.query(sql, [id, date, duration], function(err, result) {
        if (err) throw err;
        console.log(result);
    });
    res.sendStatus(200);
});

app.post('/ReadPractices', (req, res) => {
    console.log("Received POST request on /ReadPractices, user: ", req.body.id)
    const id = req.body.id;
    var sql = "SELECT * FROM practices WHERE user_id = ?";
    connection.query(sql, [id], function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
});

app.post('/SignUp', (req, res) => {
    console.log("Received POST request on /SignUp, user: ", req.body.user);
    const username = req.body.user;
    const password = req.body.password;

    bcrypt
        .hash(password, saltRounds)
        .then((hash) => {
            var sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        })
        .catch(err => console.error(err.message));

    connection.query(sql, [username, hash], function(err, result) {
        if (err) throw err;
        console.log(result);
    });
    res.sendStatus(200);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});