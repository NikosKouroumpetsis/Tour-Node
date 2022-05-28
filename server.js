const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

const pwd = process.env.DATABASE_PASSWORD;
const db = process.env.DATABASE;
const DB = db.replace('<PASSWORD>', pwd);

// Connect to atlas

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

// Connect to localDB

// mongoose
// .connect(process.env.DATABASE_LOCAL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('DB connection successful!');
// });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Park Camper',
  price: 997,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(`Error`, err);
  });

// console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at ${port}...`);
});
