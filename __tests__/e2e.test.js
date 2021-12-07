describe('Basic user flow for Website', () => {
  jest.setTimeout(30000);
  // First, visit the website
  beforeAll(async () => {
    await page.goto('https://exploding-kitchen.netlify.app/');
  });

  it('Initial Home Page - Check for recipe cards', async () => {
    console.log('Checking for recipe cards');
    await new Promise((r) => setTimeout(r, 3000));
    const numCards = await page.$$eval('recipe-card', (recipeCards) => recipeCards.length);
    expect(numCards).toBeGreaterThanOrEqual(1);
  });
  it('Test slider exists', async () => {
    console.log('Checking if the spice slider exists');
    const spiceSlider = await page.$$eval('#myRange', (slider) => slider.length);
    expect(spiceSlider).toBe(1);
  });
  /*
  it('Test spice filter for level 1', async () => {
    console.log('Checking if spice slider works correctly');
    await page.$eval('.slider', (slider) => {
      slider.value = 1;
      const event = new Event('change');
      slider.dispatchEvent(event);
    });
    await new Promise((r) => setTimeout(r, 3000));
    const card = await page.$$('recipe-card');
    const root = await card[0].getProperty('shadowRoot');
    const spiceRating = await root.$('.card-rating');
    const text = await spiceRating.getProperty('innerText');
    expect(text._remoteObject.value).toBe('Spice Rating: 🌶️');
  });
  it('Test if the recipe display level 1', async () => {
    console.log('Checking if clicking recipe card brings up recipe');
    const card = await page.$('recipe-card');
    card.click();
    await new Promise((r) => setTimeout(r, 3000));
    const recipe = await page.$('recipe-display');
    const root = await recipe.getProperty('shadowRoot');
    const spice = await root.$('p#recipe-spice-level');
    const text = await spice.getProperty('innerText');
    expect(text._remoteObject.value).toBe('🌶️');
  });
  it('Test spice filter for level 2', async () => {
    console.log('Checking if spice slider works correctly');
    const home_logo = await page.$('#websiteLogo');
    home_logo.click();
    await page.$eval('.slider', (slider) => {
      slider.value = 2;
      const event = new Event('change');
      slider.dispatchEvent(event);
  });
    await new Promise((r) => setTimeout(r, 3000));
    const card = await page.$$('recipe-card');
    const root = await card[0].getProperty('shadowRoot');
    const spiceRating = await root.$('.card-rating');
    const text = await spiceRating.getProperty('innerText');
    expect(text._remoteObject.value).toBe('Spice Rating: 🌶️🌶️');
  });
  it('Test if the recipe display level 2', async () => {
    console.log('Checking if clicking recipe card brings up recipe');
    const card = await page.$('recipe-card');
    card.click();
    await new Promise((r) => setTimeout(r, 3000));
    const recipe = await page.$('recipe-display');
    const root = await recipe.getProperty('shadowRoot');
    const spice = await root.$('p#recipe-spice-level');
    const text = await spice.getProperty('innerText');
    expect(text._remoteObject.value).toBe('🌶️🌶️');
  });
  
  it('Test spice filter for level 3', async () => {
    console.log('Checking if spice slider works correctly');
    const home_logo = await page.$('#websiteLogo');
    home_logo.click();
    await new Promise((r) => setTimeout(r, 1000));
    await page.$eval('.slider', (slider) => {
      slider.value = 3;
      const event = new Event('change');
      slider.dispatchEvent(event);
  });
    await new Promise((r) => setTimeout(r, 3000));
    const card = await page.$$('recipe-card');
    const root = await card[0].getProperty('shadowRoot');
    const spiceRating = await root.$('.card-rating');
    const text = await spiceRating.getProperty('innerText');
    expect(text._remoteObject.value).toBe('Spice Rating: 🌶️🌶️🌶️');
  });
  it('Test if the recipe display level 2', async () => {
    console.log('Checking if clicking recipe card brings up recipe');
    const card = await page.$('recipe-card');
    card.click();
    await new Promise((r) => setTimeout(r, 3000));
    const recipe = await page.$('recipe-display');
    const root = await recipe.getProperty('shadowRoot');
    const spice = await root.$('p#recipe-spice-level');
    const text = await spice.getProperty('innerText');
    expect(text._remoteObject.value).toBe('🌶️🌶️🌶️');
  });

  it('Test spice filter for level 4', async () => {
    console.log('Checking if spice slider works correctly');
    const home_logo = await page.$('#websiteLogo');
    home_logo.click();
    await new Promise((r) => setTimeout(r, 1000));
    await page.$eval('.slider', (slider) => {
      slider.value = 4;
      const event = new Event('change');
      slider.dispatchEvent(event);
  });
    await new Promise((r) => setTimeout(r, 3000));
    const card = await page.$$('recipe-card');
    const root = await card[0].getProperty('shadowRoot');
    const spiceRating = await root.$('.card-rating');
    const text = await spiceRating.getProperty('innerText');
    expect(text._remoteObject.value).toBe('Spice Rating: 🌶️🌶️🌶️🌶️');
  });
  it('Test if the recipe display level 4', async () => {
    console.log('Checking if clicking recipe card brings up recipe');
    const card = await page.$('recipe-card');
    card.click();
    await new Promise((r) => setTimeout(r, 3000));
    const recipe = await page.$('recipe-display');
    const root = await recipe.getProperty('shadowRoot');
    const spice = await root.$('p#recipe-spice-level');
    const text = await spice.getProperty('innerText');
    expect(text._remoteObject.value).toBe('🌶️🌶️🌶️🌶️');
  });

  it('Test spice filter for level 5', async () => {
    console.log('Checking if spice slider works correctly');
    const home_logo = await page.$('#websiteLogo');
    home_logo.click();
    await new Promise((r) => setTimeout(r, 1000));
    await page.$eval('.slider', (slider) => {
      slider.value = 5;
      const event = new Event('change');
      slider.dispatchEvent(event);
  });
    await new Promise((r) => setTimeout(r, 3000));
    const card = await page.$$('recipe-card');
    const root = await card[0].getProperty('shadowRoot');
    const spiceRating = await root.$('.card-rating');
    const text = await spiceRating.getProperty('innerText');
    expect(text._remoteObject.value).toBe('Spice Rating: 🌶️🌶️🌶️🌶️🌶️');
  });
  it('Test if the recipe display level 5', async () => {
    console.log('Checking if clicking recipe card brings up recipe');
    const card = await page.$('recipe-card');
    card.click();
    await new Promise((r) => setTimeout(r, 3000));
    const recipe = await page.$('recipe-display');
    const root = await recipe.getProperty('shadowRoot');
    const spice = await root.$('p#recipe-spice-level');
    const text = await spice.getProperty('innerText');
    expect(text._remoteObject.value).toBe('🌶️🌶️🌶️🌶️🌶️');
  });
  */
 /*
  it('Testing if clicking challenges brings up new recipes', async () => {
    console.log('Testing if clicking challenges brings up new recipes');
    const card = await page.$('challenge-bar');
    card.click();
    await new Promise((r) => setTimeout(r, 3000));
    const challenge = await page.$('#middle-title');
    //const challenge_name = challenge.getProperty('innerText');
    console.log(challenge._remoteObject.value);
    expect(challenge.innerHTML).toBe('Two Spicy');
  });
*/
  it('Testing the delete feature', async () => {
    console.log('Deleting the first recipe on the page');
    const create_button =  await page.$('#create-button');
    create_button.click();
    await new Promise((r) => setTimeout(r, 6000));
    const upload = await page.$('recipe-upload');
    const root = await upload.getProperty('shadowRoot');
    const recipe_name = await root.$('#recipeName');
    recipe_name.value = 'Hello';
    const recipe_heat = await root.$('#scoville');
    recipe_heat.value = 90000;
    const submit_button = await root.$('#submitButton');
    submit_button.click();
    await new Promise((r) => setTimeout(r, 6000));
    const home_logo = await page.$('#websiteLogo');
    home_logo.click();
    await new Promise((r) => setTimeout(r, 6000));
    //const search_bar = page.$('#searchBar');
    //search_bar.value = 'Hello';
    /*

    await page.$eval('.slider', (slider) => {
      slider.value = 1;
      const event = new Event('change');
      slider.dispatchEvent(event);
  });
    await new Promise((r) => setTimeout(r, 4000));
    */
    await page.$eval('#searchBar', (searchBar) => {
      searchBar.value = 'Hello';
      const event = new Event('input');
      searchBar.dispatchEvent(event);
  });
    await new Promise((r) => setTimeout(r, 6000));
    const numCards = await page.$$eval('recipe-card', (recipeCards) => recipeCards.length);
    expect(numCards).toBe(7);
  });

});
