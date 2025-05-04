import React from "react";

interface Person {
  name: string;
  number: string;
}

interface PersonsProps {
  personsToShow: Person[];
}

const Persons = ({ personsToShow }: PersonsProps) => {
  return (
    <div>
      {personsToShow.map((person, index) => (
        <p key={index}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
