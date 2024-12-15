/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import './Autocomplete.css'
import SuggestionList from "./SuggestionList";
import debounce from 'lodash/debounce'

const Autocomplete = (props) => {

  const { placeholder, fetchSuggestions, staticSuggestions, dataKey, customLoading, onSelect, onBlur } = props


  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

  console.log("--sugg--", suggestions)


  const inputChangeHandler = (value) => {
    setInputValue(value)
  }

  const getSuggestions = useCallback(async (query) => {
    setLoading(true);
    setError(null);

    try {
      let recipes;
      if (staticSuggestions && staticSuggestions.length > 0) {
        recipes = staticSuggestions.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase())
        })
        setLoading(false);
      }
      else {
        recipes = await fetchSuggestions(query)
        setLoading(false)

        // TODO: to implement 'CACHING', save recipes to static data
      }
      setSuggestions(recipes)

    }
    catch (e) {
      setLoading(false)
      setError('Failed to fetch suggestions', e)
      setSuggestions([])
    }
  }, [staticSuggestions, fetchSuggestions])

  const getDebouncedResult = useCallback(debounce(getSuggestions, 300), []);

  useEffect(() => {
    if (inputValue.length > 1) {
      getDebouncedResult(inputValue)
    }
    else {
      setSuggestions([])
    }
    return () => {
      getDebouncedResult.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  const handleSuggestionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : suggestion)
    onSelect(suggestion);
    setSuggestions([])

  }


  return (
    <div>
      <h1>Autocomplete InputBox: </h1>
      <div>
        <input
          type="text"
          className="autocomplete-input"
          value={inputValue}
          placeholder={placeholder}
          autoFocus
          onChange={(e) => inputChangeHandler(e.target.value)}
          onFocus={onfocus}
          onBlur={onBlur}

        />
        <ul>
          {error && <div className="error">{error}</div>}
          {loading && <div className="error">{customLoading}</div>}
          <SuggestionList suggestions={suggestions}
            dataKey={dataKey}
            onSuggestionClick={
              handleSuggestionClick
            }
          />
        </ul>
      </div>
    </div>
  )
}

export default Autocomplete
