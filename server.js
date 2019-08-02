//Node js server
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var nodeoutlook = require('nodejs-nodemailer-outlook')
var bodyParser = require('body-parser');

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

app.post('/form_data.php', (req, res) => {
    console.log(req.body);

    nodeoutlook.sendEmail({
        auth:{
            user: "david.mcdowell.cs350@outlook.com",
            pass: "david.mcdowell.password"
        }, from: 'david.mcdowell.cs350@outlook.com',
        to: req.body.email,
        subject: 'Thank You for your submission',
        html: '<b>Where does this go?</b>',
        text: 'Is this in the body?',

        onError: (e) => res.redirect('summer_schedule.html'),
        onSuccess: (i) => res.redirect('index.html')
    });


});
