const Utilities = require('../Utilities')
const Student = require('../models/Student')

class StudentController {

    async seedStudents(req, res) {
        console.log("Seeding students...")
        try {
            for (let i = 0; i < 20; i++) {
                const student = new Student()
                const savedStudent = await student.save()
                console.log(`Generate student: Address: ${savedStudent.address}; Pass: ${savedStudent.passphrase}`)
            }
        } catch (err) {
            console.log(err);
        }
    }

    async deleteAllStudents(req, res) {
        try {
            await Student.deleteMany();
            console.log('All Students deleted successfully');
        } catch (err) {
            console.log(err);
        }
    }
}


module.exports = new StudentController();