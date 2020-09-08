const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res, next) => {
    // get all the books
    Celebrity.find()
        .then(celebritiesFromDB => {
            // render a view and pass in the books
            // console.log(booksFromDB);
            res.render('celebrities/index', {
                celebrityList: celebritiesFromDB
            })
        })
        .catch(error => {
            next(error)
        })
});

router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new');

});

router.get('/celebrities/:id', (req, res, next) => {
    const id = req.params.id;
    Celebrity.findById(id)
        .then(celebFromDB => {
            res.render('celebrities/show', celebFromDB);
        })
        .catch(error => {
            next(error)
        })
});



router.post('/celebrities', (req, res) => {
    const {
        name,
        occupation,
        catchPhrase
    } = req.body;
    Celebrity.create({
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase,

    }).then(celebrity => {
        console.log(`New celeb was created: ${celebrity}`);
        res.redirect(`/celebrities/${celebrity._id}`);
    }).catch(error => {
        console.log(error);
    })
});

router.post('/celebrities/:id/delete', (req, res, next) => {
    const id = req.params.id;
    Celebrity.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch(error => {
            next(error);
        })
});

router.get('/celebrities/:id/edit', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then((celebrity) => {
            res.render('celebrities/edit', {
                celebrity: celebrity
            });
        })
        .catch(error => {
            next(error);
        })
});

router.post('/celebrities/:id', (req, res, next) => {
    const {
        name,
        occupation,
        catchPhrase
    } = req.body;
    Celebrity.findByIdAndUpdate(id, {
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase,

    }).then(celebrity => {
        res.redirect(`/celebrities`);
    }).catch(error => {
        next(error);
    })
});




module.exports = router;