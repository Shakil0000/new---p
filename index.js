const express = require('express')

const ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5050;

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})




const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://organicUser2:amarnamkivai@cluster0.1tcgs.mongodb.net/last?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("last").collection("lastproducts");


  app.post('/addProject', (req, res) => {
    const newEvent = req.body;
    console.log('adding new event ', newEvent);
    collection.insertOne(newEvent)
      .then(result => console.log(result.insertedCount))
  })

  app.get('/findProjects', (req, res) => {
    collection.find({ item: 'project' })
      .toArray((err, items) => {
        res.send(items);
      })
  })

  app.get("/project/:id",(req,res) => {
    collection.find({_id : ObjectId(req.params.id)})
    .toArray((err,document) => {
      res.send(document);
    })
  })

  app.delete('/delete/:id',(req,res) => {
    collection.deleteOne({_id:ObjectId(req.params.id)})
    .then(result => {
      console.log(result);
     res.send(result.deletedCount > 0);
    })
  })


  app.get('/findUserProjects/:emailUser', (req, res) => {
    collection.find({ email: req.params.emailUser})
      .toArray((err, items) => {
        res.send(items);
      })
  })





  console.log("Database connected successfully");
});





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
