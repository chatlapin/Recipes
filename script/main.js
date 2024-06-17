import {
  getIngredientsTags,
  displayIngredientsTags,
  getAppareilsTags,
  displayAppareilsTags,
  displayTagsRecipes,
} from "./displays.js";

let initialRecipes = [];
let currentRecipes = [];//global scope variable
let filters = {//global scope variable
  appareils: [],
  ingredients: [],
  ustensiles: [],
};

let initialAppareilsTags = [];
let initialIngredientsTags = [];

function addTagIngredientClickEvent() {
  const tagsIngredients = document.querySelectorAll('.tag.tag-ingredient');
  const tagsIngredientsContainer = document.querySelector('#filters-ingredients');
  tagsIngredients.forEach(tag => {
    tag.addEventListener('click', () => {
      const tagValue = tag.dataset.valeur;
      console.log(tagValue);
      console.log(filters.ingredients.includes(tagValue));
      if (!filters.ingredients.includes(tagValue)) {
        filters.ingredients.push(tagValue);
        const tagFilterElement = document.createElement('li');
        tagFilterElement.classList.add('tag-filter');
        const span = document.createElement('span');
        span.textContent = tagValue;
        tagFilterElement.appendChild(span);
        const button = document.createElement('button');
        button.classList.add('remove-tag');
        button.textContent = 'x';
        button.addEventListener('click', () => {
          filters.ingredients = filters.ingredients.filter(ingredient => ingredient !== tagValue);
          updateFiltersResults()
          button.parentElement.remove();
        });
        tagFilterElement.appendChild(button);
        tagsIngredientsContainer.appendChild(tagFilterElement);

        applyFilters();
        displayTagsRecipes(currentRecipes);
        applyTagsClickEvent();
      }/* else {
        filters.ingredients = filters.ingredients.filter(ingredient => ingredient !== tagValue);
      }*/
      const parentAccordion = tag.closest('.panel');
      parentAccordion.style.display = 'none';
    });
  });
}

function addTagAppareilClickEvent() {
  const tagsAppareils = document.querySelectorAll('.tag.tag-appareil');
  const tagsAppareilsContainer = document.querySelector('#filters-appareils');
  tagsAppareils.forEach(tag => {
    tag.addEventListener('click', () => {
      //const tagValue = tag.getAttribute('data-valeur');
      const tagValue = tag.dataset.valeur;
      console.log(tagValue);
      if (!filters.appareils.includes(tagValue)) {
        filters.appareils.push(tagValue);
        const tagFilterElement = document.createElement('li');
        tagFilterElement.classList.add('tag-filter');
        const span = document.createElement('span');
        span.textContent = tagValue;
        tagFilterElement.appendChild(span);
        const button = document.createElement('button');
        button.classList.add('remove-tag');
        button.textContent = 'x';
        button.addEventListener('click', () => {
          filters.appareils = filters.appareils.filter(appareil => appareil !== tagValue);
          updateFiltersResults()
          button.parentElement.remove();
        });
        tagFilterElement.appendChild(button);
        tagsAppareilsContainer.appendChild(tagFilterElement);

        applyFilters();//mise à jour currentRecipes
        displayTagsRecipes(currentRecipes);
        applyTagsClickEvent();
        //tagsAppareilsContainer.innerHTML += `<li class="tag-filter"><span>${tagValue}</span> <button class="remove-tag">x</button> </li> `;
      } /*else {
        filters.appareils = filters.appareils.filter(appareil => appareil !== tagValue);
      }*/
      const parentAccordion = tag.closest('.panel');
      parentAccordion.style.display = 'none';
    });
  });
}

function addTagUstensileClickEvent() {
  const tagsUstensiles = document.querySelectorAll('.tag-ustensile');
  const tagsUstensilesContainer = document.querySelector('#filters-ustensiles');
  tagsUstensiles.forEach(tag => {
    tag.addEventListener('click', () => {
      const tagValue = tag.dataset.valeur;
      if (!filters.ustensiles.includes(tagValue)) {
        filters.ustensiles.push(tagValue);
        const tagFilterElement = document.createElement('li');
        tagFilterElement.classList.add('tag-filter');
        const span = document.createElement('span');
        span.textContent = tagValue;
        tagFilterElement.appendChild(span);
        const button = document.createElement('button');
        button.classList.add('remove-tag');
        button.textContent = 'x';
        button.addEventListener('click', () => {
          filters.ustensiles = filters.ustensiles.filter(ustensile => ustensile !== tagValue);
          console.log("filters.ustensiles");
          console.log(tagValue);
          console.log(filters.ustensiles);

          updateFiltersResults()
          button.parentElement.remove();
        });
        tagFilterElement.appendChild(button);
        tagsUstensilesContainer.appendChild(tagFilterElement);
        applyFilters();//mise à jour currentRecipes
        displayTagsRecipes(currentRecipes);
        applyTagsClickEvent();
      } /*else {
        filters.ustensiles = filters.ustensiles.filter(ustensile => ustensile !== tagValue);
      }*/
      const parentAccordion = tag.closest('.panel');
      parentAccordion.style.display = 'none';
    });
  });
}

function applyFilters() {
  // apply filters on appareils and ingredients and ustensiles
  currentRecipes = initialRecipes.filter(recipe => {
    const appareils = recipe.appliance;
    const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient);
    const ustensiles = recipe.ustensils;
    return filters.appareils.every(appareil => appareils.includes(appareil)) &&
      filters.ingredients.every(ingredient => ingredients.includes(ingredient)) &&
      filters.ustensiles.every(ustensile => ustensiles.includes(ustensile));
  });
}

