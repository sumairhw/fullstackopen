const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <TotalExercises parts={course.parts} />
  </div>
)

const Header = ({ name }) => <h2>{name}</h2>

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </div>
)
const TotalExercises = ({ parts }) => {
  const total = parts.reduce((total, part) => (total += part.exercises), 0)
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  )
}
const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
)

export default Course
