var express = require('express');
var cors = require('cors');
var mongoClient = require('mongodb').MongoClient;

var conString = 'mongodb://127.0.0.1:27017'
 var app = express()
 app.use(cors())
 app.use(express.urlencoded({extended : true}))
 app.use(express.json())

 //Server side

 app.post('/register-user',(req,res)=>{
    var user = {
        UserId : req.body.UserId,
        UserName : req.body.UserName,
        Password : req.body.Password,
        Email : req.body.Email,
        Mobile : req.body.Mobile
    }
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-todo")
        database.collection("users").insertOne(user).then(()=>{
            console.log('Responce submitted');
            res.end()
        })
    })
 })
 app.get('/get-user',(req,res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db('react-todo')
        database.collection('users').find({}).toArray().then(documents=>{
            res.send(documents)
            res.end()
        })
    })
 })
 app.post('/add-task',(req,res)=>{
    var task = {
        Appointment_id : parseInt(req.body.Appointment_id),
        Title : req.body.Title,
        Description : req.body.Description,
        Date : new Date(req.body.Date),
        UserId : req.body.UserId
    }
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db('react-todo')
        database.collection('appointments').insertOne(task).then(()=>{
            console.log('task added')
            res.end()
        })
    })
 })
 app.get('/view-tasks/:user_id',(req,res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db('react-todo')
        database.collection('appointments').find({UserId:req.params.user_id}).toArray().then(documents=>{
            res.send(documents)
            res.end()
        })
    })
 })
 app.get('/view-task/:id',(req,res)=>{
    var  id = parseInt(req.params.id)
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db('react-todo')
        database.collection('appointments').find({Appointment_id : id}).toArray().then(documents=>{
            res.send(documents)
            res.end()
        })
    })
 })
 app.put('/edit-task/:id',(req,res)=>{
    var  id = parseInt(req.params.id)
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db('react-todo')
        database.collection('appointments').updateOne({Appointment_id : id},{$set : {Appointment_id : parseInt(req.body.Appointment_id),
            Title : req.body.Title,
            Description : req.body.Description,
            Date : new Date(req.body.Date),
            UserId : req.body.UserId} }).then(()=>{
                console.log('Task updated')
            })
    })
 })
 app.delete('/delete-task/:id',(req,res)=>{
    var  id = parseInt(req.params.id)
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db('react-todo')
        database.collection('appointments').deleteOne({Appointment_id : id}).then(()=>{
                console.log('Task Deleted')
            })
    })
 })
 app.listen(6060)
    console.log(`server started in http://127.0.0.1:6060`)