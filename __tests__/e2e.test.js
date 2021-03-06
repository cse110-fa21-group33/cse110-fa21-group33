describe('Basic user flow for Website', () => {
  jest.setTimeout(30000);
  // First, visit the website
  beforeAll(async () => {
    await page.goto('https://exploding-kitchen.netlify.app/');
  });

  it('Initial Home Page - Check for recipe cards', async () => {
    console.log('Checking for recipe cards');
    await new Promise((r) => setTimeout(r, 4500));
    const numCards = await page.$$eval('recipe-card', (recipeCards) => recipeCards.length);
    console.log(numCards);
    expect(numCards).toBeGreaterThanOrEqual(1);
  });
  it('Test slider exists', async () => {
    console.log('Checking if the spice slider exists');
    const spiceSlider = await page.$$eval('#myRange', (slider) => slider.length);
    expect(spiceSlider).toBe(1);
  });

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
  it('Test if the recipe display level 3', async () => {
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

  it('Test clicking challenge bar', async () => {
    console.log('Checking challenge title');
    const logo = await page.$('#websiteLogo');
    logo.click();
    await new Promise((r) => setTimeout(r, 2000));
    const bar = await page.$('challenge-bar');
    await page.$eval('challenge-bar', (bar) => {
      const event = new Event('click');
      bar.dispatchEvent(event);
    });
    await new Promise((r) => setTimeout(r, 3000));
    const headerTitle = await page.$('h1#middle-title');
    const value = await headerTitle.evaluate((el) => el.textContent);
    expect(value).toBe('Two Spicy');
  });
  it('Testing the create feature', async () => {
    console.log('Creating the first recipe on the page');
    const logo = await page.$('#websiteLogo');
    logo.click();
    await new Promise((r) => setTimeout(r, 2000));
    await page.$eval('#create-button', (createButton) => {
      const event = new Event('click');
      createButton.dispatchEvent(event);
    });
    await new Promise((r) => setTimeout(r, 2000));
    const upload = await page.$('recipe-upload');
    const root = await upload.getProperty('shadowRoot');

    await root.$eval('#recipeName', (recipeName) => {
      recipeName.value = 'Hello';
    });
    await new Promise((r) => setTimeout(r, 2000));

    const recipeSpice = page.evaluateHandle(() => document.querySelector('recipe-upload').shadowRoot.querySelector('input#scoville'));
    const inputElement = await (await recipeSpice).asElement();
    await inputElement.type('9000');
    await new Promise((r) => setTimeout(r, 2000));
    const submitButton = await root.$('#submitButton');
    submitButton.click();
    await new Promise((r) => setTimeout(r, 5000));

    await page.type('#searchBar', 'He');
    await new Promise((r) => setTimeout(r, 600));
    await page.type('#searchBar', 'll');
    await new Promise((r) => setTimeout(r, 600));
    await page.type('#searchBar', 'o');
    await new Promise((r) => setTimeout(r, 600));

    const numCards = await page.$$eval('recipe-card', (recipeCards) => recipeCards.length);
    console.log(numCards);
    expect(numCards).toBe(1);
  });

  it('Testing the searchbar feature', async () => {
    console.log('Searching for hello recipe');
    const logo = await page.$('#websiteLogo');
    logo.click();
    await page.type('#searchBar', 'He');
    await new Promise((r) => setTimeout(r, 600));
    await page.type('#searchBar', 'll');
    await new Promise((r) => setTimeout(r, 600));
    await page.type('#searchBar', 'o');
    await new Promise((r) => setTimeout(r, 600));
    const recipeCard = await page.$('recipe-card');
    const root = await recipeCard.getProperty('shadowRoot');
    const title = await root.$('.card-title');

    const value = await title.evaluate((el) => el.textContent);
    expect(value).toBe('Hello');
  });
  it('Testing the edit feature', async () => {
    console.log('Editing the hello recipe');
    await page.$eval('recipe-card', (recipeCard) => {
      const event = new Event('click');
      recipeCard.dispatchEvent(event);
    });
    await new Promise((r) => setTimeout(r, 3000));
    const recipe = await page.$('recipe-display');
    const root = await recipe.getProperty('shadowRoot');

    await root.$eval('#editButton', (editButton) => {
      const event = new Event('click');
      editButton.dispatchEvent(event);
    });
    await new Promise((r) => setTimeout(r, 1000));
    const upload = await page.$('recipe-upload');
    const upRoot = await upload.getProperty('shadowRoot');
    const recipeTime = page.evaluateHandle(() => document.querySelector('recipe-upload').shadowRoot.querySelector('input#cookMins'));
    const inputElement = await (await recipeTime).asElement();
    await inputElement.type('50');
    const submitButton = await upRoot.$('#submitButton');
    submitButton.click();
    await new Promise((r) => setTimeout(r, 3000));
    await page.type('#searchBar', 'He');
    await new Promise((r) => setTimeout(r, 600));
    await page.type('#searchBar', 'll');
    await new Promise((r) => setTimeout(r, 600));
    await page.type('#searchBar', 'o');
    await new Promise((r) => setTimeout(r, 600));
    const card = await page.$('recipe-card');
    const cardRoot = await card.getProperty('shadowRoot');
    const time = await cardRoot.$('time');
    const value = await time.evaluate((el) => el.textContent);
    expect(value).toContain('0 hr 50 min');
  });
  it('Testing the delete feature', async () => {
    console.log('Deleteing the hello recipe');
    await page.$eval('recipe-card', (recipeCard) => {
      const event = new Event('click');
      recipeCard.dispatchEvent(event);
    });
    await new Promise((r) => setTimeout(r, 3000));
    const recipe = await page.$('recipe-display');
    const root = await recipe.getProperty('shadowRoot');

    await root.$eval('#editButton', (editButton) => {
      const event = new Event('click');
      editButton.dispatchEvent(event);
    });
    await new Promise((r) => setTimeout(r, 1000));
    const upload = await page.$('recipe-upload');
    const upRoot = await upload.getProperty('shadowRoot');
    const deleteButton = await upRoot.$('#deleteButton');
    deleteButton.click();

    await new Promise((r) => setTimeout(r, 1000));
    await page.type('#searchBar', 'He');
    await new Promise((r) => setTimeout(r, 600));
    await page.type('#searchBar', 'll');
    await new Promise((r) => setTimeout(r, 600));
    await page.type('#searchBar', 'o');
    await new Promise((r) => setTimeout(r, 600));

    const numCards = await page.$$eval('recipe-card', (recipeCards) => recipeCards.length);
    console.log(numCards);
    expect(numCards).toBe(0);
  });
  /*
  it('Test clicking challenge progress gets tracked', async () => {
    console.log('Picking a challenge');
    const logo = await page.$('#websiteLogo');
    logo.click();
    await new Promise((r) => setTimeout(r, 2000));
    const bar = await page.$('challenge-bar');
    await page.$eval('challenge-bar', (bar) => {
      const event = new Event('click');
      bar.dispatchEvent(event);
    });
    await new Promise((r) => setTimeout(r, 3000));
    const card = await page.$('recipe-card');
    card.click();
    await new Promise((r) => setTimeout(r, 3000));
    const recipe = await page.$('recipe-display');
    const root = await recipe.getProperty('shadowRoot');
    await root.$eval('#made-this-button', (madeThisButton) => {
      const event = new Event('click');
      madeThisButton.dispatchEvent(event);
    });
    await new Promise((r) => setTimeout(r, 4000));
    const home_logo = await page.$('#websiteLogo');
    home_logo.click();
    await new Promise((r) => setTimeout(r, 7000));
    const bar1 = await page.$('challenge-bar');
    const bar_root = await bar1.getProperty('shadowRoot');
    const my_progress = await bar_root.$('.my-bar');
    const my_progress_value = await my_progress.evaluate((el) => el.style);
    expect(my_progress_value).toBe('10%');
  }); */
});
