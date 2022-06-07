const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// 2os Tropos Eisagwgis twn function

// const {getAllUsers,createUser,getUser,updateUser,deleteUser} = require('./../controllers/userController')

// router.route('/').get(getAllUsers).post(createUser);

// router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
