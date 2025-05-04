import "./App.css";

// Header component for displaying the course name
const Header = (props: { course: string }) => {
  return <h1>{props.course}</h1>;
};

// Part component for displaying a single part and its exercises
const Part = (props: { part: { name: string; exercises: number } }) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

// Content component for displaying all parts using Part components
const Content = (props: {
  parts: Array<{ name: string; exercises: number }>;
}) => {
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  );
};

// Total component for displaying the sum of all exercises
const Total = (props: { parts: Array<{ exercises: number }> }) => {
  return (
    <p>
      Number of exercises{" "}
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
