//Edit page

const recipes = [
  '../source/assets/jsons/Ghost-Pepper-Wings.json',
  '../source/assets/jsons/Jalapeno-Garlic-Onion-CheeseBurger.json',
  '../source/assets/jsons/Sichuan-Style-Bird-Eye-Chili-Sauce.json',
  '../source/assets/jsons/Southwest-Stuffed-Poblano-Pepper.json',
  '../source/assets/jsons/Spicy-Shrimp-Pad-Thai.json',
];
const recipeData = {};

window.addEventListener('DOMContentLoaded', init);

async function init() {
  try {
    await fetchRecipes();
  } catch (err) {
    console.log(`Error fetching recipes: ${err}`);
  }
  fill_in_existing_data();

  AddInstruction();
  RemoveInstruction();

  AddIngredient();
  RemoveIngredient();

  GetImgurImage();
  //const form = document.querySelector('form');
  //form.addEventListener('submit', handleSubmit);

  SubmitRecipe();
}

/**
 * Loading JSON into a JS file is oddly not super straightforward (for now), so
 * I built a function to load in the JSON files for you. It places all of the recipe data
 * inside the object recipeData like so: recipeData{ 'ghostcookies': ..., 'birthdayCake': ..., etc }
 */
async function fetchRecipes() {
  return new Promise((resolve, reject) => {
    console.log(recipes);
    recipes.forEach((recipe) => {
      fetch(recipe)
        .then((response) => response.json())
        .then((data) => {
          // This grabs the page name from the URL in the array above
          recipeData[recipe] = data;
          if (Object.keys(recipeData).length === recipes.length) {
            resolve();
          }
        })
        .catch((err) => {
          console.log(`Error loading the ${recipe} recipe`);
          reject(err);
        });
    });
  });
}
var optionIndex = {
  'N/A': 0,
  'tsp': 1,
  'tbsp': 2,
  'oz': 3,
  'c': 4,
  'pt': 5,
  'qt': 6,
  'gal': 7,
  'ml': 8,
  'l': 9
};
/**
 * The function that will fill in the data into the text boxes for some specific recipe edit page
 * Right now the data we use is whatever the recipe we manually choose
 * Later it will correspond to the recipe we clicked on to edit
 */
function fill_in_existing_data() {
  const data = recipeData['../source/assets/jsons/Ghost-Pepper-Wings.json'];
  
  document.getElementById('recipeName').value = data.title;
  document.getElementById('recipeDescription').value = data.description;
  document.getElementById('url').innerText = data.image;
  document.getElementById('imgPreview').src = data.image;
  document.getElementById('servingSize').value = data.servingSize;
  document.getElementById('scoville').value = data.scoville;
  document.getElementById('prepMins').value = data.time[0].minutes;
  document.getElementById('prepHrs').value = data.time[0].hours;
  document.getElementById('cookMins').value = data.time[1].minutes;
  document.getElementById('cookHrs').value = data.time[1].hours;

  for (let i = 1; i < (data.ingredientList.length); i++) {
    MakeExtraSlots(data.ingredientList[i]);
    //console.log(optionIndex[data.ingredientList[i].units]);
    document.getElementById("ingredientUnits").selectedIndex = optionIndex[data.ingredientList[i].units];
  }
  const div1 = document.getElementById('ingredients');
  var inputName = div1.getElementsByTagName('input')[0];
  var inputQuantity = div1.getElementsByTagName('input')[1];
  var select = div1.getElementsByTagName('select')[0];
  inputName.value = data.ingredientList[0].name;
  inputQuantity.value = data.ingredientList[0].quantity;
  select.options[optionIndex[data.ingredientList[0].units]].selected = true;

  const directions = data.directions;
  for (let i = 1; i < (directions.length); i++) {
    MakeExtraInstructionSlots(directions[i]);
  }
  const div2 = document.getElementById('instructions');
  var textArea = div2.getElementsByTagName('textarea')[0];
  textArea.value = data.directions[0];

}

