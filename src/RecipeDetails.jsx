import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function RecipeDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  

  // 1. Fetch the recipe data 
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setDetails(data.meals[0]);
    };

    fetchRecipeDetails();
  }, [id]);

 



  if (!details) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px', color: '#555' }}>Loading recipe...</h2>;
  }

  // Extracting Ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientName = details[`strIngredient${i}`];
    const ingredientMeasure = details[`strMeasure${i}`];
    if (ingredientName && ingredientName.trim() !== "") {
      ingredients.push({ name: ingredientName, measure: ingredientMeasure });
    }
  }

  // Splitting Instructions
  const instructionSteps = details.strInstructions
    .split('\n')
    .filter(step => step.trim() !== '');

  return (
    <div className="recipe-details-wrapper">
      <div className="recipe-details-container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <Link to="/" style={{ color: '#ff6b6b', textDecoration: 'none', fontWeight: 'bold' }}>
            ← Go Back to Search
          </Link>
        </div>

        <h1 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>{details.strMeal}</h1>
        
        { (details.strArea || details.strCategory) && (
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '30px' }}>
            {details.strArea && `${details.strArea} Food`}
            {details.strArea && details.strCategory && ' • '}
            {details.strCategory && `${details.strCategory}`}
          </p>
        )}

        <div className="details-image-section">
          <img 
            src={details.strMealThumb} 
            alt={details.strMeal} 
            className="details-image" 
          />
        </div>

        <div className="ingredients-section">
          <h3>Ingredients</h3>
          {ingredients.map((item, index) => (
            <div key={index} className="ingredient-item">
              <span style={{ fontWeight: 'bold', color: '#333' }}>{item.name}</span>
              <span>{item.measure}</span>
            </div>
          ))}
        </div>

        <div className="instructions-section">
          <h3>Cooking Instructions</h3>
          <ol className="instructions-list">
            {instructionSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

      </div>
    </div>
  );
}

export default RecipeDetails;