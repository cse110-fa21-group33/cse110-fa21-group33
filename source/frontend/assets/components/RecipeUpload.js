import { database } from '../scripts/database.js';

// RecipeUpload.js
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

    styles.innerHTML = `
      article {
        display: block;
        margin-left: auto;
        margin-right: auto;
        max-width: 50%;
        background-color: #ee6858;
        padding: 15px 30px;
        border-radius: 20px;
      }

      h1 {
        text-align: center;
      }

      img {
        width: 55%;
        margin-left: 22.5%;
        height: auto;
      }

      img.scale{
        margin-top: 10%;
      }

      input[type="button"] {
        background-color: white;
        border-radius: 20px;
        font-family: 'Mochiy Pop P One', sans-serif;
        border: 2px solid black;
        margin: 1px;
        cursor: pointer;
      }

      .ingredientDescription {
        margin: 5px;
      }

      .ingredientQuantity {
        margin: 5px;
      }

      .ingredientUnits {
        margin: 5px;
      }

      .specificInstructionRemove{
    
      }

      input[type="number"], .ingredientUnits {
        width: 20%;
        height: 2rem;
      }

      input[type="text"]:not(.ingredientDescription) {
        width: 100%;
        height: 2rem;
      }

      .ingredientDescription {
        width: 40%;
        height: 2rem;
      }

      #instructions > textarea {
        width: 90%;
        
      }

      textarea {
        width: 100%;
        margin: 5px;
      }

      input[type="button"]:active {
        background-color: rgb(187, 187, 187);
      }

      .scale {
        float: right;
        width: 50%;
        height: 30%;
      }

      button {
        font-size: 18px;
        background-color: transparent;
        cursor: pointer;
        font-weight: bold;
        padding-bottom: 2px;
        height: 25px;
        width: 20px;
        color: #767676;
        font-family: 'Mochiy Pop P One', sans-serif;
        box-sizing: border-box;
        line-height: 25px;
        border: transparent;
        cursor: pointer;
      }

      input[type="file" i] {
        margin-right: auto;
        margin-left: 40%;
        width: 50%;
      }

      #formButtons {
        display: flex;
        justify-content: center;
      }

      @media (prefers-color-scheme: dark) {

        article {
          background-color: var(--bg-color-red);
        }

        h1,
        h2,
        h4,
        p,
        button {
          color: var(--font-color);
        }

        input:not([type='button']) {
          background-color: var(--bg-color);
          color: var(--font-color);
        }

        input[type="file" i] {
          background: transparent;
        }

        img {
          opacity: .75;
          transition: opacity .5s ease-in-out;
        }

        input[type='button']{
          background-color: var(--bg-color);
          border: 2px solid var(--font-color);
          color: var(--font-color);
        }

        input[type="file" i]::-webkit-file-upload-button {
          background-color: var(--bg-color);
          color: var(--font-color);
        }

        textarea, select {
          background-color: var(--bg-color);
          color: var(--font-color);
        }


      }
      
      
    `;

    article.innerHTML = `
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
    <p id="url" hidden></p>
    
    <img src="assets/images/scoville-scale.png" class="scale">
    
    <h2>Serving Size</h2>
    <h4>How many people can this dish feed or how many portions can it make?</h4>
    <input type="number" id="servingSize" min="0" max="59" size = "50" value="0" required>
    
    <h2>Scoville Heat Units</h2>
    <h4>How many Scoville Heat Units is the hottest pepper is your dish? (refer to scale on right)</h4>
    <input type="number" id="scoville" min="0" max="3000000" value="0" required>
    
    <div id="prepTime">
        <h2>Prep Time</h2>
        <h4>How much time is needed to prepare the ingredients?</h4>
        <div id="cookTimeInput">
            <input type="number" id="prepHrs" min="0" max="20"  placeholder="Hours" required>
            <input type="number" id="prepMins" min="0" max="59" placeholder="Minutes" required>
        </div>
    </div>
    
    <div id="cookTime">
        <h2>Cooking Time</h2>
        <div id="prepTimeInput">
            <input type="number" id="cookHrs" min="0" max="20"  placeholder="Hours" required>
            <input type="number" id="cookMins" min="0" max="59" placeholder="Minutes" required>
        </div>
    </div>
    
    <div id="ingredients" value="1">
    <h2>Ingredients</h2>
        <input type="text" id="ingredientDescription" class="ingredientDescription" required minlength="2" maxlength="40" placeholder="Ingredient Description">
        <input type="number" id="ingredientQuantity" class="ingredientQuantity" min="0" max="999999" placeholder="Quantity" required>
        <select id="ingredientUnits" class="ingredientUnits">
          <option>N/A</option>
          <option>cups</option>
          <option>pt</option>
          <option>qt</option>
          <option>gal</option>
          <option>tsp</option>
          <option>tbsp</option>
          <option>fl oz</option>
          <option>mL</option>
          <option>L</option>
          <option>g</option>
          <option>kg</option>
          <option>oz</option>
          <option>lbs</option>
          <option>mm</option>
          <option>cm</option>
          <option>m</option>
          <option>in</option>
          <option>pinch</option>
          <option>drop</option>
        </select>
        <button class="specificIngredientRemove" id="specificIngredientRemove" type="button" value="0">X</button>
        <br>
    </div>
    <input type="button" id="addIngredientButton" value="Add Ingredient">
    <input type="button" id="removeIngredientButton" value="Remove Ingredient">
    
    <div id="instructions" value="1">
        <h2>Instructions</h2>
        <textarea cols='60' rows='2' placeholder="Step 1"></textarea>
        <button class="specificInstructionRemove" id="specificInstructionRemove" type="button" value="0">X</button>
        <br>
    </div>
    <input id="addStepButton" type="button" value="Add Step">
    <input id="removeStepButton" type="button" value="Remove Step">
    
    <div id="formButtons">
        <input id="cancelButton" class="Cancel" type="button" value="Cancel">
        <input id="submitButton" class="Submit" type="button" value="Submit">
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
   * All the ingredient measurement options
   */
  optionIndex = {
    'N/A': 0,
    cups: 1,
    pt: 2,
    qt: 3,
    gal: 4,
    tsp: 5,
    tbsp: 6,
    'fl oz': 7,
    mL: 8,
    L: 9,
    g: 10,
    kg: 11,
    oz: 12,
    lbs: 13,
    mm: 14,
    cm: 15,
    m: 16,
    in: 17,
    pinch: 18,
    drop: 19,
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
    <p id="url" hidden></p>
    
    <img src="assets/images/scoville-scale.png" class="scale">
    
    <h2>Serving Size</h2>
    <h4>How many people can this dish feed or how many portions can it make?</h4>
    <input type="number" id="servingSize" min="0" max="59" size = "50" value="0" required>
    
    <h2>Scoville Heat Units</h2>
    <h4>How many Scoville Heat Units is the hottest pepper is your dish? (refer to scale on right)</h4>
    <input type="number" id="scoville" min="0" max="3000000" value="0" required>
    
    <div id="prepTime">
        <h2>Prep Time</h2>
        <h4>How much time is needed to prepare the ingredients?</h4>
        <div id="cookTimeInput">
            <input type="number" id="prepHrs" min="0" max="20"  placeholder="Hours" required>
            <input type="number" id="prepMins" min="0" max="59" placeholder="Minutes" required>
        </div>
    </div>
    
    <div id="cookTime">
        <h2>Cooking Time</h2>
        <div id="prepTimeInput">
            <input type="number" id="cookHrs" min="0" max="20"  placeholder="Hours" required>
            <input type="number" id="cookMins" min="0" max="59" placeholder="Minutes" required>
        </div>
    </div>
    
    <div id="ingredients" value="1">
    <h2>Ingredients</h2>
        <input type="text" id="ingredientDescription" class="ingredientDescription" required minlength="2" maxlength="40" placeholder="Ingredient Description">
        <input type="number" id="ingredientQuantity" class="ingredientQuantity" min="0" max="999999" placeholder="Quantity" required>
        <select id="ingredientUnits" class="ingredientUnits">
          <option>N/A</option>
          <option>cups</option>
          <option>pt</option>
          <option>qt</option>
          <option>gal</option>
          <option>tsp</option>
          <option>tbsp</option>
          <option>fl oz</option>
          <option>mL</option>
          <option>L</option>
          <option>g</option>
          <option>kg</option>
          <option>oz</option>
          <option>lbs</option>
          <option>mm</option>
          <option>cm</option>
          <option>m</option>
          <option>in</option>
          <option>pinch</option>
          <option>drop</option>
        </select>
        <button class="specificIngredientRemove" id="specificIngredientRemove" type="button" value="0">X</button>
        <br>
    </div>
    <input type="button" id="addIngredientButton" value="Add Ingredient">
    <input type="button" id="removeIngredientButton" value="Remove Ingredient">
    
    <div id="instructions" value="1">
        <h2>Instructions</h2>
        <textarea cols='60' rows='2' placeholder="Step 1"></textarea>
        <button class="specificInstructionRemove" id="specificInstructionRemove" type="button" value="0">X</button>
        <br>
    </div>
    <input id="addStepButton" type="button" value="Add Step">
    <input id="removeStepButton" type="button" value="Remove Step">
    
    <div id="formButtons">
        <input id="cancelButton" class="Cancel" type="button" value="Cancel">
        <input id="submitButton" class="Submit" type="button" value="Submit">
    </div>`;
    this.AddInstruction();
    this.RemoveInstruction();

    this.AddIngredient();
    this.RemoveIngredient();

    this.GetImgurImage();
    this.SubmitRecipe();

    this.RemoveSpecificIngredient();
    this.RemoveSpecificInstruction();
    if (data == null) {
      this.isCreate = true;
      return;
    }
    this.isCreate = false;

    // Update data here
    this.shadowRoot.getElementById('recipe-title').innerText = 'Edit Recipe';
    this.shadowRoot.getElementById('header-upload-photo').innerText = 'Upload New Photo';
    this.shadowRoot.getElementById('p-upload-photo').innerText = 'Upload a new picture if you wish to edit the dish image!';

    if (data.challenges.length === 0) {
      const deleteButton = document.createElement('input');
      deleteButton.setAttribute('id', 'deleteButton');
      deleteButton.classList.add('Delete');
      deleteButton.setAttribute('type', 'button');
      deleteButton.setAttribute('value', 'Delete');
      this.shadowRoot.getElementById('formButtons').appendChild(deleteButton);
      this.BindDeleteButton();
    }
    this.FillExistingData();
  }

  /**
   * Attempt to take user input and convert to .json file
   */
  SubmitRecipe() {
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

      const totalTimeArr = this.CalculateTotalTime(prepHrs, prepMins, cookHrs, cookMins);

      const jsonText = {
        title: recipeName,
        description,
        image: url,
        servingSize,
        scoville,
        prepTime: prepHrs * 60 + prepMins,
        cookTime: cookHrs * 60 + cookMins,
        totalTime: totalTimeArr[0] * 60 + totalTimeArr[1],
        ingredientList: [],
        directions: [],
        // hard code it to no challenges for now as in the future user should be able to select a
        // challenge this recipe is in.
        challenge: 'No Challenge',
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

      if (this.json != null) {
        jsonText.challenges = this.json.challenges;
        jsonText.completed = this.json.completed;
        if (jsonText.completed === true) {
          jsonText.reactions = this.json.reactions;
        }
      }

      // Determine spice level
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

      jsonText.directions = jsonText.directions.join('\n');

      if (this.isCreate) {
        database.addRecipe(jsonText);
      } else {
        jsonText.id = this.json.id;
        database.updateRecipe(jsonText);
      }
    });
  }

  /**
   * Calculates total cook time, accounting for overflow
   * @param {*} prepHrs
   * @param {*} prepMins
   * @param {*} cookHrs
   * @param {*} cookMins
   * @returns total cook time
   */
  CalculateTotalTime(prepHrs, prepMins, cookHrs, cookMins) {
    let totalMins = prepMins + cookMins;
    const carryHrs = Math.floor(totalMins / 60);

    totalMins %= 60;
    const totalHrs = prepHrs + cookHrs + carryHrs;

    return new Array(totalHrs, totalMins);
  }

  /**
   * Removes last textarea for recipe instruction/steps when remove step button is pressed
   */
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
        const button = div.getElementsByTagName('button')[div.getElementsByTagName('button').length - 1];
        div.removeChild(textArea);
        div.removeChild(lineBreak);
        div.removeChild(button);
      }
    });
  }

  /**
  * Removes a specific instruction/step based on which remove button has been called
  */
  RemoveSpecificInstruction() {
    const div = this.shadowRoot.getElementById('instructions');
    div.addEventListener('click', (e) => {
      if (e.target && e.target.id == 'specificInstructionRemove') {
        const instrNumber = e.target.value;
        let stepNum = Number(div.getAttribute('value'));
        if (stepNum > 1) {
          const textArea = div.getElementsByTagName('textarea')[instrNumber];
          const lineBreak = div.getElementsByTagName('br')[instrNumber];
          const button = div.getElementsByTagName('button')[instrNumber];
          div.removeChild(textArea);
          div.removeChild(button);
          div.removeChild(lineBreak);

          for (let i = instrNumber; i < div.getElementsByTagName('button').length; i++) {
            const newIndex = +i + +1;
            div.getElementsByTagName('textarea')[i].placeholder = `Step ${newIndex}`;
            div.getElementsByTagName('button')[i].value--;
          }
          stepNum -= 1;
          div.setAttribute('value', stepNum);
        }
      }
    });
  }

  /**
   * Adds another textarea for recipe instruction/steps when add step button is pressed
   */
  AddIngredient() {
    const button = this.shadowRoot.getElementById('addIngredientButton');
    const div = this.shadowRoot.getElementById('ingredients');
    const selectOptions = ['N/A', 'cups', 'pt', 'qt', 'gal', 'tsp', 'tbsp', 'fl oz', 'mL', 'L', 'g',
      'kg', 'oz', 'lbs', 'mm', 'cm', 'm', 'in', 'pinch', 'drop'];

    button.addEventListener('click', () => {
      let stepNum = Number(div.getAttribute('value'));
      if (stepNum < 100) {
        stepNum += 1;
        div.setAttribute('value', stepNum);
        const inputName = document.createElement('input');
        inputName.setAttribute('type', 'text');
        inputName.setAttribute('minlength', '2');
        inputName.setAttribute('maxlength', '40');
        inputName.setAttribute('placeholder', 'Ingredient Description');
        inputName.classList.add('ingredientDescription');
        const inputQuantity = document.createElement('input');
        inputQuantity.setAttribute('type', 'number');
        inputQuantity.setAttribute('min', '0');
        inputQuantity.setAttribute('max', '999999');
        inputQuantity.setAttribute('placeholder', 'Quantity');
        inputQuantity.classList.add('ingredientQuantity');
        const select = document.createElement('select');
        select.classList.add('ingredientUnits');
        for (let i = 0; i < selectOptions.length; i += 1) {
          const option = document.createElement('option');
          option.setAttribute('value', selectOptions[i]);
          option.innerText = selectOptions[i];
          select.appendChild(option);
        }
        const lineBreak = document.createElement('br');
        const btn1 = document.createElement('button');
        btn1.innerHTML = 'X';
        btn1.classList.add('specificIngredientRemove');
        btn1.id = 'specificIngredientRemove';
        btn1.type = 'button';
        btn1.value = div.getElementsByTagName('button').length;
        div.appendChild(inputName);
        div.appendChild(inputQuantity);
        div.appendChild(select);
        div.appendChild(btn1);
        div.appendChild(lineBreak);
      }
    });
  }

  /**
   * Adds another textarea for recipe instruction/steps when add step button is pressed
   */
  AddInstruction() {
    const button = this.shadowRoot.getElementById('addStepButton');
    const div = this.shadowRoot.getElementById('instructions');

    button.addEventListener('click', () => {
      let stepNum = Number(div.getAttribute('value'));

      if (stepNum < 100) {
        stepNum += 1;
        div.setAttribute('value', stepNum);
        const textArea = document.createElement('textarea');
        textArea.setAttribute('style', 'width: 90%;');
        textArea.setAttribute('cols', '60');
        textArea.setAttribute('rows', '2');
        textArea.setAttribute('minlength', '1');
        textArea.setAttribute('maxlength', '500');
        textArea.setAttribute('placeholder', `Step ${stepNum}`);
        div.appendChild(textArea);
        const btn2 = document.createElement('button');
        btn2.innerHTML = 'X';
        btn2.classList.add('specificInstructionRemove');
        btn2.id = 'specificInstructionRemove';
        btn2.type = 'button';
        btn2.value = div.getElementsByTagName('button').length;
        div.appendChild(btn2);
        const lineBreak = document.createElement('br');
        div.appendChild(lineBreak);
      }
    });
  }

  /**
   * Removes last textarea for recipe instruction/steps when remove step button is pressed
   */
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
        const button = div.getElementsByTagName('button')[div.getElementsByTagName('button').length - 1];
        div.removeChild(lineBreak);
        div.removeChild(inputName);
        div.removeChild(inputQuantity);
        div.removeChild(select);
        div.removeChild(button);
      }
    });
  }

  /**
   * Removes a specific ingredient based on which remove button has been called
   */
  RemoveSpecificIngredient() {
    const div = this.shadowRoot.getElementById('ingredients');
    div.addEventListener('click', (e) => {
      if (e.target && e.target.id == 'specificIngredientRemove') {
        const instrNumber = e.target.value;
        let stepNum = Number(div.getAttribute('value'));
        // console.log(instr_number);
        if (stepNum > 1) {
          const one = parseInt(instrNumber) * 2;
          const two = parseInt(instrNumber) * 2 + 1;
          // console.log(one);
          // console.log(two);
          const lineBreak = div.getElementsByTagName('br')[instrNumber];
          const inputName = div.getElementsByTagName('input')[one];
          const inputQuantity = div.getElementsByTagName('input')[two];
          const select = div.getElementsByTagName('select')[instrNumber];
          const button = div.getElementsByTagName('button')[instrNumber];
          div.removeChild(lineBreak);
          div.removeChild(inputName);
          div.removeChild(inputQuantity);
          div.removeChild(select);
          div.removeChild(button);
          for (let i = instrNumber; i < div.getElementsByTagName('button').length; i++) {
            div.getElementsByTagName('button')[i].value--;
          }
          stepNum -= 1;
          div.setAttribute('value', stepNum);
        }
      }
    });
  }

  /**
   * Uses Imgur API to convert image file into a link
   */
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
   * This function will populate the edit page for a current recipe with its latest information
   */
  FillExistingData() {
    this.shadowRoot.getElementById('recipeName').value = this.json.title;
    this.shadowRoot.getElementById('recipeDescription').value = this.json.description;
    if (this.json.image === '') {
      this.shadowRoot.getElementById('url').innerText = '';
      this.shadowRoot.getElementById('imgPreview').src = 'assets/images/placeholder.png';
    } else {
      this.shadowRoot.getElementById('url').innerText = this.json.image;
      this.shadowRoot.getElementById('imgPreview').src = this.json.image;
    }
    this.shadowRoot.getElementById('servingSize').value = this.json.servingSize;
    this.shadowRoot.getElementById('scoville').value = this.json.scoville;
    this.shadowRoot.getElementById('prepMins').value = this.json.time[0].minutes;
    this.shadowRoot.getElementById('prepHrs').value = this.json.time[0].hours;
    this.shadowRoot.getElementById('cookMins').value = this.json.time[1].minutes;
    this.shadowRoot.getElementById('cookHrs').value = this.json.time[1].hours;

    for (let i = 1; i < (this.json.ingredientList.length); i += 1) {
      this.MakeExtraIngredientsSlots(this.json.ingredientList[i]);
      // console.log(optionIndex[data.ingredientList[i].units]);
      this.shadowRoot.getElementById('ingredientUnits').selectedIndex = this.optionIndex[this.json.ingredientList[i].units];
    }
    const ingredientsDiv = this.shadowRoot.getElementById('ingredients');
    const inputName = ingredientsDiv.getElementsByTagName('input')[0];
    const inputQuantity = ingredientsDiv.getElementsByTagName('input')[1];
    const select = ingredientsDiv.getElementsByTagName('select')[0];
    inputName.value = this.json.ingredientList[0].name;
    inputQuantity.value = this.json.ingredientList[0].quantity;
    select.options[this.optionIndex[this.json.ingredientList[0].units]].selected = true;
    const { directions } = this.json;
    for (let i = 1; i < (directions.length); i += 1) {
      this.MakeExtraInstructionSlots(directions[i]);
    }
    const instructionsDiv = this.shadowRoot.getElementById('instructions');
    const textArea = instructionsDiv.getElementsByTagName('textarea')[0];
    textArea.setAttribute('style', 'width: 90%;');
    textArea.value = this.json.directions[0];
  }

  /**
   * This is a helper function that creates new text boxes for the recipe's existing instructions
   * The text boxes then will be filled with the proper information accordingly
   */
  MakeExtraInstructionSlots(data) {
    const div = this.shadowRoot.getElementById('instructions');
    let stepNum = Number(div.getAttribute('value'));
    if (stepNum < 100) {
      stepNum += 1;
      div.setAttribute('value', stepNum);
      const textArea = document.createElement('textarea');
      const lineBreak = document.createElement('br');
      textArea.setAttribute('style', 'width: 90%;');
      textArea.setAttribute('cols', '60');
      textArea.setAttribute('rows', '2');
      textArea.setAttribute('minlength', '1');
      textArea.setAttribute('maxlength', '500');
      textArea.setAttribute('placeholder', `Step ${stepNum}`);
      textArea.value = data;
      div.appendChild(textArea);
      const btn = document.createElement('button');
      btn.innerHTML = 'X';
      btn.classList.add('specificInstructionRemove');
      btn.id = 'specificInstructionRemove';
      btn.type = 'button';
      // btn.value = stepNum - 1;
      btn.value = stepNum;
      div.appendChild(btn);
      div.appendChild(lineBreak);
    }
  }

  /**
   * This is a helper function that creates new text boxes for the recipe's existing ingredients
   * The text boxes then will be filled with the proper information accordingly
   */
  MakeExtraIngredientsSlots(data) {
    const button = this.shadowRoot.getElementById('addIngredientButton');
    const div = this.shadowRoot.getElementById('ingredients');
    const selectOptions = ['N/A', 'cups', 'pt', 'qt', 'gal', 'tsp', 'tbsp', 'fl oz', 'mL', 'L', 'g',
      'kg', 'oz', 'lbs', 'mm', 'cm', 'm', 'in', 'pinch', 'drop'];

    let stepNum = Number(div.getAttribute('value'));
    if (stepNum < 100) {
      stepNum += 1;
      div.setAttribute('value', stepNum);
      const inputName = document.createElement('input');
      inputName.setAttribute('type', 'text');
      inputName.setAttribute('minlength', '2');
      inputName.setAttribute('maxlength', '40');
      inputName.setAttribute('placeholder', 'Ingredient Description');
      inputName.value = this.shadowRoot.getElementById('ingredientDescription').value = data.name;
      inputName.classList.add('ingredientDescription');
      // console.log(data.name);
      const inputQuantity = document.createElement('input');
      inputQuantity.setAttribute('type', 'number');
      inputQuantity.setAttribute('min', '0');
      inputQuantity.setAttribute('max', '999999');
      inputQuantity.setAttribute('placeholder', 'Quantity');
      inputQuantity.value = this.shadowRoot.getElementById('ingredientDescription').value = data.quantity;
      // console.log(data.quantity);
      const select = document.createElement('select');
      select.classList.add('ingredientUnits');
      for (let i = 0; i < selectOptions.length; i += 1) {
        const option = document.createElement('option');
        option.setAttribute('value', selectOptions[i]);
        option.innerText = selectOptions[i];
        select.appendChild(option);
      }
      const lineBreak = document.createElement('br');
      select.options[this.optionIndex[data.units]].selected = true;
      div.appendChild(inputName);
      div.appendChild(inputQuantity);
      div.appendChild(select);
      const btn = document.createElement('button');
      btn.innerHTML = 'X';
      btn.classList.add('specificIngredientRemove');
      btn.id = 'specificIngredientRemove';
      btn.type = 'button';
      // btn.value = (stepNum - 1);
      btn.value = stepNum;
      div.appendChild(btn);
      div.appendChild(lineBreak);
    }
  }

  BindDeleteButton() {
    this.shadowRoot.getElementById('deleteButton').addEventListener('click', () => {
      console.log('Delete button');
      database.deleteRecipe(this.json);
    });
  }
}

customElements.define('recipe-upload', RecipeUpload);
