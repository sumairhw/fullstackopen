const PersonForm = ({
  onSubmit,
  handleNameChange,
  handleNumberChange,
  newName,
  newPhone,
}) => {
  return (
    <form onSubmit={onSubmit}>
      name : <input onChange={handleNameChange} value={newName} />
      <br /> <br />
      phone : <input onChange={handleNumberChange} value={newPhone} />
      <br /> <br />
      <button type='submit'>Add</button>
    </form>
  )
}

export default PersonForm
