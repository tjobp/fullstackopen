import { useState, useEffect } from "react";
import FormAddPerson from "./components/FormAddPerson";
import Filter from "./components/Filter";
import Phonebook from "./components/Phonebook";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const NOTIFICATION_SUCCESS = "notificationSuccess";
  const NOTIFICATION_ERROR = "notificationError";
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] =
    useState(NOTIFICATION_SUCCESS);

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = getExistingPerson();

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .update(existingPerson.id, newPerson)
          .then((response) => {
            setPersons(
              persons.map((person) => {
                return person.id !== existingPerson.id ? person : response.data;
              })
            );
            setNotificationMessage(`${newName} was successfully updated`);
            setNotificationType(NOTIFICATION_SUCCESS);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setNotificationMessage(
              `${newName} was already removed from server`
            );
            setNotificationType(NOTIFICATION_ERROR);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          });
      }
      return;
    }

    personsService
      .create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
        setNotificationMessage(`${newName} was successfully added`);
        setNotificationType(NOTIFICATION_SUCCESS);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setNotificationMessage(`Error adding ${newName} to the server`);
        setNotificationType(NOTIFICATION_ERROR);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
  };

  const deletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService
        .deletePerson(personToDelete.id)
        .then(() => {
          setPersons(
            persons.filter((person) => person.id !== personToDelete.id)
          );
          setNotificationMessage(
            `${personToDelete.name} was successfully deleted`
          );
          setNotificationType(NOTIFICATION_SUCCESS);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setNotificationMessage(
            `Error deleting ${personToDelete.name} from the server`
          );
          setNotificationType(NOTIFICATION_ERROR);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };

  const getExistingPerson = () => {
    return persons.find((person) => {
      return person.name === newName;
    });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification type={notificationType} message={notificationMessage} />
      <div>
        Filter phonebook:
        <Filter value={filterText} onChange={handleFilterTextChange} />
      </div>
      <h2>Add person to Phonebook</h2>
      <div>
        <FormAddPerson
          onSubmit={addPerson}
          name={newName}
          nameChange={handleNameChange}
          number={newNumber}
          numberChange={handleNumberChange}
        />
      </div>
      <h2>Numbers</h2>
      <div>
        <Phonebook
          persons={persons}
          filterText={filterText}
          deletePerson={deletePerson}
        />
      </div>
    </div>
  );
};

export default App;
