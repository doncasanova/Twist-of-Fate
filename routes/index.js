const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { body, validationResult } = require('express-validator/check');
const router = express.Router();
const Upload = mongoose.model('Upload');
const path = require('path');
const auth = require('http-auth');
const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd')
});

router.get('/', (req, res) => {
    
    Upload.find()
        .then((uploads) => {
            events = uploads[0];
            console.log(events);
            res.render('index', { title: 'Listing registrations', events });
        })
        .catch(() => { res.send('Sorry! Something went wrong.'); });

});

router.get('/about', (req, res) => {
    res.render('about');

});

router.get('/gallery', (req, res) => {
    res.render('gallery');

});

router.get('/download', (req, res) => {
    res.render('download');

});

router.get('/blog', (req, res) => {
    res.render('blog');

});

router.get('/contact', (req, res) => {
    res.render('contact');

});

router.get('/form', (req, res) => {
    res.render('form');

});

router.post('/',

    [
        body('name')
            .isLength({ min: 1 })
            .withMessage('Please enter a name'),
        body('address')
            .isLength({ min: 1 })
            .withMessage('Please enter an email'),
        body('date')
            .isLength({ min: 1 })
            .withMessage('Please enter an password'),
        body('time')
            .isLength({ min: 1 })
            .withMessage('Please enter an passwordConf')
    ],

    (req, res) => {
        let event = req.body;
        console.log(event);

            let upLoad = new Upload(req.body);

            upLoad.save()
                .then(() => {
                    res.render('login', { title: 'Login form', pageHeader: 'Login Page', thankYou: 'Thank you for your registration!' });

                })
                .catch(() => { res.send('Sorry! Something went wrong.'); });
        
    }

);

router.get('/registrations', (req, res) => {
    Upload.find()
        .then((uploads) => {
            console.log(uploads);
            res.render('index', { title: 'Listing registrations', uploads });
        })
        .catch(() => { res.send('Sorry! Something went wrong.'); });
});

router.get('/test', (req, res) => {
    Upload.find(function (err, uploadsResults) {
        console.log("this is test  " + uploadsResults[0].date);
        let date = uploadsResults[0];
        console.log(date);
        if (err) {
            res.send(err);
        } else if (uploadsResults.length) {
            res.render('test', { 'events': uploadsResults });
           
        } else {
            res.send('no documents found');
        }
    });
      //  .then((uploads) => {
         //   let events = uploads;
         //   console.log(events);
           
       // })
      //  .catch(() => { res.send('Sorry! Something went wrong.'); });

});


module.exports = router;




