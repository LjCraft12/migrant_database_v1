// Import variables
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;

let User = require('./models/user');

// Database connection and error checking
mongoose.connect('mongodb://localhost:27017/mm_database');
let db = mongoose.connection;

db.on('connected', () => {
    console.log('//Successfully connected to database//')
});

db.on('error', (err) => {
    console.log('//Error could not connect to database: ' + err)
});

// Server port setup
app.listen(port, (err) => {
    if (err) {
        console.log('Error could not connect to port: ' + port)
    } else {
     console.log('//Server is running on port: ' + port + '//');
    }
});

// Setting the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body parser middleware //
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Set public folder to static
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.get('/', (req, res) => {
   res.render('index', {
       title: 'Migrant Med | Home',
       header: 'Migrant Med'
   });
});

app.get('/registration', (req, res) => {
    res.render('registration', {
        title: 'Migrant Med | Registration',
        header: 'Migrant Med Registration'
    });
});

app.post('/registration/add', (req, res) => {
    let user       = new User();
    user.firstName = req.body.firstName;
    user.lastName  = req.body.lastName;
    user.phone     = req.body.phone;
    user.email     = req.body.email;
    user.save( (err) => {
        if (err) {
            console.log('Warning client not saved ' + err);
            return
        } else {
            res.redirect('/thanks');
        }
    });
});


app.get('/thanks', (req, res) => {
    res.render('thanks', {
        title: 'Migrant Med | Thank you',
        header: 'Thank you for pre-registering to Migrant Med.'
    });
});

app.get('/terms', (req, res) => {
   res.render('terms', {
       title: 'Migrant Med | Terms',
       header: 'Migrant Med\'s Terms of Service'
   })
});

app.get('/registered', (req, res) => {
    User.find({}, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            res.render('registered', {
                title: 'Migrant Med | Registry',
                header: 'Registered Clients',
                user: user
            });
        }
    });
});