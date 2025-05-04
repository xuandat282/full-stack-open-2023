import React from "react";

interface PersonFormProps {
  addPerson: (event: React.FormEvent) => void;
  newName: string;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newNumber: string;
  handleNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}: PersonFormProps) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
