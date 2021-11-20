import { database } from '../scripts/database.js';

class RecipeUpload extends HTMLElement {
  /**
     * Constructor builds the layout for the recipe page
     */
  constructor() {
    super();
    // Create Shadow DOM
    this.attachShadow({ mode: 'open' });

    const styles = document.createElement('style');
    const article = document.createElement('article');

    this.isCreate = true;

    // TODO add CSS to upload page
    styles.innerHTML = '';

    article.innerHTML = `
        <h1 id="recipe-title">Upload Recipe</h1>

        <h2>Recipe Name</h2>
        <input type="text" id="recipeName" required minlength="2" maxlength="40" size="30">
        
        <h2>Description</h2>
        <textarea id="recipeDescription" rows="7" cols="50"></textarea>

        <h2>Upload Photo</h2>
        <p>Please upload a picture of your completed dish!</p>

        <img src="assets/images/placeholder.png" id="imgPreview" alt="temp" width="400" height="400" referrerpolicy="no-referrer">
        <br>
        <input type="file" id="imgUpload" accept="image/*">
        <p id="url"></p>

        <h2>Serving Size</h2>
        <input type="number" id="servingSize" min="0" max="59" size = "50" value="0" required>

        <h2>Scoville Heat Units</h2>
        <input type="number" id="scoville" min="0" max="3000000" value="0" required>

        <h2>Prep Time</h2>
        <input type="number" id="prepHrs" min="0" max="20"  placeholder="Hours" required>
        <input type="number" id="prepMins" min="0" max="59" placeholder="Minutes" required>

        <h2>Cooking Time</h2>
        <input type="number" id="cookHrs" min="0" max="20"  placeholder="Hours" required>
        <input type="number" id="cookMins" min="0" max="59" placeholder="Minutes" required>

        <div id="ingredients" value="1">
        <h2>Ingredients</h2>
            <input type="text" id="ingredientDescription" required minlength="2" maxlength="40" placeholder="Ingredient Description">
            <input type="number" id="ingredientQuantity" min="0" placeholder="Quantity" required>
            <select id="ingredientUnits">
                <option>N/A</option>
                <option>tsp</option>
                <option>tbsp</option>
                <option>oz</option>
                <option>c</option>
                <option>pt</option>
                <option>qt</option>
                <option>gal</option>
                <option>ml</option>
                <option>l</option>
            </select>
        </div>
        <input type="button" id="addIngredientButton" value="Add Ingredient">
        <input type="button" id="removeIngredientButton" value="Remove Ingredient">

        <div id="instructions" value="1">
            <h2>Instructions</h2>
            <textarea cols='60' rows='2' placeholder="Step 1"></textarea>
        </div>
        <input id="addStepButton" type="button" value="Add Step">
        <input id="removeStepButton" type="button" value="Remove Step">

        <div id="formButtons">
            <input id="submitButton" class="Submit" type="button" value="Submit">
            <input id="cancelButton" class="Cancel" type="button" value="Cancel">
        </div>`;

    this.shadowRoot.append(styles, article);

    this.AddInstruction();
    this.RemoveInstruction();

    this.AddIngredient();
    this.RemoveIngredient();

    this.GetImgurImage();
    this.SubmitRecipe();
  }

