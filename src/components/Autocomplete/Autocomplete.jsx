import { useState } from "react";
import './Autocomplete.css'

const Autocomplete = () => {


  const fetchRecipes = async (text) => {
    if(text.length > 0){
      const result = await fetch('https://dummyjson.com/recipes')
    const resJson = await result.json();
    const recipes = resJson.recipes

    const targetRecipes = recipes.filter((recipe) => recipe.name.includes(text))
    setRecipeName(targetRecipes)
    }

  }

  const [recipeName, setRecipeName] = useState([])

  return (
    <div>
      <h1>Autocomplete InputBox: </h1>
      <div>
        <input className="autocomplete-input" placeholder="Enter Recipes.." autoFocus onChange={(e) => fetchRecipes(e.target.value)}/>
        <div>
          {recipeName && recipeName.map((recipe, index) => {
            return (
              <p key={index}>{recipe.name}</p>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Autocomplete
