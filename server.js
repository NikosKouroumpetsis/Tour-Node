const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: '../vars/config.env' });

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

const app = require('./app');

const port = process.env.PORT || 3000;

// console.log(process.env);

app.listen(port, () => {
  console.log(`Server listening at ${port}...`);
});
