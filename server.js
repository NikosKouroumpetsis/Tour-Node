const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION!! Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

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

// console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION!! Shutting down...');
  // eslint-disable-next-line no-undef
  server.close(() => {
    process.exit(1);
  });
});
