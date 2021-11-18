// recipeCard.js

/**
 * Creates recipe card and appends it to the main page.
 * @param {json} data The json containing the data to create the card.
 */
class RecipeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set data(data) {
    if (!data) return;

    const card = document.createElement('article');
    const style = document.createElement('style');

    style.innerHTML = `
    .recipe-card {
      overflow: hidden;
      border-radius: 25px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 0 1rem;
      margin: 0;
      background-color: #ffffff;
    }
    
    .recipe-card:hover {
      box-shadow: 0 0 20px black;
    }
    
    .card-img {
      height: 11rem;
      width: 100%;
      object-fit: cover;
    }
    
    .card-title {
      padding: 0.5rem 1rem 0.25rem;
      overflow: hidden;
      font-size: 26px;
      height: 49px;
      line-height: 26px;
    }
    
    .card-rating {
      padding: 0 1rem 0.5rem;
      font-size: 14px;
      align-items: center;
      display: flex;
    }
    
    span,
    time {
      display: flex;
      justify-content: space-between;
      color: #70757a;
      font-size: 12px;
      padding: 0 0.6rem 0 1rem;
    }
    `;

    const elem = document.createElement('div');
    elem.classList.add('recipe-card');

    const image = document.createElement('img');
    image.classList.add('card-img');
    image.setAttribute('src', data.image);
    elem.appendChild(image);
    const title = document.createElement('div');
    title.classList.add('card-title');
    title.innerText = data.title;
    elem.appendChild(title);

    const rating = document.createElement('div');
    rating.classList.add('card-rating');
    rating.innerText = 'Spice Rating: ';
    for (let i = 0; i < data.spiceRating; i += 1) {
      rating.innerText += '🌶️';
    }
    elem.appendChild(rating);

    const time = document.createElement('time');
    time.innerHTML = `${data.time[2].hours} hr ${data.time[2].minutes} min`;

    const servings = document.createElement('span');
    servings.innerText = `Serving(s): ${data.servingSize}`;
    time.appendChild(servings);
    elem.appendChild(time);
    card.appendChild(elem);

    this.shadowRoot.append(style, elem);
  }
}

customElements.define('recipe-card', RecipeCard);
