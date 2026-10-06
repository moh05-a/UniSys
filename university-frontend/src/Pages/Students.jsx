import { useEffect, useState } from 'react'
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from '../services/api'

function Students() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [major, setMajor] = useState('')
  const [gpa, setGpa] = useState('')

  const [editingStudent, setEditingStudent] = useState(null)

  useEffect(() => {
    getStudents()
      .then(data => {
        setStudents(data)
      })
      .catch(error => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p>Loading students...</p>
  }

  async function handleAddStudent() {
    try {
      await createStudent({
        name: name,
        major: major,
        gpa: Number(gpa)
      })

      setName('')
      setMajor('')
      setGpa('')

      const data = await getStudents()
      setStudents(data)
    } catch (error) {
      setError(error.message)
    }
  }

  async function handleDeleteStudent(id) {
    try {
      await deleteStudent(id)

      const data = await getStudents()
      setStudents(data)
    } catch (error) {
      setError(error.message)
    }
  }

  async function handleUpdateStudent() {
    try {
      await updateStudent(editingStudent.id, {
        name: editingStudent.name,
        major: editingStudent.major,
        gpa: Number(editingStudent.gpa)
      })

      setEditingStudent(null)

      const data = await getStudents()
      setStudents(data)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <div className="page-header">
        <h2>Students</h2>
        <p>Manage university students</p>
      </div>

      {error && <p className="error">{error}</p>}

      {/* ADD STUDENT FORM */}
      <div className="students-form">
        <h3>Add Student</h3>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />

        <input
          type="number"
          placeholder="GPA"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
        />

        <button type="button" onClick={handleAddStudent}>
          ADD STUDENT
        </button>
      </div>

      {/* EDIT STUDENT FORM */}
      {editingStudent && (
        <div className="students-form">
          <h3>Edit Student</h3>

          <input
            type="text"
            placeholder="Name"
            value={editingStudent.name ?? ''}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                name: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Major"
            value={editingStudent.major ?? ''}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                major: e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="GPA"
            value={editingStudent.gpa ?? ''}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                gpa: e.target.value
              })
            }
          />

          <button type="button" onClick={handleUpdateStudent}>
            SAVE
          </button>

          <button
            type="button"
            onClick={() => setEditingStudent(null)}
          >
            CANCEL
          </button>
        </div>
      )}

      {/* STUDENTS TABLE */}
      <div className="students-table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Major</th>
              <th>GPA</th>
              <th>Subjects</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.major}</td>
                <td>{student.gpa}</td>
                <td>
                  {student.enrolledSubjectNames?.length ?? 0}
                </td>

                <td>
                  <button
                    onClick={() => setEditingStudent(student)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Students