async function getInitialRecipes() {
  const response = await fetch("assets/data/recipes.json");
  const data = await response.json();
  return data;
}


function applyTagsClickEvent() {
  addTagIngredientClickEvent();
  addTagAppareilClickEvent();
  addTagUstensileClickEvent();
}

function updateFiltersResults() {
  applyFilters();//mise à jour currentRecipes
  displayTagsRecipes(currentRecipes);
  applyTagsClickEvent();
}

// For ingredient search
const ingredientSearch = document.getElementById("ingredient-search");
ingredientSearch.addEventListener("input", () => {
  const searchValue = ingredientSearch.value.toLowerCase().trim();
  let currentIngredientsTags = initialIngredientsTags.filter(tag => tag.toLowerCase().includes(searchValue));
  displayIngredientsTags(currentIngredientsTags);
  addTagIngredientClickEvent();
});

// For appareil search
const appareilSearch = document.getElementById("appareil-search");
appareilSearch.addEventListener("input", () => {
  const searchValue = appareilSearch.value.toLowerCase().trim();
  let currentAppareilsTags = initialAppareilsTags.filter(tag => tag.toLowerCase().includes(searchValue));
  displayAppareilsTags(currentAppareilsTags);
  addTagAppareilClickEvent();
});

// For ustensile search
const ustensileSearch = document.getElementById("ustensile-search");
ustensileSearch.addEventListener("input", () => {
  const searchValue = ustensileSearch.value.toLowerCase().trim();
  let currentUstensilesTags = initialUstensilesTags.filter(tag => tag.toLowerCase().includes(searchValue));
  displayUstensilesTags(currentUstensilesTags);
  addTagUstensileClickEvent();
});

async function init() {
  initialRecipes = await getInitialRecipes();
  currentRecipes = [...initialRecipes]; // Clone array values with the spread operator ...
  displayTagsRecipes(currentRecipes);

  // Initialize and display tags for appareils
  initialAppareilsTags = getAppareilsTags(initialRecipes);
  displayAppareilsTags(initialAppareilsTags);

  // Initialize and display tags for ingredients
  initialIngredientsTags = getIngredientsTags(initialRecipes);
  displayIngredientsTags(initialIngredientsTags);

  // Initialize and display tags for ustensiles
  initialUstensilesTags = getUstensilesTags(initialRecipes);
  displayUstensilesTags(initialUstensilesTags);

  applyTagsClickEvent();
}
init();




/*
// Fetch data from JSON file
fetch("assets/data/recipes.json")
  .then((response) => response.json())
  .then((data) => {
    currentRecipes = data;
    displayRecipes(currentRecipes);
    displayTags(currentRecipes);
  });
*/

const inputSearch = document.getElementById("search-input"); // getElementById Highly specific (unique IDs) 	Generally faster and querySelector More flexible (CSS selectors) May be slower (depending on selector complexity)// getElementById Highly specific (unique IDs) 	Generally faster and querySelector More flexible (CSS selectors) May be slower (depending on selector complexity)
// 검색 입력 필드에 입력 이벤트 추가
inputSearch.addEventListener("input", () => {
  // 입력 필드의 값이 변경될 때마다 호출
  const searchValue = inputSearch.value.toLowerCase().trim();
  if (searchValue.length < 3) {
    return;
  }
  // 검색어가 포함된 레시피만 필터링
  currentRecipes = currentRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchValue) ||
    recipe.description.toLowerCase().includes(searchValue) ||
    recipe.ingredients.some(ingredient =>
      ingredient.ingredient.toLowerCase().includes(searchValue))
  );
  displayTagsRecipes(currentRecipes);
});

//when type in the search input, svg of .hero__search-container .close  is to appear
const closeSearch = document.querySelector('.hero__search-container .close');
inputSearch.addEventListener('input', () => {
  if (inputSearch.value.length > 0) {
    closeSearch.style.display = 'block';
  } else {
    closeSearch.style.display = 'none';
  }
});

//when click on the svg of .hero__search-container .close, the input value is to be cleared
closeSearch.addEventListener('click', () => {
  inputSearch.value = '';
  closeSearch.style.display = 'none';
  currentRecipes = [...initialRecipes];
  updateFiltersResults();
});

// Clearing ingredient search and displaying all ingredients
const emptyIngredient = document.querySelector('.empty-ingredient');
emptyIngredient.addEventListener('click', () => {
  ingredientSearch.value = '';
  const currentIngredientsTags = initialIngredientsTags;
  displayIngredientsTags(currentIngredientsTags);
  addTagIngredientClickEvent();
});

// Clearing appareil search and displaying all appareils
const emptyAppareil = document.querySelector('.empty-appareil');
emptyAppareil.addEventListener('click', () => {
  appareilSearch.value = '';
  const currentAppareilsTags = initialAppareilsTags;
  displayAppareilsTags(currentAppareilsTags);
  addTagAppareilClickEvent();
});

// Clearing ustensile search and displaying all ustensiles
const emptyUstensile = document.querySelector('.empty-ustensile');
emptyUstensile.addEventListener('click', () => {
  ustensileSearch.value = '';
  const currentUstensilesTags = initialUstensilesTags;
  displayUstensilesTags(currentUstensilesTags);
  addTagUstensileClickEvent();
});





