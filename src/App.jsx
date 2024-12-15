import Autocomplete from './components/Autocomplete/Autocomplete'

function App() {


  // TODO: USE IT FOR CACHING
  const staticSuggestions = []


  const fetchSuggestions = async (text) => {
    const result = await fetch(`https://dummyjson.com/recipes/search?q=${text}`)
    if (!result.ok) throw new Error("Network request failed")
    const resJson = await result.json();
    const recipes = resJson.recipes
    return recipes

  }

  return (
    <>
      <div>
        <Autocomplete
          placeholder={'Enter Recipe...'}
          fetchSuggestions={(inputValue) => fetchSuggestions(inputValue)}
          dataKey={'name'}
          customLoading={<>Loading...</>}
          onSelect={(res) => console.log(res)}
          staticSuggestions={staticSuggestions}
        />
      </div>
    </>
  )
}

export default App
