import { capitalize } from "./utils.js";
// 각 요소 데이터를 쓰기
function displayRecipes(currentRecipes) {
    const container = document.querySelector(".container");
    // 컨테이너
    container.innerHTML = "";
    // recipesData 배열의 각 요소별 루프 처리
    currentRecipes.forEach((recipeData) => {
        // 각 요소 데이터를 쓰기
        container.innerHTML += `
        <div class="card">
          <div class="user-wrap">
          <div class="user-image">
            <img src="assets/photos/${recipeData.image}" alt="${recipeData.name}">
            </div>
            <div class="user-text">
          ${recipeData.time} min 
        </div> 
            </div>
            <div class="card-content">
            <h2>${recipeData.name}</h2>
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
    `;
    });

    document.querySelector('#counterResults').innerHTML = currentRecipes.length;
}

function displayTags(currentRecipes) {
    const tagsAppareilsContainer = document.querySelector('#panel-appareils');
    tagsAppareilsContainer.innerHTML = '';
    let tagsAppareils = [];
  
    for (let i = 0; i < currentRecipes.length; i++) {
      tagsAppareils.push(currentRecipes[i].appliance);
    }
  
    tagsAppareils = [...new Set(tagsAppareils)]; // Remove duplicates
  
    let tagHtml = ''; // Create a string to store all tags
    for (let i = 0; i < tagsAppareils.length; i++) {
      tagHtml += `
        <li class="tag tag-appareil" data-valeur="${tagsAppareils[i]}">${capitalize(tagsAppareils[i])}</li>
      `;
    }
    tagsAppareilsContainer.innerHTML = tagHtml; // Set the innerHTML once at the end
  
    // Repeat the same logic for ingredients and ustensiles containers
    const tagsIngredientsContainer = document.querySelector('#panel-ingredients');
    tagsIngredientsContainer.innerHTML = '';
    let tagsIngredients = [];
  
    for (let i = 0; i < currentRecipes.length; i++) {
      for (let j = 0; j < currentRecipes[i].ingredients.length; j++) {
        tagsIngredients.push(currentRecipes[i].ingredients[j].ingredient);
      }
    }
  
    tagsIngredients = [...new Set(tagsIngredients)];
  
    let ingredientHtml = '';
    for (let i = 0; i < tagsIngredients.length; i++) {
      ingredientHtml += `
        <li class="tag tag-ingredient" data-valeur="${tagsIngredients[i]}">${capitalize(tagsIngredients[i])}</li>
      `;
    }
    tagsIngredientsContainer.innerHTML = ingredientHtml;
  
    const tagsUstensilesContainer = document.querySelector('#panel-ustensiles');
    tagsUstensilesContainer.innerHTML = '';
    let tagsUstensiles = [];
  
    for (let i = 0; i < currentRecipes.length; i++) {
      for (let j = 0; j < currentRecipes[i].ustensils.length; j++) {
        tagsUstensiles.push(currentRecipes[i].ustensils[j]);
      }
    }
  
    tagsUstensiles = [...new Set(tagsUstensiles)];
  
    let ustensileHtml = '';
    for (let i = 0; i < tagsUstensiles.length; i++) {
      ustensileHtml += `
        <li class="tag tag-ustensile" data-valeur="${tagsUstensiles[i]}">${capitalize(tagsUstensiles[i])}</li>
      `;
    }
    tagsUstensilesContainer.innerHTML = ustensileHtml;
  }
  
  function displayTagsRecipes(currentRecipes) {
    displayRecipes(currentRecipes);
    displayTags(currentRecipes);
  }
  
export { displayTagsRecipes };

