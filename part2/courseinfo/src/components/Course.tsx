// Define types for our data structure
interface CoursePartProps {
  id: number;
  name: string;
  exercises: number;
}

interface CourseProps {
  id: number;
  name: string;
  parts: CoursePartProps[];
}

// Header component
const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>;
};

// Content component displays all parts
const Content = ({ parts }: { parts: CoursePartProps[] }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

// Part component for individual course parts
const Part = ({ part }: { part: CoursePartProps }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

// Total component calculates sum of exercises
const Total = ({ parts }: { parts: CoursePartProps[] }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <strong>Total of {totalExercises} exercises</strong>
    </p>
  );
};

// Course component combines all the other components
const Course = ({ course }: { course: CourseProps }) => {
  return (
    <div className='course'>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