// attempt to take user input and convert to .json file
function SubmitRecipe(event) {
  // TODO: Check if all boxes have been filled

  const button = document.getElementById('submitButton');

  button.addEventListener('click', () => {
    let recipeName = document.getElementById('recipeName').value;
    let description = document.getElementById('description').value;
    let url = document.getElementById('url').innerText;
    let scoville = Number(document.getElementById('scoville').value);
    let prepMins = Number(document.getElementById('prepMins').value);
    let prepHrs = Number(document.getElementById('prepHrs').value);
    let cookMins = Number(document.getElementById('cookMins').value);
    let cookHrs = Number(document.getElementById('cookHrs').value);
    let servingSize = Number(document.getElementById('servingSize').value);

    let jsonName = RecipeNameGenerator(recipeName);
    let totalTimeArr = CalculateTotalTime(prepHrs, prepMins, cookHrs, cookMins);

    // TODO: forloops to create variables and get elements
    //document.getElementById('ingredientDescription');
    //document.getElementById('ingredientQuantity');
    //document.getElementById('ingredientUnits'); 

    // Create ingredients array
    const div = document.getElementById('ingredients');

    // TODO: update json file to match html page
    var jsonText = {
      "title": recipeName,
      "id": "ID",
      "description": description,
      "image": url,
      "servingSize": servingSize,
      "scoville": scoville,
      "time": [
        {
          "name": "prepTime",
          "hours": prepHrs,
          "minutes": prepMins
        },
        {
          "name": "cookTime",
          "hours": cookHrs,
          "minutes": cookMins
        },
        {
          "name": "totalTime",
          "hours": totalTimeArr[0],
          "minutes": totalTimeArr[1]
        }
      ]
    };

    // Save json file to local storage
    try {
      localStorage.setItem(jsonName, JSON.stringify(jsonText));
    }
    catch (e) {
      console.log("Storage failed: " + e);
    }
  });
}

// Takes in recipe name and generates .json name
function RecipeNameGenerator(name) {
  let recipeName = "";

  // replace all spaces
  for (let i = 0; i < name.length; i++) {
    let curr = name.charAt(i);
    if (curr == ' ') {
      recipeName += '-';
    }
    else {
      recipeName += curr;
    }
  }
  // append file extension
  recipeName += '.json';
  return recipeName;
}

// Calculates total cook time, accounting for overflow
function CalculateTotalTime(prepHrs, prepMins, cookHrs, cookMins) {
  let totalMins = prepMins + cookMins;
  let carryHrs = Math.round(totalMins / 60);

  totalMins = totalMins % 60;
  let totalHrs = prepHrs + cookHrs + carryHrs;

  return new Array(totalHrs, totalMins);
}

// check to see if the user input is valid and let user know what inputs to change to fix input
function RecipeInputsGood(event) {
  // TODO
}

// adds another textarea for recipe instructions/steps when add step button is pressed
function MakeExtraInstructionSlots(data) {
  const div = document.getElementById('instructions');
  let stepNum = Number(div.getAttribute('value'));

  if (stepNum < 25) {
    stepNum++;
    div.setAttribute('value', stepNum);
    const textArea = document.createElement('textarea');
    textArea.setAttribute('cols', '60');
    textArea.setAttribute('rows', '2');
    textArea.setAttribute('placeholder', 'Step ' + stepNum);
    textArea.value = data;
    div.appendChild(textArea);
  }
}

// adds another textarea for recipe instructions/steps when add step button is pressed
function AddInstruction() {
  const button = document.getElementById('addStepButton');
  const div = document.getElementById('instructions');

  button.addEventListener('click', () => {
    let stepNum = Number(div.getAttribute('value'));

    if (stepNum < 8) {
      stepNum++;
      div.setAttribute('value', stepNum);
      const textArea = document.createElement('textarea');
      textArea.setAttribute('cols', '60');
      textArea.setAttribute('rows', '2');
      textArea.setAttribute('placeholder', 'Step ' + stepNum);
      div.appendChild(textArea);
    }
  });
}

// removes last textarea for recipe instruction/steps when remove step button is pressed
function RemoveInstruction() {

  const button = document.getElementById('removeStepButton');
  const div = document.getElementById('instructions');

  button.addEventListener('click', () => {
    let stepNum = Number(div.getAttribute('value'));
    if (stepNum > 1) {
      stepNum--;
      div.setAttribute('value', stepNum);
      const textArea = div.getElementsByTagName('textarea')[div.getElementsByTagName('textarea').length - 1];
      div.removeChild(textArea);
    }
  });
}

