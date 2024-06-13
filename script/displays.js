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

function getAppareilsTags(currentRecipes) {
    let tagsAppareils = [];
    currentRecipes.forEach(recipe => {
        tagsAppareils.push(recipe.appliance);
    });
    tagsAppareils = [...new Set(tagsAppareils)];//supprimer les doublons, Set est un objet qui permet de stocker des valeurs uniques
    return tagsAppareils;
}

function displayAppareilsTags(appareilTags) {
    const tagsAppareilsContainer = document.querySelector('#panel-appareils');
    tagsAppareilsContainer.innerHTML = '';
    appareilTags.forEach(tag => {
        tagsAppareilsContainer.innerHTML += `
        <li class="tag tag-appareil" data-valeur="${tag}">${capitalize(tag)}</li>
        `;
    });
}

function getIngredientsTags(currentRecipes) {
    let tagsIngredients = [];
    currentRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            tagsIngredients.push(ingredient.ingredient);
        });
    });
    tagsIngredients = [...new Set(tagsIngredients)];//supprimer les doublons, Set est un objet qui permet de stocker des valeurs uniques
    return tagsIngredients;
}
function displayIngredientsTags(tagsIngredients) {
    const tagsIngredientsContainer = document.querySelector('#panel-ingredients');
    tagsIngredientsContainer.innerHTML = '';
    tagsIngredients.forEach(tag => {
        tagsIngredientsContainer.innerHTML += `
        <li class="tag tag-ingredient" data-valeur="${tag}">${capitalize(tag)}</li>
        `;
    });
}



//display tags
function displayTags(currentRecipes) {
    const tagsUstensilesContainer = document.querySelector('#panel-ustensiles');
    tagsUstensilesContainer.innerHTML = '';
    let tagsUstensiles = [];
    currentRecipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensile => {
            tagsUstensiles.push(ustensile);
        });
    });
    tagsUstensiles = [...new Set(tagsUstensiles)];
    tagsUstensiles.forEach(tag => {
        tagsUstensilesContainer.innerHTML += `
        <li class="tag tag-ustensile" data-valeur="${tag}">${capitalize(tag)}</li>
        `;
    })

}

function displayTagsRecipes(currentRecipes) {
    displayRecipes(currentRecipes);
    displayTags(currentRecipes);
}

export { displayAppareilsTags, displayIngredientsTags, displayTagsRecipes, getAppareilsTags, getIngredientsTags };

