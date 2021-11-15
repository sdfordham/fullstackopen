import React from 'react';

interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps): JSX.Element => {
  return <h1>{props.name}</h1>
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBaseWithDesc {
  name: string;
  exerciseCount: number;
  type: string;
  description: string;
}

interface CourseNormalPart extends CoursePartBaseWithDesc {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseWithDesc {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecial extends CoursePartBaseWithDesc {
  type: "special",
  requirements: string[]
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecial;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]

const Part = (props: CoursePart): JSX.Element => {
  switch (props.type) {
    case "normal":
      return (
        <div>
          <h3>{props.name} {props.exerciseCount}</h3>
          <p><i>{props.description}</i></p>
        </div>
      )
    case "groupProject":
      return (
        <div>
          <h3>{props.name} {props.exerciseCount}</h3>
          <p>Project exercises {props.groupProjectCount}</p>
        </div>
      )
    case "submission":
      return (
        <div>
          <h3>{props.name} {props.exerciseCount}</h3>
          <p><i>{props.description}</i></p>
          <p>Submit to {props.exerciseSubmissionLink}</p>
        </div>
      )
    case "special":
      return (
        <div>
          <h3>{props.name} {props.exerciseCount}</h3>
          <p><i>{props.description}</i></p>
          <p>Required skills: {props.requirements.join(', ')}</p>
        </div>
      )
  }
}

interface ContentProps {
  parts: Array<CoursePart>;
}

const Contents = (props: ContentProps): JSX.Element => {
  return (
    <div>
      {props.parts.map(part => {
          return <Part {...part} />
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

  return (
    <div>
      <Header name={courseName} />
      <Contents parts={courseParts} />
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

export default App;