// adds another textarea for recipe instruction/steps when add step button is pressed
function MakeExtraSlots(data) {

  const button = document.getElementById('addIngredientButton');
  const div = document.getElementById('ingredients');
  const selectOptions = ['N/A', 'tsp', 'tbsp', 'oz', 'c', 'pt', 'qt', 'gal', 'ml', 'l'];

  let stepNum = Number(div.getAttribute('value'));
  if (stepNum < 25) {
    stepNum++;
    div.setAttribute('value', stepNum);
    const inputName = document.createElement('input');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('minlength', '2');
    inputName.setAttribute('maxlength', '40');
    inputName.setAttribute('minlength', '2');
    inputName.setAttribute('placeholder', 'Ingredient Description');

    inputName.value = document.getElementById('ingredientDescription').value = data.name;
    //console.log(data.name);

    const inputQuantity = document.createElement('input');
    inputQuantity.setAttribute('type', 'number');
    inputQuantity.setAttribute('min', '0');
    inputQuantity.setAttribute('placeholder', 'Quantity');

    inputQuantity.value = document.getElementById('ingredientDescription').value = data.quantity;
    //console.log(data.quantity);

    const select = document.createElement('select');
    for (var i = 0; i < selectOptions.length; i++) {
      var option = document.createElement('option');
      option.setAttribute('value', selectOptions[i]);
      option.innerText = selectOptions[i];
      select.appendChild(option);
    }
    const lineBreak = document.createElement('br');

    select.options[optionIndex[data.units]].selected = true;
    //document.getElementById("dropdown").selectedIndex = "1";


    div.appendChild(lineBreak);
    div.appendChild(inputName);
    div.appendChild(inputQuantity);
    div.appendChild(select);
  }

}

// adds another textarea for recipe instruction/steps when add step button is pressed
function AddIngredient() {

  const button = document.getElementById('addIngredientButton');
  const div = document.getElementById('ingredients');
  const selectOptions = ['N/A', 'tsp', 'tbsp', 'oz', 'c', 'pt', 'qt', 'gal', 'ml', 'l'];

  button.addEventListener('click', () => {
    let stepNum = Number(div.getAttribute('value'));
    if (stepNum < 25) {
      stepNum++;
      div.setAttribute('value', stepNum);
      const inputName = document.createElement('input');
      inputName.setAttribute('type', 'text');
      inputName.setAttribute('minlength', '2');
      inputName.setAttribute('maxlength', '40');
      inputName.setAttribute('minlength', '2');
      inputName.setAttribute('placeholder', 'Ingredient Description');
      const inputQuantity = document.createElement('input');
      inputQuantity.setAttribute('type', 'number');
      inputQuantity.setAttribute('min', '0');
      inputQuantity.setAttribute('placeholder', 'Quantity');
      const select = document.createElement('select');
      for (var i = 0; i < selectOptions.length; i++) {
        var option = document.createElement('option');
        option.setAttribute('value', selectOptions[i]);
        //option.setAttribute('innerText', selectOptions[i]);
        option.innerText = selectOptions[i];
        select.appendChild(option);
      }
      const lineBreak = document.createElement('br');

      div.appendChild(lineBreak);
      div.appendChild(inputName);
      div.appendChild(inputQuantity);
      div.appendChild(select);
    }
  });

}
// removes last textarea for recipe instruction/steps when remove step button is pressed
function RemoveIngredient() {

  const button = document.getElementById('removeIngredientButton');
  const div = document.getElementById('ingredients');

  button.addEventListener('click', () => {
    let stepNum = Number(div.getAttribute('value'));
    if (stepNum > 1) {
      stepNum--;
      div.setAttribute('value', stepNum);
      const lineBreak = div.getElementsByTagName('br')[div.getElementsByTagName('br').length - 1];
      const inputName = div.getElementsByTagName('input')[div.getElementsByTagName('input').length - 2];
      const inputQuantity = div.getElementsByTagName('input')[div.getElementsByTagName('input').length - 1];
      const select = div.getElementsByTagName('select')[div.getElementsByTagName('select').length - 1];

      div.removeChild(lineBreak);
      div.removeChild(inputName);
      div.removeChild(inputQuantity);
      div.removeChild(select);
    }
  });
}

// uses Imgur API to convert image file into a link
function GetImgurImage() {

  const imgUpload = document.getElementById('imgUpload')
  const imgPreview = document.getElementById('imgPreview')
  const url = document.getElementById('url')
  imgUpload.addEventListener('change', ev => {
    const formdata = new FormData()
    formdata.append('image', ev.target.files[0])
    fetch('https://api.imgur.com/3/image/', {
      method: 'post',
      headers: {
        Authorization: 'Client-ID 0f695d3611373b4'
      },
      body: formdata
    }).then(data => data.json()).then(data => {
      imgPreview.src = data.data.link
      url.innerText = data.data.link
    })
  })

}