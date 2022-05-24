const { fail } = require('assert');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// 1. MIDDLEWARES

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2. ROUTE HANDLERS

// Tours
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  // console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  //
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 201,
        data: {
          tour: newTour,
        },
      });
    }
  );

  // res.send('Done');
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Updated Tour>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(204).json({
    status: 'Success',
    data: null,
  });
};

// Users

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This is under constraction',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This is under constraction',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This is under constraction',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This is under constraction',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This is under constraction',
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3. ROUTES

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

//  START SERVER

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening at ${port}...`);
});

//
