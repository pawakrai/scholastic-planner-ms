import { client } from '../index.js'

// Dealing with database operations
class TimeTableRepository {
  // Get course by ID
  async GetTimeTableById(studentId, semester, year) {
    const query = `
      SELECT
        t.studentid AS studentId,
        t.semester,
        t.year,
        t.subjects
      FROM
        timeTable t
      WHERE
        t.studentid = $1
        AND t.semester = $2
        AND t.year = $3;
    `

    try {
      // Execute the query with the provided parameters
      const result = await client.query(query, [
        studentId,
        semester,
        parseInt(year),
      ])

      // Check if a record was found
      if (result.rows.length === 0) {
        return { message: 'No records found' }
      }

      // Return the first row (since we expect only one result)
      return result.rows[0]
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error fetching timetable:', error)

      // Return an error message or throw an error depending on your use case
      return { message: 'Error fetching timetable', error }
    }
  }

  // Create a new Timetable
  async CreateTimeTable(data) {
    const timeTableInsert = `
      INSERT INTO timeTable (studentId, semester, year, subjects)
      VALUES ($1, $2, $3, $4);
    `

    try {
      // Execute the query with the provided data
      await client.query(timeTableInsert, [
        data.studentId,
        data.semester,
        data.year,
        JSON.stringify(data.subjects), // Convert subjects to JSON string
      ])

      // Return success message if no errors occur
      return { message: 'All records inserted successfully' }
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error inserting data:', error)

      // Return an error message or throw an error depending on your use case
      return { message: 'Error inserting records', error }
    }
  }

  // Update a timeTable
  async UpdateTimeTable(data) {
    const { subjects } = data.timeTableInputs

    const updateQuery = `
      UPDATE timeTable
      SET subjects = $1
      WHERE studentId = $2
        AND semester = $3
        AND year = $4;
    `

    try {
      // Execute the update query with parameters
      const result = await client.query(updateQuery, [
        JSON.stringify(subjects), // Convert subjects to JSON string before updating
        data.studentId, // Condition: original student ID to match
        data.semester, // Condition: original semester to match
        parseInt(data.year), // Condition: original year to match
      ])

      if (result.rowCount === 0) {
        return {
          message: 'No records were updated. Check if the record exists.',
        }
      }

      return { message: 'Subjects updated successfully' }
    } catch (error) {
      console.error('Error updating subjects:', error)
      return { message: 'Error updating subjects', error }
    }
  }

  // Delete a timeTable
  async DeleteTimeTable(studentId, semester, year) {
    try {
      const deleteScript = `DELETE FROM timeTable WHERE studentId = $1 AND semester = $2 AND year = $3`
      await client.query(deleteScript, [studentId, semester, year])
      return { message: 'delete successfully' }
    } catch (err) {
      console.error('Error deleting rows:', err)
      return { message: 'Error deleting records', err }
    }
  }
}

export default TimeTableRepository
