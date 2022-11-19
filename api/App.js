const Utilities = require('./Utilities')
const express = require('express');
const algosdk = require('algosdk');
const Route = express.Router();

const StudentController = require('./controllers/StudentController')
const SetupController = require('./controllers/SetupController')
/**
 * APIs V1 Routes
 */
Route.route('/api')
	.get((req, res) => Utilities.apiResponse(res, 200, 'Welcome API'))
	.all(Utilities.send405);

Route.route('/api/v1')
	.get((req, res) => Utilities.apiResponse(res, 200, 'APIs V1'))
	.all(Utilities.send405);



// Scaffolding Endpoints:
Route.route('/reset')
	.get(SetupController.reset)
	.all(Utilities.send405);


Route.route('/vote/')
	.get(StudentController.getUserByID)
	.all(Utilities.send405);

/* Route.route('/api/v1/auth/login')
	.post(StudentController.login)
	.all(Utilities.send405);

Route.route('/api/v1/auth/signup')
	.post(StudentController.signup)
	.all(Utilities.send405); */
/* 
Route.route('/api/v1/auth/users')
	.get(Utilities.verifyAccessToken, StudentController.users)
	.all(Utilities.send405);

Route.route('/api/v1/auth/user')
	.get(Utilities.verifyAccessToken, StudentController.getUserByID)
	.all(Utilities.send405); */

module.exports = Route