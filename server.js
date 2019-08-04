//Node js server
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const nodeoutlook = require('nodejs-nodemailer-outlook')
const bodyParser = require('body-parser');
const path = require('path');
const mong = require('mongodb').MongoClient;
const url = 'https://vast-hamlet-44994.herokuapp.com/';

mongo.connect(url, (err, client) => {
    if(err){
        console.error(err);
        return;
    }
});

const db = client.db('kennel');

const collection = db.collection('feedback');

app.use(express.static(__dirname));

app.get("/", function(req, res)
{
    res.render("index");
});

app.listen(port, function()
{
    console.log("app running");
});

//Mailer
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

collection.insertMany([{name:'name'}, {name:'address'}, {name:'phone'}, {name:'email'}, {name:'comment'}], (err, result) =>
{
    
})

app.post('/mail', (req, res) => {
    console.log(req.body);

    nodeoutlook.sendEmail({
        auth:{
            user: "david.mcdowell@siu.edu",
            pass: "Lassally00135???l"
        }, 
        from: 'david.mcdowell@siu.edu',
        to: req.body.email,
        subject: 'Thank You for your submission',
        html: '<b>Where does this go?</b>',
        text: 'Is this in the body?',

        onError: (e) => res.redirect('summer_schedule.html'),
        onSuccess: (i) => res.redirect('index.html')       
    });
});
