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

  optionIndex = {
    'N/A': 0,
    tsp: 1,
    tbsp: 2,
    oz: 3,
    c: 4,
    pt: 5,
    qt: 6,
    gal: 7,
    ml: 8,
    l: 9,
  };

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

    <h2 id="header-upload-photo">Upload Photo</h2>
    <p id="p-upload-photo">Please upload a picture of your completed dish!</p>

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
    this.shadowRoot.getElementById('recipe-title').innerText = 'Edit Recipe';
    this.shadowRoot.getElementById('header-upload-photo').innerText = 'Upload New Photo';
    this.shadowRoot.getElementById('p-upload-photo').innerText = 'Upload a new picture if you wish to edit the dish image!';

    this.fill_in_existing_data();
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

      for (let i = 0; i < instructionCount; i += 1) {
        const currInstruction = divInstructions.getElementsByTagName('textarea')[i].value;
        jsonText.directions[i] = currInstruction;
      }

      // TODO (Lorenzo)
      // if isCreateRecipe - add the recipe to dexie
      // if !isCreateRecipe - update the recipe on dexie
      try {
        localStorage.setItem(jsonName, JSON.stringify(jsonText));
      } catch (e) {
        console.log(`Storage failed: ${e}`);
      }
    });
  }

  // Takes in recipe name and generates .json name
  RecipeNameGenerator(name) {
    let recipeName = '';

    // replace all spaces
    for (let i = 0; i < name.length; i += 1) {
      const curr = name.charAt(i);
      if (curr === ' ') {
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
        stepNum -= 1;
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
      if (stepNum < 25) {
        stepNum += 1;
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
        for (let i = 0; i < selectOptions.length; i += 1) {
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

      if (stepNum < 25) {
        stepNum += 1;
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
        stepNum -= 1;
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

  /**
 * The function that will fill in the data into the text boxes for some specific recipe edit page
 * Right now the data we use is whatever the recipe we manually choose
 * Later it will correspond to the recipe we clicked on to edit
 */
  fill_in_existing_data() {
    this.shadowRoot.getElementById('recipeName').value = this.json.title;
    this.shadowRoot.getElementById('recipeDescription').value = this.json.description;
    this.shadowRoot.getElementById('url').innerText = this.json.image;
    this.shadowRoot.getElementById('imgPreview').src = this.json.image;
    this.shadowRoot.getElementById('servingSize').value = this.json.servingSize;
    this.shadowRoot.getElementById('scoville').value = this.json.scoville;
    this.shadowRoot.getElementById('prepMins').value = this.json.time[0].minutes;
    this.shadowRoot.getElementById('prepHrs').value = this.json.time[0].hours;
    this.shadowRoot.getElementById('cookMins').value = this.json.time[1].minutes;
    this.shadowRoot.getElementById('cookHrs').value = this.json.time[1].hours;

    for (let i = 1; i < (this.json.ingredientList.length); i += 1) {
      this.MakeExtraSlots(this.json.ingredientList[i]);
      // console.log(optionIndex[data.ingredientList[i].units]);
      this.shadowRoot.getElementById('ingredientUnits').selectedIndex = this.optionIndex[this.json.ingredientList[i].units];
    }
    const div1 = this.shadowRoot.getElementById('ingredients');
    const inputName = div1.getElementsByTagName('input')[0];
    const inputQuantity = div1.getElementsByTagName('input')[1];
    const select = div1.getElementsByTagName('select')[0];
    inputName.value = this.json.ingredientList[0].name;
    inputQuantity.value = this.json.ingredientList[0].quantity;
    select.options[this.optionIndex[this.json.ingredientList[0].units]].selected = true;

    const { directions } = this.json;
    for (let i = 1; i < (directions.length); i += 1) {
      this.MakeExtraInstructionSlots(directions[i]);
    }
    const div2 = this.shadowRoot.getElementById('instructions');
    const textArea = div2.getElementsByTagName('textarea')[0];
    textArea.value = this.json.directions[0];
  }

  // adds another textarea for recipe instructions/steps when add step button is pressed
  MakeExtraInstructionSlots(data) {
    const div = this.shadowRoot.getElementById('instructions');
    let stepNum = Number(div.getAttribute('value'));

    if (stepNum < 25) {
      stepNum += 1;
      div.setAttribute('value', stepNum);
      const textArea = document.createElement('textarea');
      const lineBreak = document.createElement('br');
      textArea.setAttribute('cols', '60');
      textArea.setAttribute('rows', '2');
      textArea.setAttribute('placeholder', `Step ${stepNum}`);
      textArea.value = data;
      div.appendChild(lineBreak);
      div.appendChild(textArea);
    }
  }

  // adds another textarea for recipe instruction/steps when add step button is pressed
  MakeExtraSlots(data) {
    const button = this.shadowRoot.getElementById('addIngredientButton');
    const div = this.shadowRoot.getElementById('ingredients');
    const selectOptions = ['N/A', 'tsp', 'tbsp', 'oz', 'c', 'pt', 'qt', 'gal', 'ml', 'l'];

    let stepNum = Number(div.getAttribute('value'));
    if (stepNum < 25) {
      stepNum += 1;
      div.setAttribute('value', stepNum);
      const inputName = document.createElement('input');
      inputName.setAttribute('type', 'text');
      inputName.setAttribute('minlength', '2');
      inputName.setAttribute('maxlength', '40');
      inputName.setAttribute('minlength', '2');
      inputName.setAttribute('placeholder', 'Ingredient Description');

      inputName.value = this.shadowRoot.getElementById('ingredientDescription').value = data.name;
      // console.log(data.name);

      const inputQuantity = document.createElement('input');
      inputQuantity.setAttribute('type', 'number');
      inputQuantity.setAttribute('min', '0');
      inputQuantity.setAttribute('placeholder', 'Quantity');

      inputQuantity.value = this.shadowRoot.getElementById('ingredientDescription').value = data.quantity;
      // console.log(data.quantity);

      const select = document.createElement('select');
      for (let i = 0; i < selectOptions.length; i += 1) {
        const option = document.createElement('option');
        option.setAttribute('value', selectOptions[i]);
        option.innerText = selectOptions[i];
        select.appendChild(option);
      }
      const lineBreak = document.createElement('br');

      select.options[this.optionIndex[data.units]].selected = true;
      // document.getElementById("dropdown").selectedIndex = "1";

      div.appendChild(lineBreak);
      div.appendChild(inputName);
      div.appendChild(inputQuantity);
      div.appendChild(select);
    }
  }
}

customElements.define('recipe-upload', RecipeUpload);
