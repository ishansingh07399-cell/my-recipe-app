import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
    const data = await response.json();
    
    setRecipes(data.meals || []);
  };

  console.log("Current recipes array:", recipes);
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#ff6b6b' }}>My Recipe Finder</h1>
      
      {/* Search Area */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a recipe (e.g. chicken)..."
        />
        <button className="search-btn" onClick={fetchRecipes}>Search</button>
      </div>

      {/* No Results Message */}
      {recipes.length === 0 && (
        <h3 style={{ textAlign: 'center', color: '#888' }}>
          No recipes found. Try searching for something else!
        </h3>
      )}

      {/* Recipe Grid & Cards */}
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <Link 
            to={`/recipe/${recipe.idMeal}`} 
            key={recipe.idMeal} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="recipe-card">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h3>{recipe.strMeal}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;