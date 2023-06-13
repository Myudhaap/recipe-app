const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const inputEl = document.querySelector('.search-input')


const result = document.querySelector('#result')
const searchBtn = document.querySelector('.search-btn')

function getRecipe(recipe){
  if(recipe.length == 0){
    result.innerHTML = '<h3>Inputkan teks</h3>'
  }else{
    fetch(`${url}${recipe}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      generateRecipe(data)
    })
    .catch(() => {
      result.innerHTML = '<h3>Data tidak ditemukan</h3>'
    })
  }
}

function generateRecipe(data) {
  const myMeal = data.meals[0];
  let count = 1;
  let ingredients = []; 
  for(let i in myMeal){
    let ingredient = '';
    let measure = '';
    if(i.startsWith('strIngredient') && myMeal[i]){
      ingredient = myMeal[i];
      measure = myMeal['strMeasure' + count];
      ingredients.push(`${ingredient} ${measure}`)
      count++;
    }
  }
  result.innerHTML = `
  <div class="recipe-profile">
    <img src="${data.meals[0].strMealThumb}" alt="Gambar Resep" class="profile-img">
    <div class="profile-name">
      <h2>${data.meals[0].strMeal}</h2>
      <p>${data.meals[0].strArea}</p>
    </div>
  </div>
  <ul class="recipe-ingrediant">
  </ul>
  <div class="recipe-instruction fade">
    <button class="instruction-close">X</button>
    <pre class="instruction-text">${data.meals[0].strInstructions}</pre>
  </div>
  <button class="recipe-btn">View Recipe</button>
  `;

  const recipeInstruction = document.querySelector('.recipe-ingrediant')

  ingredients.forEach(data => {
    const liEl = document.createElement('li')
    liEl.textContent = data;
    recipeInstruction.appendChild(liEl)
  })

  const recipeBtn = document.querySelector('.recipe-btn')
  const closeBtn = document.querySelector('.instruction-close')

  // view instruction
  recipeBtn.addEventListener('click', () => {
    const recipeEl = document.querySelector('.recipe-instruction')
    recipeEl.classList.remove('fade')
  })

  // view instruction
  closeBtn.addEventListener('click', () => {
    const recipeEl = document.querySelector('.recipe-instruction')
    recipeEl.classList.add('fade')
  })
}

searchBtn.addEventListener('click', () => {
  getRecipe(inputEl.value)
})
// window.addEventListener('load', getRecipe)


