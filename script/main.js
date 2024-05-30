let currentRecipes = [];

async function getInitialRecipes() {
  const response = await fetch("./assets/data/recipes.json");
  const recipes = await response.json();
  return recipes;
}

async function init() {
  currentRecipes = await getInitialRecipes();
  //console.log("currentRecipes");
  //console.log(currentRecipes);
  displayRecipes();
}

init();

const inputSearch = document.querySelector("#search-input");
inputSearch.addEventListener("input", searchRecipes);
function searchRecipes(event) {
  const searchValue = event.target.value.toLowerCase();
  if (searchValue.length < 3) {
    return;
  }
  console.log("searchValue");
  console.log(searchValue);
  currentRecipes = currentRecipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchValue) ||
      recipe.description.toLowerCase().includes(searchValue) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(searchValue)
      )
  );
  displayRecipes();
}

function displayRecipes() {
  const counterResults = document.querySelector("#counterResults");
  counterResults.innerText = currentRecipes.length;

  // 컨테이너
  const container = document.querySelector(".container");
  container.innerHTML = "";
  // recipesDatat 배열의 각 요소별 루프 처리
  currentRecipes.forEach((recipeData) => {
    // 각 요소 데이터를 쓰기
    container.innerHTML += `
        <div class="card">
          <img src="assets/photos/${recipeData.image}" alt="${recipeData.name}">
          <h2>${recipeData.name}</h2>
          <h3>RECETTE</h3>
          <p>${recipeData.description}</p>
          <h3>INGRÉDIENTS</h3>
          <ul>
            ${recipeData.ingredients
              .map(
                (ingredient) => `
                <li>${ingredient.ingredient} : ${
                  ingredient.quantity
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
}
/*
// Function to update displayed cards
function updateCards(recipes) {
  container.innerHTML = "";
  recipes.forEach((recipe, index) => {
    container.innerHTML += generateRecipeHTML(recipe, images[index]);
  });
}}
*/
/*
const filterButtons = document.querySelectorAll(".filters button");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active"); // Toggle "active" class on click
  });
});
*/
