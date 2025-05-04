import React from "react";

interface Person {
  id?: number;
  name: string;
  number: string;
}

interface PersonsProps {
  personsToShow: Person[];
  deletePerson: (id: number, name: string) => void;
}

const Persons = ({ personsToShow, deletePerson }: PersonsProps) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
          <button
            onClick={() => person.id && deletePerson(person.id, person.name)}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
