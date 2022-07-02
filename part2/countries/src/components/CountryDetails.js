const CountryDetails = ({ country }) => {
  const languages = Object.values(country['languages'])
  return (
    <div>
      <h2>{country['name']['common']}</h2>
      <p>Capital : {country['capital'][0]}</p>
      <p>Area : {country['area']}</p>
      <h4>Languages</h4>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <h3>Flag</h3>
      <img src={country['flags']['png']} alt='flag' />
    </div>
  )
}
export default CountryDetails
