import { database } from '../scripts/database.js';

/**
 * RecipeDisplay.js
 *
 * Taken from Lab 7
 */
class RecipeDisplay extends HTMLElement {
  static jSConfetti = new JSConfetti();

  /**
   * Constructor builds the layout for the recipe page
   */
  constructor() {
    super();
    // Create Shadow DOM
    this.attachShadow({ mode: 'open' });
    const styles = document.createElement('style');
    const article = document.createElement('article');
    styles.innerHTML = `
      .main-container {
        max-width: 900px;
        margin: auto;
      }
      .recipe-section {
        background-color: #ee6858;
        padding: 20px 40px;
        border-radius: 25px;
      }
      
      /* generic button */
      .button-wrapper > button{
        padding: 5px;
        font-size: 18px;
      }

      button {
        background-color: white;
        border-radius: 20px;
        font-family: 'Mochiy Pop P One', sans-serif;
        border: 2px solid black;
        cursor: pointer;
      }

      button:active {
        background-color: rgb(187, 187, 187);
      }
      
      #recipe-media > img {
        display: block;
        width: 75%;
        align-content: center;
        margin-left: auto;
        margin-right: auto;
        height: auto;
        border: 1px black
      }

      .recipe-title {
        font-size: 50px;
        font-family: 'Mochiy Pop P One', sans-serif;
        padding: 0px;
        margin: 0px;
      }
      
      .recipe-about {
        display: grid;
        align-items: end;
        grid-template-columns: 1fr 0.5fr;
        padding-bottom: 30px;
      }
      
      .recipe-about .recipe-description {
        grid-row: 1 / 3
      }
      
      completed {
        text-align: center;
      }

      
      .recipe-spice-info {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      
      .recipe-spice-info > img {
        display: inline-block;
        object-fit: scale-down;
        width: 78px;
        padding: 0 5px;
        border-right: 4px
      }
      
      .recipe-about .button-wrapper {
        grid-column: 2 / 3;
        justify-self: end;
      }
      
      #recipe-information {
        margin: 10px;
        padding: 10px;
        border: 2px solid black;
        border-radius: 20px;
        background: white;
      }
      
      #recipe-information > span {
        display: flex;
        justify-content: space-between;
        height: auto;
      }
      
      .recipe-subtitle {
        font-size: 35px;
        margin-bottom: 20px;
        margin-top: 0px;
      }

      #recipe-ingredients {
        border: 2px solid black;
        padding: 15px;
        background: white;
        max-width: 765px;
        margin: auto;
      }
      
      .ingredient-list {
        columns: 2;
        -webkit-columns: 2;
        -moz-columns: 2;
        padding: 10px;
      }

      #recipe-directions {
        border: 2px solid black;
        padding: 15px;
        background: white;
        max-width: 765px;
        margin: auto;
      }

      .recipe-list {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        padding: 10px;  
      }

      li {
        break-inside: avoid-column;
        list-style: none;
        margin-left: 8px;
      }
      
      input[type="checkbox"] {
        margin-left: -8px;
      }

      .challenge-header > li {
        margin-left: 8px;
        list-style: disc;
      }  
     
      input[type="button"]  {
        background-color: white;
        border-radius: 20px;
        font-family: 'Mochiy Pop P One', sans-serif;
        border: 2px solid black;
        cursor: pointer;
      }

      .reaction-wrapper-img {
        display: block;
        justify-content: center;
        align-items: right;
        margin-right: auto;
        margin-left: auto;
        width: 50%;
      }

      .reaction-wrapper > :not(input[type="button"]) {
        display: block;
        justify-content: center;
        align-items: right;
        margin-right: auto;
        margin-left: auto;
        width: 23%;
      }

      .reaction-wrapper > input[type="button"] {
        display: block;
        justify-content: center;
        align-items: right;
        margin-right: auto;
        margin-left: auto;
        width: 80px;
      }

      input[type="button"]:active {
        background-color: rgb(187, 187, 187);
      }

      .button-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      hr {
        border-color: black;
      }

      @media (prefers-color-scheme: dark) {
        .recipe-section {
          background-color: var(--bg-color-red);
        }

        h1, input[type="file" i], completed {
          color: var(--font-color);
        }

        .recipe-description {
          color: var(--font-color);
          font-weight: bold;
        }

        #recipe-media > img {
          border: 1px solid var(--border-color);
        }
  
        img {
          opacity: .75;
          transition: opacity .5s ease-in-out;
          
        }

        button, input[type="file" i]::-webkit-file-upload-button {
          background-color: var(--bg-color);
          color: var(--font-color);
          border: 1px solid var(--border-color);
          cursor: pointer;
        }

        #recipe-information, 
        #recipe-ingredients, 
        #recipe-directions {
          background-color: var(--bg-color);
          color: var(--font-color);
          border: 2px solid var(--border-color);
        }

        input[type='button']{
          background-color: var(--bg-color);
          border: 2px solid var(--border-color);
          color: var(--font-color);
        }

        ol {
          color: var(--font-color);
        }
      }
    `;
    article.innerHTML = `
      <div class="main-container">
        <main>
          <article class="recipe-section">
            <div class="recipe-header">
              <h1></h1>
              <div class="recipe-about">
                <p class="recipe-description">
                </p>
                  <div class="recipe-spice-info">
                    <img src="">
                    <p id="recipe-spice-level"></p>    
                  </div>
              </div>      
            </div>
            <div id="recipe-media">
              <img src="">
            </div>
            <div id="recipe-information">
              <span id="recipe-prep-time">
                <p class="recipe-info-name">Prep Time:</p>
                <p class="recipe-info-number"></p>
              </span>
              <span id="recipe-cook-time">
                <p class="recipe-info-name">Cook Time:</p>
                <p class="info-number"></p>
              </span>
              <span id="recipe-serving-size">
                <p class="recipe-info-name">Serving Size:</p>
                <p class="recipe-info-number"></p>
              </span>
            </div>
            <div id="recipe-ingredients">
              <h3 class="recipe-subtitle">Ingredients</h3>
              <ul class="ingredient-list">
              </ul>
            </div>
            <br>
            <div id="recipe-directions">
              <h3 class="recipe-subtitle">Directions</h3>
              <ul class="recipe-list">
              </ul>
            </div>
            <br>
            <div class="button-wrapper">
              <button class="recipe-button" id="made-this-button">I Made This!</button>
            </div>
            <br>
            <div class="reaction-wrapper-img">
              <img style="display:none;" src="assets/images/placeholder.png" id="imgPreview" alt="temp" width="400" height="400" referrerpolicy="no-referrer">
              <br>
            </div>
            <div class="reaction-wrapper">
                <input style="display:none;" type="file" id="imgUpload" accept="image/*"></input>
                <br>
            </div>
            <div class="reaction-wrapper">
                <input style="display:none;" id="submitButton" class="Submit" type="button" value="Submit">
            </div>
          </article>
        </main>
      </div>
      `;
    this.shadowRoot.append(styles, article);
  }

