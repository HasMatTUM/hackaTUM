const Utilities = require('../Utilities')
const Survey = require('../models/Survey')
const SmartContractController = require('./SmartContractController')

class VoteController {
    async vote(req, res) {
        try {
            const hasActiveSurvey = await Survey.findOne({ concluded: false })
            if (!hasActiveSurvey) return Utilities.apiResponse(res, 422, 'No active survey is currently running')
            const txId = await SmartContractController.call_vote(req);
            Utilities.apiResponse(res, 200, "Vote submitted succesfully: TX ID", txId)
            // TODO create transaction to blockchain
        } catch (error) {
            Utilities.apiResponse(res, 500, error)

        }
    }


    async checkVoteTransactionStatus(req, res) {
        try {
            const hasActiveSurvey = await Survey.findOne({ concluded: false })
            if (!hasActiveSurvey) return Utilities.apiResponse(res, 422, 'No active survey is currently running')

            // Todo is vote done
            const pollDone = false; // Replace with call to view function of smart contract

            if (pollDone) {
                redirect("/transaction_confirmed");
            }
            Utilities.apiResponse(res, 200, "Still waiting for confirmation.")
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }
}

module.exports = new VoteController();