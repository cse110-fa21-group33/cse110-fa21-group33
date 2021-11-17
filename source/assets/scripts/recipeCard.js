// recipeCard.js

/**
 * Creates recipe card and appends it to the main page.
 * @param {json} data The json containing the data to create the card.
 */
function makeCard(data) {
  const main = document.getElementsByClassName('card-body')[0];
  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('card-wrapper');
  const elem = document.createElement('div');
  cardWrapper.appendChild(elem);
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
  main.appendChild(elem);
}

export { makeCard };
