import { capitalize } from "./utils.js";

// Each recipe data processing
function displayRecipes(currentRecipes) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  let i = 0;

  while (i < currentRecipes.length) {
    const recipeData = currentRecipes[i];

    container.innerHTML += `
      <div class="card">
        <div class="user-wrap">
          <div class="user-image">
            <img src="assets/photos/<span class="math-inline">\{recipeData\.image\}" alt\="</span>{recipeData.name}">
          </div>
          <div class="user-text">
            <span class="math-inline">\{recipeData\.time\} min
</div\>
</div\>
<div class\="card\-content"\>
<h2\></span>{recipeData.name}</h2>
          <h3>RECETTE</h3>
          <p>${recipeData.description}</p>
          <h3>INGRÉDIENTS</h3>
          <ul>
            ${recipeData.ingredients
              .map(
                (ingredient) => `
                <li>${ingredient.ingredient} : ${ingredient.quantity
                  ? ingredient.quantity + " " + (ingredient.unit || "")
                  : ""
                }</li>
              `
              )
              .join("")}
          </ul>
        </div>
      </div>
    `;

    i++;
  }

  document.querySelector('#counterResults').innerHTML = currentRecipes.length;
}

// Get appliance tags (lowercase and sorted)
function getAppareilsTags(currentRecipes) {
  let tagsAppareils = [];
  let i = 0;

  while (i < currentRecipes.length) {
    const recipe = currentRecipes[i];
    tagsAppareils.push(recipe.appliance.toLowerCase());
    i++;
  }

  tagsAppareils = [...new Set(tagsAppareils)]; // Remove duplicates
  tagsAppareils = tagsAppareils.sort((a, b) => a.localeCompare(b));
  return tagsAppareils;
}

// Display appliance tags
function displayAppareilsTags(appareilTags) {
  const tagsAppareilsContainer = document.querySelector('#panel-appareils');
  tagsAppareilsContainer.innerHTML = '';
  let i = 0;

  while (i < appareilTags.length) {
    const tag = appareilTags[i];
    tagsAppareilsContainer.innerHTML += `
      <li class="tag tag-appareil" data-valeur="<span class="math-inline">\{tag\}"\></span>{capitalize(tag)}</li>
    `;
    i++;
  }
}

// Get ingredient tags (lowercase and sorted)
function getIngredientsTags(currentRecipes) {
  let tagsIngredients = [];
  let i = 0;
  let j = 0;

  while (i < currentRecipes.length) {
    const recipe = currentRecipes[i];

    while (j < recipe.ingredients.length) {
      const ingredient = recipe.ingredients[j];
      tagsIngredients.push(ingredient.ingredient.toLowerCase());
      j++;
    }

    i++;
    j = 0; // Reset inner loop counter for each recipe
  }

  tagsIngredients = [...new Set(tagsIngredients)]; // Remove duplicates
  tagsIngredients = tagsIngredients.sort((a, b) => a.localeCompare(b));
  return tagsIngredients;
}

// Display ingredient tags
function displayIngredientsTags(tagsIngredients) {
  const tagsIngredientsContainer = document.querySelector('#panel-ingredients');
  tagsIngredientsContainer.innerHTML = '';
  let i = 0;

  while (i < tagsIngredients.length) {
    const tag = tagsIngredients[i];
    tagsIngredientsContainer.innerHTML += `
      <li class="tag tag-ingredient" data-valeur="<span class="math-inline">\{tag\}"\></span>{capitalize(tag)}</li>
    `;
    i++;
  }
}

// Get utensil tags (lowercase and sorted)
function getUstensilesTags(currentRecipes) {
  let tagsUstensiles = [];
  let i = 0;
  let j = 0;

  while (i < currentRecipes.length) {
    const recipe = currentRecipes[i];

    while (j < recipe.ustensils.length) {
      const ustensile = recipe.ustensils[j];
      tagsUstensiles.push(ustensile.toLowerCase());
      j++;
