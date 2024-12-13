const apiKey = "BBUBdSjNqcCSNeO4WkunHw==dwQzTN72xB5vmvq3Y"; 

const searchBtn = document.getElementById('searchBtn');
const dishInput = document.getElementById('dishInput');
const nutritionResults = document.getElementById('nutritionResults');

// Function to fetch nutrition data from the API
async function getNutritionData(dish) {
    const apiUrl = `https://api.calorieninjas.com/v1/nutrition?query=${dish}`;

    const options = {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey
        }
    };

    try {
        const response = await fetch(apiUrl, options); //Corrected variable bs
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            displayNutritionFacts(data.items[0]);
        } else {
            nutritionResults.innerHTML = "<p>No nutrition information found for this dish.</p>";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        nutritionResults.innerHTML = "<p>Error fetching data. Please try again later.</p>";
    }
}

// Function to display the nutrition facts on the webpage
function displayNutritionFacts(item) {
    const { name, calories, protein_g, fat_g, carbohydrates_g, sugar_g, fiber_g } = item;
    
    let nutritionText = `<h2>Nutrition Facts for ${name}</h2>`;
    nutritionText += `
        <p><strong>Calories:</strong> ${calories} kcal</p>
        <p><strong>Protein:</strong> ${protein_g} g</p>
        <p><strong>Fat:</strong> ${fat_g} g</p>
        <p><strong>Carbohydrates:</strong> ${carbohydrates_g} g</p>
        <p><strong>Sugar:</strong> ${sugar_g} g</p>
        <p><strong>Fiber:</strong> ${fiber_g} g</p>
    `;

    nutritionResults.innerHTML = nutritionText;
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    const dish = dishInput.value.trim();
    
    if (dish) {
        getNutritionData(dish);
    } else {
        nutritionResults.innerHTML = "<p>Please enter a dish name.</p>";
    }
});

// Allow the user to press Enter to search
dishInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});
