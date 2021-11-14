import React from 'react';

interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps): JSX.Element => {
  return <h1>{props.name}</h1>
}

interface CoursePart{
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: Array<CoursePart>;
}

const Contents = (props: ContentProps): JSX.Element => {
  return (
    <div>
      {props.parts.map(part => {
          return <p>{part.name} {part.exerciseCount}</p>
      })}
    </div>
  )
}

interface TotalProps {
  total: number;
}

const Total = (props: TotalProps) => {
  return (
    <p>
    Number of exercises{" "}{props.total}
    </p>
  )
}

const App = () => {
  const courseName: string = "Half Stack application development";
  const courseParts: Array<CoursePart> = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Contents parts={courseParts} />
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}/>
    </div>
  );
};

export default App;