  GetImgurImage() {
    const imgUpload = this.shadowRoot.getElementById('imgUpload');
    const imgPreview = this.shadowRoot.getElementById('imgPreview');
    // const url = this.shadowRoot.getElementById('url');
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
      });
    });
  }

  /**
   * Sets the recipe that will be used inside the <recipe-display> element.
   * Overwrites the previous recipe displayed.
   */
  set data(data) {
    this.json = data;
    // Reset HTML
    this.shadowRoot.querySelector('article').innerHTML = `
        <div class="main-container">
          <main>
            <article class="recipe-section">
              <div class="recipe-header">
                <h1 class="recipe-title"></h1>
                <div class="recipe-about">
                  <p class="recipe-description"></p>
                    <div class="recipe-spice-info">
                      <img src="">
                      <p id="recipe-spice-level"></p>    
                    </div>
                    <div class="button-wrapper">
                      <button id="editButton" class="edit-button">Edit</button>
                    </div>  
                </div>      
              </div>
              <div id="recipe-media">
                <img src="">
              </div>
              <div id="recipe-information">
                <span id="recipe-prep-time">
                  <p class="recipe-info-name">Prep Time:</p>
                  <p class="recipe-info-number"></p>
                </span>
                <span id="recipe-cook-time">
                  <p class="recipe-info-name">Cook Time:</p>
                  <p class="recipe-info-number"></p>
                </span>
                <span id="recipe-serving-size">
                  <p class="recipe-info-name">Serving Size:</p>
                  <p class="recipe-info-number"></p>
                </span>
              </div>
              <div id="recipe-ingredients">
                <h3 class="recipe-subtitle">Ingredients</h3>
                <ul class="ingredient-list">
                </ul>
              </div>
              <br>
              <div id="recipe-directions">
                <h3 class="recipe-subtitle">Directions</h3>
                <ul class="recipe-list">
                </ul>
              </div>
              <br>
              <div class="button-wrapper">
                <button class="recipe-button" id="made-this-button">I Made This!</button>
              </div>
              <br>
              <div class="reaction-wrapper-img">
                <img style="display:none;" src="assets/images/placeholder.png" id="imgPreview" alt="temp" width="400" height="400" referrerpolicy="no-referrer">
                <br>
              </div>
              <div class="reaction-wrapper">
                <input style="display:none;" type="file" id="imgUpload" accept="image/*"></input>
                <br>
              </div>
              <div class="reaction-wrapper">
                <input style="display:none;" id="submitButton" class="Submit" type="button" value="Submit">
              </div>
            </article>
          </main>
        </div>
    `;
    const { title } = data;
    this.shadowRoot.querySelector('h1').innerHTML = title;
    const { description } = data;
    this.shadowRoot.querySelector('.recipe-description').innerHTML = description;
    const { image } = data;
    const img = this.shadowRoot.querySelector('#recipe-media > img');
    if (image === '') {
      img.setAttribute('src', 'assets/images/placeholder.png');
    } else {
      img.setAttribute('src', image);
    }
    img.setAttribute('alt', title);
    for (let i = 0; i < data.spiceRating; i += 1) {
      this.shadowRoot.querySelector('#recipe-spice-level').innerHTML += '🌶️';
    }
    const prepTime = calculateTime(data.prepTime);
    this.shadowRoot.querySelector('#recipe-prep-time > .recipe-info-number').innerHTML = prepTime;
    const cookTime = calculateTime(data.cookTime);
    this.shadowRoot.querySelector('#recipe-cook-time > .recipe-info-number').innerHTML = cookTime;
    const { servingSize } = data;
    this.shadowRoot.querySelector('#recipe-serving-size > .recipe-info-number').innerHTML = servingSize;

    const { ingredientList } = data;
    ingredientList.forEach((ingredient) => {
      const ingredientString = getIngredient(ingredient);
      const ingredientContainer = createCheckbox(ingredientString);
      this.shadowRoot.querySelector('#recipe-ingredients > .ingredient-list').appendChild(ingredientContainer);
    });

    const directions  = data.directions.split(/\r?\n/);
    directions.forEach((direction) => {
      const directionContainer = createCheckbox(direction);
      this.shadowRoot.querySelector('#recipe-directions > .recipe-list').appendChild(directionContainer);
    });

    const btn = this.shadowRoot.getElementById('made-this-button');
    if (data.completed === true) {
      const newBox = document.createElement('completed');
      newBox.innerHTML = 'Completed!';
      newBox.innerHTML += '<br><br>Upload a picture of your reaction!';
      btn.parentElement.appendChild(newBox);
      btn.parentElement.removeChild(btn);
      const uploadImg = this.shadowRoot.getElementById('imgUpload');
      const submitBtn = this.shadowRoot.getElementById('submitButton');
      const imgPreview = this.shadowRoot.getElementById('imgPreview');
      uploadImg.style.display = '';
      submitBtn.style.display = '';
      imgPreview.style.display = '';
      if ('reactions' in data) {
        imgPreview.src = data.reactions;
      }
      this.GetImgurImage();
      this.SubmitReaction();
    } else {
      this.bindCompleteButton(data);
    }
    if (data.challenge != 'No Challenge') {
      this.ShowChallenge(data);
    }
  }

  /**
   * Creates the reaction section if the recipe was completed
   */
  SubmitReaction() {
    const button = this.shadowRoot.getElementById('submitButton');
    button.addEventListener('click', () => {
      const imgPreview = this.shadowRoot.getElementById('imgPreview');
      this.json.reactions = imgPreview.src;
      database.updateRecipe(this.json);
    });
  }

  /**
   * When completing a recipe, it will make the appropriate changes to the challenges it
   * is a part of, throw confetti, and display the reaction section.
   * @param {*} data
   */
  bindCompleteButton(data) {
    const btn = this.shadowRoot.getElementById('made-this-button');
    btn.addEventListener('click', () => {
      RecipeDisplay.jSConfetti.addConfetti({ emojis: ['🥵', '🔥', '🌶️'] });
      if (data.completed === false) {
        database.completeRecipe(data);
        const newBox = document.createElement('completed');
        newBox.innerHTML = 'Completed!';
        newBox.innerHTML += '<br><br>Upload a picture of your reaction!';
        btn.parentElement.appendChild(newBox);
        btn.parentElement.removeChild(btn);
        const imgPreview = this.shadowRoot.getElementById('imgPreview');
        imgPreview.style.display = '';
        const uploadImg = this.shadowRoot.getElementById('imgUpload');
        uploadImg.style.display = '';
        const submitBtn = this.shadowRoot.getElementById('submitButton');
        submitBtn.style.display = '';
        this.GetImgurImage();
        this.json.reactions = 'assets/images/placeholder.png';
        this.SubmitReaction();
      }
    });
  }

  /**
   * Displays the challenges the recipe is a part of
   * @param {*} data
   */
  ShowChallenge(data) {
    const dummyChild = this.shadowRoot.getElementById('recipe-directions');
    const challengeHeader = document.createElement('ol');
    challengeHeader.classList.add('challenge-header');
    challengeHeader.innerHTML = '<br><br>Included in Challenges';
    //data.challenges.forEach((childChallenge) => {
      const li = document.createElement('li');
      li.innerHTML = data.challenge;
      challengeHeader.append(li);
    //});
    dummyChild.parentElement.appendChild(challengeHeader);
  }
}

