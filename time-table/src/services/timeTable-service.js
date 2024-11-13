import { TimeTableRepository } from '../database/index.js'
import { FormateData } from '../utils/index.js'

// All Business logic will be here
class TimeTableService {
  constructor() {
    this.repository = new TimeTableRepository()
  }

  // Get timeTable by id
  async GetTimeTableById(studentId, semester, year) {
    const timeTableData = await this.repository.GetTimeTableById(
      studentId,
      semester,
      year
    )
    return FormateData(timeTableData)
  }

  // Create a new timeTable
  async CreateTimeTable(timeTableInputs) {
    // check if the timeTable already exists
    const timeTableData = await this.repository.GetTimeTableById(
      timeTableInputs.studentId,
      timeTableInputs.semester,
      timeTableInputs.year
    )

    if (
      !timeTableData.message ||
      timeTableData.message !== 'No records found'
    ) {
      return FormateData({
        message: 'TimeTable already exists',
      })
    }

    // Create a new timeTable
    const timeTableMessage = await this.repository.CreateTimeTable(
      timeTableInputs
    )
    return FormateData(timeTableMessage)
  }

  // Update a timeTable
  async UpdateTimeTable(studentId, semester, year, timeTableInputs) {
    // console.log('timeTableInputs:', timeTableInputs)
    const timeTableMessage = await this.repository.UpdateTimeTable({
      studentId,
      semester,
      year,
      timeTableInputs,
    })
    return FormateData(timeTableMessage)
  }

  // Delete a timeTable
  async DeleteTimeTable(studentId, semester, year) {
    const timeTableMessage = await this.repository.DeleteTimeTable(
      studentId,
      semester,
      year
    )
    return FormateData(timeTableMessage)
  }
}

export default TimeTableService
