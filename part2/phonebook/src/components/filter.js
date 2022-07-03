const Filter = ({ onSubmit, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      Search : <input onChange={onChange} />
      <br /> <br />
      <button type='submit'>Search</button>
    </form>
  )
}

export default Filter
