import { useState, useEffect } from "react";
import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

interface Person {
  id?: number;
  name: string;
  number: string;
}

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        showNotification("Failed to fetch data from server", "error");
        console.error("Error fetching persons:", error);
      });
  }, []);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: null });
    }, 5000);
  };

  const addPerson = (event: React.FormEvent) => {
    event.preventDefault();

    // Check for duplicate names
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personsService
          .update(existingPerson.id as number, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            showNotification(
              `Updated ${returnedPerson.name}'s number`,
              "success"
            );
          })
          .catch((error) => {
            showNotification(
              `Information of ${newName} has already been removed from server`,
              "error"
            );
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personsService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        showNotification(`Added ${returnedPerson.name}`, "success");
      })
      .catch((error) => {
        showNotification("Failed to add person", "error");
        console.error("Error adding person:", error);
      });
  };

  const deletePerson = (id: number, name: string) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          showNotification(`Deleted ${name}`, "success");
        })
        .catch((error) => {
          showNotification(
            `Information of ${name} has already been removed from server`,
            "error"
          );
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  const Notification = ({
    message,
    type,
  }: {
    message: string;
    type: "success" | "error" | null;
  }) => {
    if (message === "" || !type) {
      return null;
    }

    const notificationStyle = {
      color: type === "error" ? "red" : "green",
      background: "lightgrey",
      fontSize: "20px",
      borderStyle: "solid",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
    };

    return <div style={notificationStyle}>{message}</div>;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
