const Utilities = require('../Utilities')
const StudentController = require('./StudentController')
const SurveyController = require('./SurveyController')

class SetupController {
    async reset(req, res) {
        try {
            await StudentController.deleteAllStudents();
            await SurveyController.deleteAllSurveys();
            await SurveyController.seedSurvey();
            await StudentController.seedStudents();
            Utilities.apiResponse(res, 200, 'Application refreshed!')
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }
}

module.exports = new SetupController();