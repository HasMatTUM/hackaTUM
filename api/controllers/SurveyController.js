const Utilities = require('../Utilities')
const Survey = require('../models/Survey')

class SurveyController {

    async getActiveSurveyData(req, res) {
        try {
            // TODO: get survey information from Contract
            const surveyInfo = await Survey.findOne({ concluded: false })
            Utilities.apiResponse(res, 200, 'Active Survey', surveyInfo)
        } catch (err) {
            console.log(err);

        }
    }

    async seedSurvey(req, res) {
        console.log("Creating default survey ...")
        try {
            const survey = new Survey({ title: "Do you want hackaTUM to happen four times per year?", description: "Some students really REALLY dig it!" })
            const savedSurvey = await survey.save()
            console.log(`Generate dummy survey: Title: ${savedSurvey.title}; Description: ${savedSurvey.description}`)
        } catch (err) {
            console.log(err);
        }
    }

    async deleteAllSurveys(req, res) {
        try {
            await Survey.deleteMany();
            console.log('All surveys deleted.');
        } catch (err) {
            console.log(err);
        }
    }
}


module.exports = new SurveyController();