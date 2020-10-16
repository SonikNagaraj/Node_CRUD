const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

// Creating connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'sonik',
    database : 'nodemysql'
});

// Connect
db.connect((err) => {
    if(err){
        console.log('MySql not connected');
    }
    else
        console.log('MySQL Connected');
});

const app = express();

app.use(bodyParser.json());

// Create Table
app.get('/createtable', (req,res) => {
    let sql = 'CREATE TABLE test(Name varchar(25),Age int)';
    db.query(sql, (err,result) => {
        if(err)
            res.send('Table creating failed');
        else
            res.send('Table Created successfully');
    });
});

// Insert values
app.get('/insert', (req,res) => {
    let data = {
        Name: 'N',
        Age: '10'
    };
    let sql = 'INSERT INTO test SET ?';
    db.query(sql, data, (err,result) => {
        if(err)
            res.send('Data Insertion failed');
        else
            res.send('Data Insertion successful');
    });
});

// Insert dynamically
app.post('/insert_dynamic', (req,res) => {
    let data = {
        Name: req.body.name,
        Age: req.body.age
    };
    let sql = 'INSERT INTO test SET ?';
    db.query(sql, data, (err,result) => {
        if(err)
            res.send('Data Insertion failed');
        else
            res.send('Data Insertion successful');
    });
});


// View
app.get('/view', (req,res) => {
    let sql = 'SELECT * FROM test';
    db.query(sql, (err,result) => {
        if(err)
            res.send('Data fetching failed');
        else
            res.send(result);
    });
});

// Update
app.post('/update', (req,res) => {
    let value = req.body.value;
    let sql = `UPDATE test SET Name = ${value} WHERE Age = ${10}`;
    db.query(sql, (err,result) => {
        if(err)
            throw err;
        else
            res.send('Updated successfully');
    });
});

//Delete
app.post('/delete', (req,res) => {
    let value = req.body.age;
    let sql = `DELETE FROM test WHERE age = ${value}`;
    db.query(sql, (err,result) => {
        if(err)
            res.send('Deletion failed');
        else
            res.send('Deleted successfully');
    });
});


app.listen('3000', () => {
    console.log('Listening on port 3000');
});