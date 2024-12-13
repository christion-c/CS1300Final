// Select input, button, and recipe container
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const recipeContainer = document.getElementById("recipeContainer");

// Add an event listener for the button
searchButton.addEventListener("click", async () => {
    // Get user input
    const query = searchInput.value.trim();

    // Handle bad input
    if (!query) {
        recipeContainer.innerHTML = `<p>Please enter a recipe name.</p>`;
        return;
    }

    // API URL
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    try {
        const response = await fetch(apiUrl); // Fetch data from API
        const data = await response.json(); // Convert response to JSON

        if (data.meals) {
            // Render the list of recipes
            recipeContainer.innerHTML = data.meals.map(meal => `
                <div class="recipe">
                    <h2>${meal.strMeal}</h2>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="300">
                    <button onclick="showIngredients('${meal.idMeal}')">View Ingredients</button>
                </div>
            `).join(""); // Join all recipe cards into a single string
        } else {
            recipeContainer.innerHTML = `<p>No recipes found for "${query}".</p>`;
        }
    } catch (error) {
        console.error("Error fetching recipes:", error);
        recipeContainer.innerHTML = `<p>Error fetching recipe data.</p>`;
    }
});

// Function to show only ingredients of a single recipe
async function showIngredients(mealId) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const meal = data.meals[0];

        recipeContainer.innerHTML = `
            <h2>${meal.strMeal} - Ingredients</h2>
            <ul>
                ${getIngredients(meal).map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <button onclick="searchButton.click()">Back to Search Results</button>
        `;
    } catch (error) {
        console.error("Error fetching meal details:", error);
        recipeContainer.innerHTML = `<p>Error fetching recipe details.</p>`;
    }
}

// Function to get ingredients and measurements
function getIngredients(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${ingredient} - ${measure}`);
        }
    }
    return ingredients;
}
