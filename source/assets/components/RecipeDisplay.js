/**
 * recipe-display.js
 *
 * @author Lynn Dang
 */
class RecipeDisplay extends HTMLElement {
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
        max-width: 700px;
        margin: auto;
      }
      
      /* generic button */
      .button-wrapper > button{
        padding: 5px;
        font-size: 18px;
      }
      
      #recipe-title{
        font-size: 50px;
      }
      
      .recipe-about {
        display: grid;
        justify-content: up;
        grid-template-columns: 1fr 0.5fr;
        padding-bottom: 30px;
      }
      
      .recipe-about .recipe-description {
        grid-row: 1 / 3
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
      }
      
      #recipe-information > span {
        display: grid;
        grid-template-columns: 2fr 2fr 2fr;
      }
      
      .recipe-info-number {
        grid-column-start: 4;
      }
      
      .recipe-subtitle {
        font-size: 35px;
        margin-bottom: 20px;
      }
      
      .recipe-list {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
      }
    `;

    article.innerHTML = `
      <div class="main-container">
        <main>
          <article class="recipe-section">
            <div class="recipe-header">
              <h1></h1>
              <div class="recipe-about">
                <p class="recipe-description"></p>
                  <div class="recipe-spice-info">
                    <img src="">
                    <p id="recipe-spice-level"></p>    
                  </div>
                  <div class="button-wrapper">
                    <button class="recipe-button">Print</button>
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
              <div class="recipe-list">
              </div>
            </div>
            <hr>
            <div id="recipe-directions">
              <h3 class="recipe-subtitle">Directions</h3>
              <div class="recipe-list">
              </div>
            </div>
            <hr>
            <div class="button-wrapper">
              <button class="recipe-button">I Made This!</button>
            </div>
          </article>
        </main>
      </div>
      `;

    this.shadowRoot.append(styles, article);
  }

  /**
   * Sets the recipe that will be used insidet the <recipe-display> element.
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
                <h1></h1>
                <div class="recipe-about">
                  <p class="recipe-description"></p>
                    <div class="recipe-spice-info">
                      <img src="">
                      <p id="recipe-spice-level"></p>    
                    </div>
                    <div class="button-wrapper">
                      <button class="recipe-button">Print</button>
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
                <div class="recipe-list">
                </div>
              </div>
              <hr>
              <div id="recipe-directions">
                <h3 class="recipe-subtitle">Directions</h3>
                <div class="recipe-list">
                </div>
              </div>
              <hr>
              <div class="button-wrapper">
                <button class="recipe-button">I Made This!</button>
              </div>
            </article>
          </main>
        </div>
    `;

    const { title } = data;
    this.shadowRoot.querySelector('h1').innerHTML = title;

    const { description } = data;
    this.shadowRoot.querySelector('.recipe-description').innerHTML = description;

    const imgSrc = data.image;
    const img = this.shadowRoot.querySelector('#recipe-media > img');
    img.setAttribute('src', imgSrc);
    img.setAttribute('alt', title);

    const scovilleUnit = data.scoville;
    this.shadowRoot.querySelector('#recipe-spice-level').innerHTML = scovilleUnit;

    const prepTime = calculateTime(data.time[0]);
    this.shadowRoot.querySelector('#recipe-prep-time > .recipe-info-number').innerHTML = prepTime;

    const cookTime = calculateTime(data.time[1]);
    this.shadowRoot.querySelector('#recipe-cook-time > .recipe-info-number').innerHTML = cookTime;

    const { servingSize } = data;
    this.shadowRoot.querySelector('#recipe-serving-size > .recipe-info-number').innerHTML = servingSize;

    const ingredientsList = data.ingredientList;
    console.log(ingredientsList);
    ingredientsList.forEach((ingredient) => {
      const ingredientString = getIngredient(ingredient);
      const ingredientContainer = createCheckbox(ingredientString);
      this.shadowRoot.querySelector('#recipe-ingredients > .recipe-list').appendChild(ingredientContainer);
    });

    const { directions } = data;
    directions.forEach((direction) => {
      const directionContainer = createCheckbox(direction);
      this.shadowRoot.querySelector('#recipe-directions > .recipe-list').appendChild(directionContainer);
    });
  }
}

/**
 * Calculates the time string to display
 * @param {*} time
 * @returns string to display time
 */
function calculateTime(time) {
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
  const container = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');

  container.appendChild(checkbox);
  container.appendChild(document.createTextNode(checkboxString));

  return container;
}

customElements.define('recipe-display', RecipeDisplay);
