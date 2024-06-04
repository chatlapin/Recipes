const container = document.querySelector(".container");
const inputSearch = document.getElementById("search-input"); // getElementById Highly specific (unique IDs) 	Generally faster and querySelector More flexible (CSS selectors) May be slower (depending on selector complexity)// getElementById Highly specific (unique IDs) 	Generally faster and querySelector More flexible (CSS selectors) May be slower (depending on selector complexity)
let currentRecipes = [];

// Fetch data from JSON file
fetch("assets/data/recipes.json")
  .then((response) => response.json())
  .then((data) => {
    currentRecipes = data;
    displayRecipes();
  });

// 각 요소 데이터를 쓰기
function displayRecipes() {
  // 컨테이너
  container.innerHTML = "";
  // recipesData 배열의 각 요소별 루프 처리
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

// 검색 입력 필드에 입력 이벤트 추가
inputSearch.addEventListener("input", () => {
  // 입력 필드의 값이 변경될 때마다 호출
  const searchValue = inputSearch.value.toLowerCase().trim();
  // 검색어가 포함된 레시피만 필터링
  currentRecipes = searchValue
    ? currentRecipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchValue)
      )
    : recipesData;
  displayRecipes();
});