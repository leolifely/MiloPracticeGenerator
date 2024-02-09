const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

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

app.post('/WriteDB', (req, res) => {
    console.log("Received POST request on /WriteDB, user: ", req.body.user)
    const duration = req.body.duration;
    const date = req.body.date;
    const user = req.body.user;
    var sql = "INSERT INTO practices (user, date, duration) VALUES (?, ?, ?)";
    connection.query(sql, [user, date, duration], function(err, result) {
        if (err) throw err;
        console.log(result);
    });
});

app.post('/ReadDB', (req, res) => {
    console.log("Received POST request on /ReadDB, user: ", req.body.user)
    const user = req.body.user;
    var sql = "SELECT * FROM practices WHERE user = ?";
    connection.query(sql, [user], function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});