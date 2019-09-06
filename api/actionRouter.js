const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.use(express.json());

// GET /api
router.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

// GET /api/actions
router.get('/actions', (req, res, next) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => next(error));
});

// POST /api/actions
router.post('/actions', (req, res, next) => {
console.log('action post',req.body)
  Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    // .catch(error => console.log(error));
    .catch(error => next(error));
});

router.use(errorHandler);

function errorHandler(error, req, res, next) {
  // do something with error before responding
  // like saving it to a database, sending a mail to the admin
  // or using an external logging service
  res.status(500).json(error.message);
}

module.exports = router;
