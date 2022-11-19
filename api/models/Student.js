const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const algosdk = require('algosdk');

const StudentSchema = new Schema({
  address: {
    type: String,
  },
  passphrase: {
    type: String,
  },
})

StudentSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const account = algosdk.generateAccount();
      const passphrase = algosdk.secretKeyToMnemonic(account.sk);
      console.log("Create student address: " + account.addr);
      console.log("create student passphrase: " + passphrase);
      console.log("---")
      this.address = account.addr
      this.passphrase = passphrase;
    }
    next()
  } catch (error) {
    next(error)
  }
})

StudentSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}

const Student = mongoose.model('student', StudentSchema)
module.exports = Student
