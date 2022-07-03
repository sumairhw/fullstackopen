const DisplayContact = ({ name, phone, onClick }) => (
  <p>
    {name} {phone} <button onClick={onClick}>delete</button>
  </p>
);

export default DisplayContact;
