const FormAddPerson = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        Name: <input value={props.name} onChange={props.nameChange} />
      </div>
      <div>
        Number: <input value={props.number} onChange={props.numberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default FormAddPerson;
