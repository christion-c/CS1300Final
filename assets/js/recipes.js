// Select the button and output container
const button = document.getElementById("getRecipe");
const recipeContainer = document.getElementById("recipeContainer");

// Add an event listener to the button
button.addEventListener("click", async () => {
    const apiUrl = "www.themealdb.com/api/json/v1/1/search.php?s="; // API link

    try {
        const response = await fetch(apiUrl); // Fetch data from the API
        const data = await response.json(); // convert response to JSON

        if (data.meals) {
            const meal = data.meals[0];

            // Render the meal details
            recipeContainer.innerHTML = `
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="300">
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Area:</strong> ${meal.strArea}</p>
                <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
                <p><strong>Ingredients:</strong></p>
                <ul>
                    ${getIngredients(meal).map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            `;
        } else {
            recipeContainer.innerHTML = `<p>No recipe found</p>`;
        }
    } catch (error) {
        console.error("error fetching recipe:", error);
        recipeContainer.innerHTML = `<p>Error fetching recipe data.</p>`;
    }
});

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