  /**
   * Sets the recipe that will be used insidet the <recipe-display> element.
   * Overwrites the previous recipe displayed.
   */
  set data(data) {
    this.json = data;
    // Reset HTML

    this.shadowRoot.querySelector('article').innerHTML = `
    <h1 id="recipe-title">Upload Recipe</h1>

    <h2>Recipe Name</h2>
    <input type="text" id="recipeName" required minlength="2" maxlength="40" size="30">
    
    <h2>Description</h2>
    <textarea id="recipeDescription" rows="7" cols="50"></textarea>

    <h2>Upload Photo</h2>
    <p>Please upload a picture of your completed dish!</p>

    <img src="assets/images/placeholder.png" id="imgPreview" alt="temp" width="400" height="400" referrerpolicy="no-referrer">
    <br>
    <input type="file" id="imgUpload" accept="image/*">
    <p id="url"></p>

    <h2>Serving Size</h2>
    <input type="number" id="servingSize" min="0" max="59" size = "50" value="0" required>

    <h2>Scoville Heat Units</h2>
    <input type="number" id="scoville" min="0" max="3000000" value="0" required>

    <h2>Prep Time</h2>
    <input type="number" id="prepHrs" min="0" max="20"  placeholder="Hours" required>
    <input type="number" id="prepMins" min="0" max="59" placeholder="Minutes" required>

    <h2>Cooking Time</h2>
    <input type="number" id="cookHrs" min="0" max="20"  placeholder="Hours" required>
    <input type="number" id="cookMins" min="0" max="59" placeholder="Minutes" required>

    <div id="ingredients" value="1">
    <h2>Ingredients</h2>
        <input type="text" id="ingredientDescription" required minlength="2" maxlength="40" placeholder="Ingredient Description">
        <input type="number" id="ingredientQuantity" min="0" placeholder="Quantity" required>
        <select id="ingredientUnits">
            <option>N/A</option>
            <option>tsp</option>
            <option>tbsp</option>
            <option>oz</option>
            <option>c</option>
            <option>pt</option>
            <option>qt</option>
            <option>gal</option>
            <option>ml</option>
            <option>l</option>
        </select>
    </div>
    <input type="button" id="addIngredientButton" value="Add Ingredient">
    <input type="button" id="removeIngredientButton" value="Remove Ingredient">

    <div id="instructions" value="1">
        <h2>Instructions</h2>
        <textarea cols='60' rows='2' placeholder="Step 1"></textarea>
    </div>
    <input id="addStepButton" type="button" value="Add Step">
    <input id="removeStepButton" type="button" value="Remove Step">

    <div id="formButtons">
        <input id="submitButton" class="Submit" type="button" value="Submit">
        <input id="cancelButton" class="Cancel" type="button" value="Cancel">
    </div>`;
    this.AddInstruction();
    this.RemoveInstruction();

    this.AddIngredient();
    this.RemoveIngredient();

    this.GetImgurImage();
    this.SubmitRecipe();

    if (data == null) {
      this.isCreate = true;
      return;
    }
    this.isCreate = false;

    // Update data here
    console.log('Insert recipe data here');
  }

  // attempt to take user input and convert to .json file
  SubmitRecipe(event) {
    // TODO: Check if all boxes have been filled

    const button = this.shadowRoot.getElementById('submitButton');

    button.addEventListener('click', () => {
      const recipeName = this.shadowRoot.getElementById('recipeName').value;
      const description = this.shadowRoot.getElementById('recipeDescription').value;
      const url = this.shadowRoot.getElementById('url').innerText;
      const scoville = Number(this.shadowRoot.getElementById('scoville').value);
      const prepMins = Number(this.shadowRoot.getElementById('prepMins').value);
      const prepHrs = Number(this.shadowRoot.getElementById('prepHrs').value);
      const cookMins = Number(this.shadowRoot.getElementById('cookMins').value);
      const cookHrs = Number(this.shadowRoot.getElementById('cookHrs').value);
      const servingSize = Number(this.shadowRoot.getElementById('servingSize').value);

      const jsonName = this.RecipeNameGenerator(recipeName);
      const totalTimeArr = this.CalculateTotalTime(prepHrs, prepMins, cookHrs, cookMins);

      const jsonText = {
        title: recipeName,
        id: 'ID',
        description,
        image: url,
        servingSize,
        scoville,
        time: [
          {
            name: 'prepTime',
            hours: prepHrs,
            minutes: prepMins,
          },
          {
            name: 'cookTime',
            hours: cookHrs,
            minutes: cookMins,
          },
          {
            name: 'totalTime',
            hours: totalTimeArr[0],
            minutes: totalTimeArr[1],
          },
        ],
        ingredientList: [],
        directions: [],
        challenges: [],
        completed: false,
      };

      const divIngredients = this.shadowRoot.getElementById('ingredients');
      const ingredientCount = Number(divIngredients.getAttribute('value')) * 2;

      for (let i = 0; i < ingredientCount; i += 2) {
        const currIngredientName = divIngredients.getElementsByTagName('input')[i].value;
        const currIngredientQuantity = divIngredients.getElementsByTagName('input')[i + 1].value;
        const currIngredientUnits = divIngredients.getElementsByTagName('select')[i / 2].value;

        const ingredientString = {
          name: currIngredientName,
          quantity: currIngredientQuantity,
          units: currIngredientUnits,
        };

        jsonText.ingredientList[i / 2] = ingredientString;
      }

      const divInstructions = this.shadowRoot.getElementById('instructions');
      const instructionCount = Number(divInstructions.getAttribute('value'));

      for (let i = 0; i < instructionCount; i++) {
        const currInstruction = divInstructions.getElementsByTagName('textarea')[i].value;
        jsonText.directions[i] = currInstruction;
      }

      // TODO (Lorenzo)
      // if isCreateRecipe - add the recipe to dexie
      // if !isCreateRecipe - update the recipe on dexie

      // determine spice level

      if (scoville < 3000) {
        jsonText.spiceRating = 1;
      } else if (scoville < 25000) {
        jsonText.spiceRating = 2;
      } else if (scoville < 100000) {
        jsonText.spiceRating = 3;
      } else if (scoville < 350000) {
        jsonText.spiceRating = 4;
      } else {
        jsonText.spiceRating = 5;
      }

      if (this.isCreate) {
        database.addRecipe(jsonText);
      } else {
        jsonText.id = this.json.id;
        database.updateRecipe(jsonText);
      }

      /** try {
        localStorage.setItem(jsonName, JSON.stringify(jsonText));
      } catch (e) {
        console.log(`Storage failed: ${e}`);
      }
      * */
    });
  }

