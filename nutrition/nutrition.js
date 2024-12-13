// Ingredient database with facts
const ingredientData = {
    sushi: {
        nutritionalFacts: "Sushi Rice ",
    },
    carrot: {
        nutritionalFacts: "Carrots are rich in beta-carotene, fiber, vitamin K1, and antioxidants.",
        healthBenefits: "Carrots are good for eye health, promoting healthy skin, and supporting immune function.",
        culinaryUses: "Carrots are used in soups, salads, juices, and can be roasted or steamed as a side dish."
    },
    spinach: {
        nutritionalFacts: "Spinach is packed with iron, vitamin K, folate, and vitamins A and C.",
        healthBenefits: "Spinach is great for bone health, improving blood pressure, and reducing oxidative stress.",
        culinaryUses: "Spinach is used in salads, smoothies, sautés, and in dishes like pasta and soups."
    },
    garlic: {
        nutritionalFacts: "Garlic is low in calories and high in vitamins C and B6, along with manganese and selenium.",
        healthBenefits: "Garlic is known for boosting the immune system, improving heart health, and reducing inflammation.",
        culinaryUses: "Garlic is commonly used in cooking to add flavor, especially in sauces, soups, and stir-fries."
    }
};

// Function to display ingredient facts
function displayIngredientFacts() {
    const ingredient = document.getElementById("ingredient").value;

    // Clear previous facts
    document.getElementById("nutritional-facts").textContent = '';
    document.getElementById("health-benefits").textContent = '';
    document.getElementById("culinary-uses").textContent = '';

    if (ingredient) {
        const facts = ingredientData[ingredient];
        document.getElementById("nutritional-facts").textContent = `Nutritional Facts: ${facts.nutritionalFacts}`;
    }
}
