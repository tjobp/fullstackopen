const Phonebook = (props) => {
  return (
    <ul>
      {props.persons
        .filter((person) => {
          return person.name.toLowerCase().includes(props.filterText);
        })
        .map((person) => {
          return (
            <li key={person.id}>
              {person.name} {person.number}{" "}
              <button onClick={() => props.deletePerson(person)}>delete</button>
            </li>
          );
        })}
    </ul>
  );
};

export default Phonebook;
