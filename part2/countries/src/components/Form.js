const Form = ({ onChange, value }) => (
  <div>
    <form>
      Search : <input onChange={onChange} value={value} />
    </form>
  </div>
)

export default Form
