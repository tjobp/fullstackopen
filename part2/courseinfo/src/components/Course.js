const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => {
        return (
          <Part
            key={part.id}
            partName={part.name}
            exercises={part.exercises}
          ></Part>
        );
      })}
    </div>
  );
};

const Total = ({ value }) => {
  return (
    <p>
      <strong>Total of {value} exercises</strong>
    </p>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.partName} {props.exercises}
    </p>
  );
};

const Course = ({ course }) => (
  <div>
    <Header courseName={course.name}></Header>
    <Content parts={course.parts}></Content>
    <Total
      value={course.parts.reduce((sum, part) => {
        return (sum += part.exercises);
      }, 0)}
    ></Total>
  </div>
);

export default Course;