/**
 * Calculates the time string to display
 * @param {*} time
 * @returns string to display time
 */
function calculateTime(minutes) {
  let time = {
    hours: Math.floor(minutes / 60),
    minutes: minutes % 60
  };

  let timeString = '';
  if (time.hours > 0) {
    timeString += `${time.hours} hours`;
    if (time.minutes > 0) {
      timeString += `, ${time.minutes} minutes`;
    }
  } else {
    timeString += `${time.minutes} minutes`;
  }
  return timeString;
}

/**
 * Parses the ingredient JSON to make it into a readable string to
 * display the ingredient
 * @param {*} ingredient
 * @returns string to display ingredient
 */
function getIngredient(ingredient) {
  const { name } = ingredient;
  const { quantity } = ingredient;
  const { units } = ingredient;
  let ingredientString = '';
  if (quantity !== 0) {
    ingredientString += `${quantity} `;
  }
  if (units !== 'N/A') {
    ingredientString += `${units} `;
  }
  ingredientString += name;
  return ingredientString;
}

/**
 * Creates a checkbox given the string
 * @param {*} checkboxString
 * @returns the checkbox container
 */
function createCheckbox(checkboxString) {
  const container = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  container.appendChild(checkbox);
  container.appendChild(document.createTextNode(checkboxString));
  return container;
}

customElements.define('recipe-display', RecipeDisplay);
