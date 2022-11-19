const Utilities = require('../Utilities')
const Survey = require('../models/Survey')

class VoteController {
    async vote(req, res) {
        try {
            const hasActiveSurvey = Survey.findOne({ concluded: false })
            if (!hasActiveSurvey) return Utilities.apiResponse(res, 422, 'No active survey is currently running')
            const voteChoice = req.body.voteChoice;
            console.log("TODO: create transaction")
            Utilities.apiResponse(res, 200, 'User Created Successfully!')
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }
}

module.exports = new VoteController();