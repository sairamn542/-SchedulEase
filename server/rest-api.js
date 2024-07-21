var express = require('express')
var cors = require('cors')
var mongoClient = require('mongodb').MongoClient;

var conString = 'mongodb://127.0.0.1:27017'

var app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.post('/register-user',(req,res)=>{    //req is used to bring the data res is use to send the data to server
    var user = {
        UserId : req.body.UserId,
        UserName : req.body.UserName,
        Password : req.body.Password,
        Email : req.body.Email,
        Mobile : req.body.Mobile
    }
    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db('react-todo');
        database.collection('users').insertOne(user).then(()=>{
            console.log('Added');
            res.end()
        })
    })
})
app.post('/add-task',(req,res)=>{    //req is used to bring the data res is use to send the data to server
    var task = {
        Appointment_Id : parseInt(req.body.Appointment_Id),
        Title : req.body.Title,
        Description : req.body.Description,
        Date : new Date(req.body.Date),
        UserId : req.body.UserId
    }
    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db('react-todo');
        database.collection('appointments').insertOne(task).then(()=>{
            console.log('Task Added');
            res.end();
        })
    })
})
app.get('/view-tasks/:user_id',(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db('react-todo');
        database.collection('appointments').find({UserId : req.params.user_id}).toArray().then((document)=>{
            res.send(document)
            res.end()
        })
    })
})

app.get('/view-task/:id',(req,res)=>{
    var id = parseInt(req.params.id)
    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db('react-todo');
        database.collection('appointments').find({Appointment_Id : id}).toArray().then((document)=>{
            res.send(document)
            res.end()
        })
    })
})

app.put('/edit-task/:id',(req,res)=>{
    var id = parseInt(req.params.id)
    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db('react-todo');
        database.collection('appointments').updateOne({Appointment_Id : id},{$set:{Appointment_Id : parseInt(req.body.Appointment_Id),Title : req.body.Title,Description : req.body.Description,Date : new Date(req.body.Date),UserId : req.body.UserId}})
        .then(()=>{
            console.log('task updated');
            res.end()
        })
    })
})
app.delete('/delete-task/:id',(req,res)=>{
    var id = parseInt(req.params.id)
    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db('react-todo');
        database.collection('appointments').deleteOne({Appointment_Id : id}).then(()=>{
            console.log('Task deleted');
            res.end()
        })
    })
})
app.get('/get-users',(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db('react-todo');
        database.collection('users').find({}).toArray().then((document)=>{
            res.send(document)
            res.end()
        })
    })
})
app.listen(2345)
console.log(`Server  Started in http://127.0.0.1:2345`);