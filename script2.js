const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsList=document.querySelector('#recipe-container');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
})

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=db2d1557&app_key=a013c65df1da326342c163a193a1e0bf&from=0&to=20`);
    const data = await response.json();
    displayRecipes(data.hits);
}

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        html += `
        <div class="recipe">
        <div class="recipe-title">
            ${recipe.recipe.label}
        </div>
        <div class="recipe-image">
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}" />
            
        </div>
        <div class="recipe-text">
            <ul>
            ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>
        </div>
        `
    })
    resultsList.innerHTML = html;
}