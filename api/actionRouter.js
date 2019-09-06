const express = require('express');

const Projects = require('../data/helpers/actionModel');

const router = express.Router();

router.use(express.json());

// GET /api
router.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

// GET /api/actions
router.get('/actions', (req, res, next) => {
  Shouts.find()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => next(error));
});

// POST /api/actions
router.post('/actions', (req, res, next) => {
  Shouts.add(req.body)
    .then(action => {
      res.status(201).json(action);
    })
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
