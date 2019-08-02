//Node js server
var express = require('express');
var app = express();

var port = process.env.PORT || 8080

app.use(express.static(__dirname));

app.get("/", function(req, res)
{
    res.render("index");
})

app.listen(port, function()
{
    console.log("app running");
})
/*
//Mailer
var nodemailer = require('nodemailer');
app.post('/mail', (req, res) => {
    console.log(req.body);

    var nodeoutlook = require('nodejs-nodemailer-outlook')
    nodeoutlook.sendEmail({
        auth:{
            user: "david.mcdowell.cs350@outlook.com",
            pass: "david.mcdowell.password"
        }, from: 'david.mcdowell.cs350@outlook.com',
        to: req.body.email,
        subject: 'Thank You for your submission',
        html: '<b>Where does this go?</b>',
        text: 'Is this in the body?',

        onError: (e) => res.redirect('schedule.html'),
        onSuccess: (i) => res.redirect('index.html')
    });


});
*/