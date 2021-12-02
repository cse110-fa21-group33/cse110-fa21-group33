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
    styles.innerHTML = `
      article {
        display: block;
        margin-left: auto;
        margin-right: auto;
        max-width: 50%;
        background-color: #ee6858;
        padding: 15px 30px;
      }

      h1 {
        text-align: center;
      }

    `;

    article.innerHTML = `
        <h1 id="recipe-title">Upload Recipe</h1>

        <h2>Recipe Name</h2>
        <input type="text" id="recipeName" required minlength="2" maxlength="40" size="30">
        
        <h2>Description</h2>
        <textarea id="recipeDescription" rows="7" cols="50"></textarea>

        <h2>Upload Photo</h2>
        <p>Please upload a picture of your completed dish!</p>

        <img src="https://www.ranjaniskitchen.com/wp-content/plugins/osetin-helper/assets/img/placeholder-category.png" id="imgPreview" alt="temp" width="400" height="400" referrerpolicy="no-referrer">
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
            <input type="number" id="ingredientQuantity" min="0" max="999999" placeholder="Quantity" required>
            <select id="ingredientUnits">
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
    'cups': 1,
    'pt': 2,
    'qt': 3,
    'gal': 4,
    'tsp': 5,
    'tbsp': 6,
    'fl oz': 7,
    'mL': 8,
    'L': 9,
    'g': 10,
    'kg': 11,
    'oz': 12,
    'lbs': 13,
    'mm': 14,
    'cm': 15,
    'm': 16,
    'in': 17,
    'pinch': 18,
    'drop': 19
  };

  /**
   * Sets the recipe that will be used insidet the <recipe-display> element.
   * Overwrites the previous recipe displayed.
   */
  set data(data) {
    this.json = data;
    // Reset HTML
    const styles = document.createElement('style');

    this.shadowRoot.querySelector('article').innerHTML = `
    <h1 id="recipe-title">Upload Recipe</h1>

    <h2>Recipe Name</h2>
    <input type="text" id="recipeName" required minlength="2" maxlength="40" size="30">
    
    <h2>Description</h2>
    <textarea id="recipeDescription" rows="7" cols="50"></textarea>

    <h2 id="header-upload-photo">Upload Photo</h2>
    <p id="p-upload-photo">Please upload a picture of your completed dish!</p>

    <img src="https://www.ranjaniskitchen.com/wp-content/plugins/osetin-helper/assets/img/placeholder-category.png" id="imgPreview" alt="temp" width="400" height="400" referrerpolicy="no-referrer">
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
        <input type="number" id="ingredientQuantity" min="0" max="999999" placeholder="Quantity" required>
        <select id="ingredientUnits">
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
    this.RemoveSpecificInstruction();
    this.RemoveSpecificIngredient();
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

  /**
   * Check to see if the user input is valid and let user know what inputs to change to fix input
   */
  RecipeInputsGood(event) {
    // TODO
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
    div.addEventListener('click', function (e) {
      if (e.target && e.target.id == 'specificInstructionRemove') {
        let instr_number = e.target.value;
        let stepNum = Number(div.getAttribute('value'));
        console.log(instr_number);
        if (stepNum > 1) {
          const textArea = div.getElementsByTagName('textarea')[instr_number];
          const lineBreak = div.getElementsByTagName('br')[instr_number];
          const button = div.getElementsByTagName('button')[instr_number];
          div.removeChild(textArea);
          div.removeChild(button);
          div.removeChild(lineBreak);

          for (let i = instr_number; i < div.getElementsByTagName('button').length; i++) {
            let new_index = +i + +1;
            div.getElementsByTagName('textarea')[i].placeholder = `Step ${new_index}`;
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
        const inputQuantity = document.createElement('input');
        inputQuantity.setAttribute('type', 'number');
        inputQuantity.setAttribute('min', '0');
        inputQuantity.setAttribute('max', '999999');
        inputQuantity.setAttribute('placeholder', 'Quantity');
        const select = document.createElement('select');
        for (let i = 0; i < selectOptions.length; i += 1) {
          const option = document.createElement('option');
          option.setAttribute('value', selectOptions[i]);
          option.innerText = selectOptions[i];
          select.appendChild(option);
        }
        const lineBreak = document.createElement('br');
        let btn1 = document.createElement("button");
        btn1.innerHTML = "Remove this ingredient";
        btn1.classList.add("specificIngredientRemove");
        btn1.id = "specificIngredientRemove";
        btn1.type = "button";
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
        textArea.setAttribute('cols', '60');
        textArea.setAttribute('rows', '2');
        textArea.setAttribute('minlength', '1');
        textArea.setAttribute('maxlength', '500');
        textArea.setAttribute('placeholder', `Step ${stepNum}`);
        div.appendChild(textArea);
        //const instructions_div = this.shadowRoot.getElementById('instructions');
        let btn2 = document.createElement("button");
        btn2.innerHTML = "Remove this instruction";
        btn2.classList.add("specificInstructionRemove");
        btn2.id = "specificInstructionRemove";
        btn2.type = "button";
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
    div.addEventListener('click', function (e) {
      if (e.target && e.target.id == 'specificIngredientRemove') {
        let instr_number = e.target.value;
        let stepNum = Number(div.getAttribute('value'));
        console.log(instr_number);
        if (stepNum > 1) {
          let one = parseInt(instr_number) * 2;
          let two = parseInt(instr_number) * 2 + 1;
          console.log(one);
          console.log(two);
          const lineBreak = div.getElementsByTagName('br')[instr_number];
          const inputName = div.getElementsByTagName('input')[one];
          const inputQuantity = div.getElementsByTagName('input')[two];
          const select = div.getElementsByTagName('select')[instr_number];
          const button = div.getElementsByTagName('button')[instr_number];
          div.removeChild(lineBreak);
          div.removeChild(inputName);
          div.removeChild(inputQuantity);
          div.removeChild(select);
          div.removeChild(button);
          for (let i = instr_number; i < div.getElementsByTagName('button').length; i++) {
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
    console.log(this.json);
    if (this.json.image == "") {
      this.shadowRoot.getElementById('url').innerText = "";
      this.shadowRoot.getElementById('imgPreview').src = "https://www.ranjaniskitchen.com/wp-content/plugins/osetin-helper/assets/img/placeholder-category.png";
    }
    else {
      this.shadowRoot.getElementById('url').innerText = this.json.image;
      this.shadowRoot.getElementById('imgPreview').src = this.json.image;
    }
    this.shadowRoot.getElementById('servingSize').value = this.json.servingSize;
    this.shadowRoot.getElementById('scoville').value = this.json.scoville;
    this.shadowRoot.getElementById('prepMins').value = this.json.time[0].minutes;
    this.shadowRoot.getElementById('prepHrs').value = this.json.time[0].hours;
    this.shadowRoot.getElementById('cookMins').value = this.json.time[1].minutes;
    this.shadowRoot.getElementById('cookHrs').value = this.json.time[1].hours;

    const ingredients_div = this.shadowRoot.getElementById('ingredients');
    let btn1 = document.createElement("button");
    btn1.innerHTML = "Remove this ingredient";
    btn1.classList.add("specificIngredientRemove");
    btn1.id = "specificIngredientRemove";
    btn1.type = "button";
    btn1.value = 0;
    ingredients_div.appendChild(btn1);
    const lineBreak1 = document.createElement('br');
    ingredients_div.appendChild(lineBreak1);

    for (let i = 1; i < (this.json.ingredientList.length); i += 1) {
      this.MakeExtraIngredientsSlots(this.json.ingredientList[i]);
      //console.log(optionIndex[data.ingredientList[i].units]);
      this.shadowRoot.getElementById('ingredientUnits').selectedIndex = this.optionIndex[this.json.ingredientList[i].units];
    }
    const div1 = this.shadowRoot.getElementById('ingredients');
    const inputName = div1.getElementsByTagName('input')[0];
    const inputQuantity = div1.getElementsByTagName('input')[1];
    const select = div1.getElementsByTagName('select')[0];
    inputName.value = this.json.ingredientList[0].name;
    inputQuantity.value = this.json.ingredientList[0].quantity;
    select.options[this.optionIndex[this.json.ingredientList[0].units]].selected = true;
    const instructions_div = this.shadowRoot.getElementById('instructions');
    let btn2 = document.createElement("button");
    btn2.innerHTML = "Remove this instruction";
    btn2.classList.add("specificInstructionRemove");
    btn2.id = "specificInstructionRemove";
    btn2.type = "button";
    btn2.value = 0;
    instructions_div.appendChild(btn2);
    const lineBreak = document.createElement('br');
    instructions_div.appendChild(lineBreak);
    const { directions } = this.json;
    for (let i = 1; i < (directions.length); i += 1) {
      this.MakeExtraInstructionSlots(directions[i]);
    }
    const div2 = this.shadowRoot.getElementById('instructions');
    const textArea = div2.getElementsByTagName('textarea')[0];
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
      textArea.setAttribute('cols', '60');
      textArea.setAttribute('rows', '2');
      textArea.setAttribute('minlength', '1');
      textArea.setAttribute('maxlength', '500');
      textArea.setAttribute('placeholder', `Step ${stepNum}`);
      textArea.value = data;
      div.appendChild(textArea);
      let btn = document.createElement("button");
      btn.innerHTML = "Remove this instruction";
      btn.classList.add("specificInstructionRemove");
      btn.id = "specificInstructionRemove";
      btn.type = "button";
      btn.value = stepNum - 1;
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
      // console.log(data.name);
      const inputQuantity = document.createElement('input');
      inputQuantity.setAttribute('type', 'number');
      inputQuantity.setAttribute('min', '0');
      inputQuantity.setAttribute('max', '999999');
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
      div.appendChild(inputName);
      div.appendChild(inputQuantity);
      div.appendChild(select);
      let btn = document.createElement("button");
      btn.innerHTML = "Remove this ingredient";
      btn.classList.add("specificIngredientRemove");
      btn.id = "specificIngredientRemove";
      btn.type = "button";
      btn.value = (stepNum - 1);
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