  // Takes in recipe name and generates .json name
  RecipeNameGenerator(name) {
    let recipeName = '';

    // replace all spaces
    for (let i = 0; i < name.length; i++) {
      const curr = name.charAt(i);
      if (curr == ' ') {
        recipeName += '-';
      } else {
        recipeName += curr;
      }
    }
    // append file extension
    recipeName += '.json';
    return recipeName;
  }

  // Calculates total cook time, accounting for overflow
  CalculateTotalTime(prepHrs, prepMins, cookHrs, cookMins) {
    let totalMins = prepMins + cookMins;
    const carryHrs = Math.round(totalMins / 60);

    totalMins %= 60;
    const totalHrs = prepHrs + cookHrs + carryHrs;

    return new Array(totalHrs, totalMins);
  }

  // check to see if the user input is valid and let user know what inputs to change to fix input
  RecipeInputsGood(event) {
    // TODO
  }

  // removes last textarea for recipe instruction/steps when remove step button is pressed
  RemoveInstruction() {
    const button = this.shadowRoot.getElementById('removeStepButton');
    const div = this.shadowRoot.getElementById('instructions');

    button.addEventListener('click', () => {
      let stepNum = Number(div.getAttribute('value'));
      if (stepNum > 1) {
        stepNum--;
        div.setAttribute('value', stepNum);
        const textArea = div.getElementsByTagName('textarea')[div.getElementsByTagName('textarea').length - 1];
        const lineBreak = div.getElementsByTagName('br')[div.getElementsByTagName('br').length - 1];
        div.removeChild(textArea);
        div.removeChild(lineBreak);
      }
    });
  }

  // adds another textarea for recipe instruction/steps when add step button is pressed
  AddIngredient() {
    const button = this.shadowRoot.getElementById('addIngredientButton');
    const div = this.shadowRoot.getElementById('ingredients');
    const selectOptions = ['N/A', 'tsp', 'oz', 'c', 'pt', 'qt', 'gal', 'ml', 'l'];

    button.addEventListener('click', () => {
      let stepNum = Number(div.getAttribute('value'));
      if (stepNum < 8) {
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
        for (let i = 0; i < selectOptions.length; i++) {
          const option = document.createElement('option');
          option.setAttribute('value', selectOptions[i]);
          // option.setAttribute('innerText', selectOptions[i]);
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

  // adds another textarea for recipe instruction/steps when add step button is pressed
  AddInstruction() {
    const button = this.shadowRoot.getElementById('addStepButton');
    const div = this.shadowRoot.getElementById('instructions');

    button.addEventListener('click', () => {
      let stepNum = Number(div.getAttribute('value'));

      if (stepNum < 8) {
        stepNum++;
        div.setAttribute('value', stepNum);
        const textArea = document.createElement('textarea');
        textArea.setAttribute('cols', '60');
        textArea.setAttribute('rows', '2');
        textArea.setAttribute('placeholder', `Step ${stepNum}`);
        const lineBreak = document.createElement('br');
        div.appendChild(lineBreak);
        div.appendChild(textArea);
      }
    });
  }

  // removes last textarea for recipe instruction/steps when remove step button is pressed
  RemoveIngredient() {
    const button = this.shadowRoot.getElementById('removeIngredientButton');
    const div = this.shadowRoot.getElementById('ingredients');

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
  GetImgurImage() {
    const imgUpload = this.shadowRoot.getElementById('imgUpload');
    const imgPreview = this.shadowRoot.getElementById('imgPreview');
    const url = this.shadowRoot.getElementById('url');
    imgUpload.addEventListener('change', (ev) => {
      const formdata = new FormData();
      formdata.append('image', ev.target.files[0]);
      fetch('https://api.imgur.com/3/image/', {
        method: 'post',
        headers: {
          Authorization: 'Client-ID 0f695d3611373b4',
        },
        body: formdata,
      }).then((data) => data.json()).then((data) => {
        imgPreview.src = data.data.link;
        url.innerText = data.data.link;
      });
    });
  }
}

customElements.define('recipe-upload', RecipeUpload);
