const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SurveySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  valid_until: {
    type: Date,
    required: false,
  },
  yes_votes: {
    type: Number,
    required: true,
    default: 0
  },
  no_votes: {
    type: Number,
    required: true,
    default: 0
  },
  pass_votes: {
    type: Number,
    required: true,
    default: 0
  },
  concluded: {
    type: Boolean,
    required: true,
    default: false
  },

})

SurveySchema.pre('save', async function (next) {
  try {
    next()
  } catch (error) {
    next(error)
  }
})

SurveySchema.methods.isConcluded = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}

const Survey = mongoose.model('survey', SurveySchema)
module.exports = Survey