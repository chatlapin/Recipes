// 컨테이너
const container = document.querySelector(".container");

// recipesDatat 배열의 각 요소별 루프 처리
recipesData.forEach((recipesData) => {

  // 각 요소 데이터를 쓰기
  container.innerHTML += `
        <div class="card">
          <img src="assets/photos/${recipesData.image}" alt="${recipesData.name}">
          <h2>${recipesData.name}</h2>
          <h3>RECETTE</h3>
          <p>${recipesData.description}</p>
          <h3>INGRÉDIENTS</h3>
          <ul>
            ${recipesData.ingredients
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

// Function to update displayed cards
function updateCards(recipes) {
  container.innerHTML = '';
  recipes.forEach((recipe, index) => {
    container.innerHTML += generateRecipeHTML(recipe, images[index]);
  });
}
