function displayThankYou() {
    if(window.confirm("Click Yes to submit..."))
    {
        alert("Thank you…. a confirmation email message will be sent to you soon. This is a test");
        
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'dmcdowell00135@gmail.com',
                pass: 'Lassally00135???l'
            }
        });

        var mailOptions = {
            from: 'dmcdowell00135@gmail.com',
            to: 'david.mcdowell@siu.edu',
            subject: 'Confirmation Email',
            text: 'Thank You!'
        };

        transporter.sendMail(mailOptions, function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log('Email sent: ' + info.response);
            }
        });
    }
}