//Node js server
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const nodeoutlook = require('nodejs-nodemailer-outlook')
const bodyParser = require('body-parser');
const path = require('path');
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://heroku_4zw6ftcc:<dbpassword>@ds217452.mlab.com:17452/heroku_4zw6ftcc';

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



app.post('/mail', (req, res) => {
    mongo.connect(url, (err, client) => {
        if(err){
            console.error(err);
            return;
        };
        var db = client.db('heroku_4zw6ftcc');

        db.collection('feedback_data').insertOne(req.body, function(err)
        {
            if(err) res.redirect('summer_schedule.html');
            var numFeedback = db.collection('feedback_data').countDocuments({});

            nodeoutlook.sendEmail({
                auth:{
                    user: "david.mcdowell.CS350@outlook.com",
                    pass: "david.mcdowell.password"
                }, 
                from: 'david.mcdowell.CS350@outlook.com',
                to: req.body.email,
                subject: 'Thank You for your submission',
                html: `<b>You are the ${numFeedback}</b>`,
                text: 'Is this in the body?',
        
                onError: (e) => res.redirect('summer_schedule.html'),
                onSuccess: (i) => res.redirect('index.html')       
            });
        })
    });
})

/*
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
*/
