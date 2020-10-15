const mysql = require('mysql');
const express = require('express');

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
app.get('/insert/:name/:age', (req,res) => {
    let data = {
        Name: req.params.name,
        Age: req.params.age
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
app.get('/update/:name', (req,res) => {
    let value = req.params.name;
    let sql = `UPDATE test SET Name = ${value} WHERE Age = ${10}`;
    db.query(sql, (err,result) => {
        if(err)
            throw err;
        else
            res.send('Updated successfully');
    });
});

//Delete
app.get('/delete/:age', (req,res) => {
    let value = req.params.age;
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