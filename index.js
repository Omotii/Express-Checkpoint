const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

const time = new Date().getHours();
const day = new Date();

const workingTime = time >= 9 && time < 17
const workingDays = day.getDay() !== 6 && day.getDay() !== 0

function date(req, res, next){
    if (workingTime && workingDays ){
        next()
    } else {
        res.send('Closed not a working day or working hour')
    }
}

app.get('/home', date, function(req, res){
    res.render('home');
});

app.get('/our-services', date, function(req, res){
    res.render('services');
});

app.get('/contact-us', date, function(req, res){
    res.render('contact');
});

app.listen(4000, function(){
    console.log('The app is running check your browser')
});