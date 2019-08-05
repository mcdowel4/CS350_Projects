//Node js server
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const nodeoutlook = require('nodejs-nodemailer-outlook')
const bodyParser = require('body-parser');

app.use(express.static(__dirname));

const mongo = require('mongodb').MongoClient;
const url = 'mongodb://heroku_4zw6ftcc:54gcq4gu7etb3lv4cn62bnfuvj@ds217452.mlab.com:17452/heroku_4zw6ftcc';


//Mailer
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/", function(req, res)
{
    res.send("index.html");
});

app.listen(port, function()
{
    console.log("app running");
});

app.post('/mail', function(req, res){
    mongo.connect(url, {useNewUrlParser: true },function(err, client){
        if(err) throw err;

        let db = client.db('heroku_4zw6ftcc');

        db.collection('feedback_data').insertOne(req.body, function(err)
        {
            if(err) throw err;
            db.collection('feedback_data').countDocuments({}).then(function(numItems){
                nodeoutlook.sendEmail({
                    auth:{
                        user: "david.mcdowell.cs350@outlook.com",
                        pass: "david.mcdowell.password"
                    }, 
                    from: `david.mcdowell@siu.edu`,
                    to: req.body.email,
                    subject: `Thank You for your submission`,
                    html: `<b>Thank you for your
                    feedback. You are my ${numItems} honored guest who left a feedback</b>`,
                    text: 'Thank You',
                    
                    onSuccess: (i) => res.redirect('index.html')       
                });
            });
        });
    });
});
/*
app.post('/mail', (req, res) => {
    console.log(req.body);

    nodeoutlook.sendEmail({
        auth:{
           user: "david.mcdowell.cs350@outlook.com",
           pass: "david.mcdowell.password"
        }, 
        from: 'david.mcdowell@siu.edu',
        to: req.body.email,
        subject: 'Thank You for your submission',
        html: `<b>You are the ${numItems}</b>`,
        text: 'Is this in the body?',

        onError: (e) => res.redirect('summer_schedule.html'),
        onSuccess: (i) => res.redirect('index.html')       
    });
});

*/