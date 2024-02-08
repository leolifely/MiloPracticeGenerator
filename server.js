const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'sql-svc',
    password: 'violin'
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
    var sql = `INSERT INTO practices (user, date, duration) VALUES (${user}, ${date}, ${duration})`;
    connection.query(sql, function(err, result) {
        if (err) throw err;
        console.log('1 record inserted');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});