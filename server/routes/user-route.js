const express = require('express');
const { getUsers, addUser, updateUser, deleteUser } = require('../controller/user-controller');
const UserRouter = express.Router();

UserRouter.route('/').get(getUsers);
UserRouter.route('/add').post(addUser);
UserRouter.route('/update/:id').put(updateUser);
UserRouter.route('/delete/:id').delete(deleteUser);

module.exports = UserRouter;