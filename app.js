const express=require("express");
const path=require("path");
const fs=require("fs");
const { urlencoded}=require("express")
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
mongoose.connect('mongodb+srv://Manishjobs:ManishSingh@cluster0.yilku.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true });
const app=express();
const port =8810;

let route="/"
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())


// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// connect ot mongodb database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

// making mongoose.Schema
const contectSchema = new mongoose.Schema({
    name: String,
    email:String,
    address:String,
    phone:String,
    consern:String,

});


const ContectModel = mongoose.model('UserDetail', contectSchema);


// making mongoose.Schema For Simaple Quire in the futtore
const quireSchema = new mongoose.Schema({
    
    email:String,
    massage:String,

});


const quireModel = mongoose.model('userQuire', quireSchema);





// ENDPOINTS
app.get('/', (req, res) => {
    const params = ""
    route = "/index"
    res.status(200).render('../static/index.pug', params);
    
})

// ENDPOINTS
app.get('/service', (req, res) => {
    const params = ""
    route = "/sevice"
    res.status(200).render('../static/sevice.pug', params);
})

// about ENDPOINTS
app.get('/about', (req, res) => {
    const params = ""
    route = "/aboutUs"
    res.status(200).render('../static/aboutUs.pug', params);
})

// class Info ENDPOINTS
app.get('/classInfo', (req, res) => {
    const params = ""
    route = "/classInfo"
    res.status(200).render('../static/classInfo.pug', params);
})

// ENDPOINTS
app.get('/contact', (req, res) => {
    const params = ""
    route = "/contact"
    res.status(200).render('../static/contact.pug', params);
})

app.post('/contact',(req,res)=>{
    // name=req.body.name;
    // email = req.body.consern;
    // address=req.body.address;
    // consern=req.body.consern;
    // phone=req.body.phone;
    // con
    
    const contect = new ContectModel(req.body);
    console.log(contect);

     contect.save().then(()=>{
         const params = { "Massage": "Submition successfull" }
         res.status(200).render('../static/contact.pug', params)
     }).catch(()=>{
         const params = { "Massage": "Submition Fail" }
         res.status(200).render('../static/contact.pug', params)
     })
    // contect.save(function (err, contect) {
    //     if (err) return console.error(err);
    //     contect.speak();
    // });
    // console.log(`name: ${name} \n email: ${email} \n address:${address} \n consern:${consern} \n phone No:${phone}`);
    // const params ={"Massage":"Submition successfull"}
    // res.status(200).render('../static/contact.pug', params);
})


app.post('/quire',(req,res)=>{
    // email=req.body.email;
    // massage=req.body.massage;
const quiredata = new quireModel(req.body);

    console.log(quiredata);

    quiredata.save().then(() => {
        const params = { "Massage": "Submition successfull" }
        res.status(200).render(`../static${route}.pug`, params);
    }).catch(() => {
        const params = { "Massage": "Submition Fail" }
        res.status(400).render(`../static${route}.pug`, params);
    })

    // quiredata.save(function (err, quiredata) {
    // if (err) return console.error(err);
    // // quiredata.speak();
// });

    // console.log(`name: ${massage} and email: ${email}`);
   
})


app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});