/* eslint-disable react/prop-types */

const SuggestionList = (props) => {
    const { suggestions = [], dataKey, onSuggestionClick } = props

    return (
        <div>
            {suggestions.map((suggestion, index) => {
                const currentSuggestion = dataKey ? suggestion[dataKey] : suggestion;
                return (
                    <li key={index}
                        onClick={() => onSuggestionClick(suggestion)}
                        className="suggestion-item"
                    >
                        {currentSuggestion}
                    </li>
                )
            })}
        </div>
    )
}

export default SuggestionList
