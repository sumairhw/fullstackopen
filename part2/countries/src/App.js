import { useEffect, useState } from 'react'
import axios from 'axios'
import Form from './components/Form'
import ShowCountries from './components/ShowCountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    const api = 'https://restcountries.com/v3.1/all'
    axios.get(api).then((response) => setCountries(response.data))
  }, [])

  const handleSearch = (event) => {
    // console.log('inside handler', event.target.value)
    // console.log('qeury before', query)
    setQuery(event.target.value.toLowerCase())
    // setQuery(event.target.value.toLowerCase())
    // console.log('qeury after', query)

    // const filtered = countries.filter(
    //   (country) =>
    //     country['name']['common'].toLowerCase().indexOf(event.target.value) !==
    //     -1
    // )
    // console.log(filtered.map((c) => c['name']['common']))
    // // setFiltered(filtered)
    // const c = filtered.map((c) => c['name']['common'])
    // console.log('inside handler', query, c)
  }

  return (
    <>
      <h1>Countries API</h1>
      <Form onChange={handleSearch} value={query} />
      <ShowCountries input={query} countries={countries} />
    </>
  )
}

export default App
