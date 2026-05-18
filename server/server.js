const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')


const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

const port = 5000

require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
})

db.connect((err) => {
    if (err) {
        console.log('Database connection error:', err)
    } else {
        console.log('Connected to database!')
    }
})

app.post('/add_user', (req, res)=>{
    sql = "INSERT INTO person_details(`name`,`email`, `age`,`job`) VALUES (?,?,?,?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.job,
    ]
    db.query(sql,values, (err, result)=>{
        if(err) return res.json({message: 'Something unexpected has occured'});
        return res.json({success: "Person added successfully"});
    });
});

app.get('/people', (req, res)=>{
    const sql = "SELECT * FROM person_details";
    db.query(sql, (err,result)=>{
        if(err) return res.json({"message":"Server error"})
        return res.json(result);
    });
});

app.get('/get_person/:id', (req, res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM person_details WHERE `id` = ?";
    db.query(sql, [id], (err,result)=>{
        if(err) res.json({"message":"Server error"})
        return res.json(result);
    });
});

app.post('/edit_user/:id', (req, res)=>{
    const id = req.params.id;
    sql = "UPDATE person_details SET `name` = ?, `email` = ?, `age` = ?, `job` = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.job,
        id
    ]
    db.query(sql,values, (err, result)=>{
        if(err) return res.json({message: 'Something unexpected has occured'});
        return res.json({success: "Person added successfully"});
    });
});

app.delete('/delete/:id', (req, res)=>{
    const id = req.params.id;
    sql = "DELETE FROM person_details WHERE id = ?";
    const values = [id];
    db.query(sql,values, (err, result)=>{
        if(err) return res.json({message: 'Something unexpected has occured'});
        return res.json({success: "Person added successfully"});
    });
});

app.listen(port, ()=>{
    console.log('listening')
})