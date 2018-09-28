var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var cors = require('cors'); 
const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:mgourav3010@ds115613.mlab.com:15613/myportfolio',{
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console,'connection error'));
db.once('open', function(){
  console.log("we are connected");
})

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: String,
  email: String,
  message: String
});

const contact = mongoose.model('contact',contactSchema);


var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "x-auth,content-type",
  exposedHeaders: "x-auth,content-type",
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(bodyparser.json());
app.use(cors(corsOptions));
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.post('/gourav',function(req, res){
    name = req.body.name;
    r = {reponse:name}
    const instance = new contact(req.body); //create an instance of model
    instance.save()
    .then((res)=>{
      console.log("response received");
      res.send(res)
    })
    .catch((err)=>{
      console.log("error occured");
      res.status(400).send(err)
    });
})

console.log("listning on port 3000");

app.listen(3000);