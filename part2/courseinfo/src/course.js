import React from 'react'

const Course = ({ course }) => {
    const parts = course.parts
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    return (
      <div>
        <h2>{course.name}</h2>
        {parts.map((part) =>
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )}
        <p>
          <b>
            total of {parts.map(e => (e.exercises)).reduce(reducer)} exercises
          </b>
        </p>
      </div>
    )
  }

  export default Course;