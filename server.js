const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config();


let db
let url= process.env.dbString
let dbName = "personal-express"
let collection;


app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('packingitems').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {packingitems: result})
    
  })

})

app.post('/packingitems', (req, res) => {
  db.collection('packingitems').insertOne({name: req.body.name, packed: 'false'}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/packingitemstrue', (req, res) => {
  db.collection('packingitems')
  .findOneAndUpdate({name: req.body.name},{
    $set: {
      packed: 'true'
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/packingitemsfalse', (req, res) => {
  db.collection('packingitems')
  .findOneAndUpdate({name: req.body.name},{
    $set: {
      packed: 'false'
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/packingitems', (req, res) => {
  db.collection('packingitems').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
