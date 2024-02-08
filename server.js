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
    multipleStatements: true
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to MySQL.');
});

app.use(express.json());

app.post('/WriteDB', (req, res) => {
    console.log("Received POST request")
    const duration = req.body.duration;
    const date = req.body.date;
    const user = req.body.user;
    var sql = "USE practice_records; INSERT INTO practices (user, date, duration) VALUES (?, ?, ?)";
    connection.query(sql, [user, date, duration], function(err, result) {
        if (err) throw err;
        console.log(result);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});