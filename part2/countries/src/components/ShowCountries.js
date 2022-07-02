import CountryDetails from './CountryDetails'

const ShowCountries = ({ input, countries }) => {
  const filtered = countries.filter(
    (country) => country['name']['common'].toLowerCase().indexOf(input) !== -1
  )

  console.log(input, filtered)
  const len = filtered.length
  if (len === 0 || input === '') return null
  if (len === 1) return <CountryDetails country={filtered[0]} />
  else if (len > 10) return <div>Too many matches, specify another filter</div>
  else
    return filtered.map((country) => (
      <p key={country['name']['official']}>{country['name']['common']}</p>
    ))
}

export default ShowCountries
