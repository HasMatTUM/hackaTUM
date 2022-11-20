const Utilities = require('./Utilities')
const express = require('express');
const algosdk = require('algosdk');
const Route = express.Router();

const StudentController = require('./controllers/StudentController')
const SetupController = require('./controllers/SetupController')
const VoteController = require('./controllers/VoteController');
const SurveyController = require('./controllers/SurveyController');
/**
 * APIs V1 Routes
 */
Route.route('/api')
	.get((req, res) => Utilities.apiResponse(res, 200, 'Welcome API'))
	.all(Utilities.send405);

Route.route('/api/v1')
	.get((req, res) => Utilities.apiResponse(res, 200, 'APIs V1'))
	.all(Utilities.send405);


Route.route('/reset')
	.get(SetupController.reset)
	.all(Utilities.send405);

Route.route('/active_survey')
	.get(SurveyController.getActiveSurveyData)
	.all(Utilities.send405);


Route.route('/vote/')
	.post(VoteController.vote)
	.all(Utilities.send405);

Route.route('/waiting_for_confirmation/')
	.get(VoteController.checkVoteTransactionStatus)
	.all(Utilities.send405);

module.exports = Route