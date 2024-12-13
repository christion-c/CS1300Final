
const API_URL = 'https://foodfacts-foodfacts-v1.p.rapidapi.com/food_products_per_search_term/format/json'; 

async function getNutritionalInfo() {
  const ingredient = document.getElementById('ingredient-input').value.trim();
  if (!ingredient) {
    alert("Please enter an ingredient.");
    return;
  }

  const nutritionalInfoDiv = document.getElementById('nutritional-info');
  nutritionalInfoDiv.innerHTML = 'Loading...';
  try {
    const response = await fetch(`${API_URL}https://foodfacts-foodfacts-v1.p.rapidapi.com/food_products_per_search_term/format/json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: [{ food: ingredient }]
      })
    });

    const data = await response.json();

    if (data && data.parsed) {
      const nutrients = data.parsed[0].food.nutrients;
      displayNutritionalInfo(nutrients);
    } else {
      nutritionalInfoDiv.innerHTML = 'Sorry, nutritional info not found for this ingredient.';
    }
  } catch (error) {
    console.error(error);
    nutritionalInfoDiv.innerHTML = 'Error retrieving nutritional data.';
  }
}

// Function to display nutritional info
function displayNutritionalInfo(nutrients) {
  const nutritionalInfoDiv = document.getElementById('nutritional-info');
  nutritionalInfoDiv.innerHTML = '';

  const nutrientKeys = [
    { label: 'Calories', key: 'ENERC_KCAL' },
    { label: 'Protein (g)', key: 'PROCNT' },
    { label: 'Fat (g)', key: 'FAT' },
    { label: 'Carbohydrates (g)', key: 'CHOCDF' },
    { label: 'Fiber (g)', key: 'FIBTG' },
    { label: 'Sugar (g)', key: 'SUGAR' },
  ];

  nutrientKeys.forEach((nutrient) => {
    const value = nutrients[nutrient.key];
    if (value) {
      const div = document.createElement('div');
      div.classList.add('nutritional-item');
      div.textContent = `${nutrient.label}: ${value.toFixed(2)} ${nutrient.key === 'ENERC_KCAL' ? 'kcal' : 'g'}`;
      nutritionalInfoDiv.appendChild(div);
    }
  });
}
