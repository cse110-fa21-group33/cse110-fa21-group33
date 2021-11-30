describe('Basic user flow for Website', () => {
  jest.setTimeout(18000);
  // First, visit the website
  beforeAll(async () => {
    await page.goto('https://vigorous-clarke-a013c1.netlify.app');
  });

  it('Initial Home Page - Check for recipe cards', async () => {
    console.log('Checking for recipe cards');
    // setTimeout(() => { console.log('awaiting page to load'); }, 1000);
    const numCards = await page.$$eval('recipe-card', (recipeCards) => recipeCards.length);
    expect(numCards).toBe(1);
  });
  it('Test slider exists', async () => {
    console.log('Checking if the spice slider exists');
    const spiceSlider = await page.$$eval('#myRange', (slider) => slider.length);
    expect(spiceSlider).toBe(1);
  });
  it('Test spice filter', async () => {
    console.log('Checking if spice slider works correctly');
    await page.$eval('.slider', (slider) => {
      slider.value = 1;
      const event = new Event('change');
      slider.dispatchEvent(event);
    });
    const card = await page.$$('recipe-card');
    const root = await card[0].getProperty('shadowRoot');
    const spiceRating = await root.$('.card-rating');
    const text = await spiceRating.getProperty('innerText');
    expect(text._remoteObject.value).toBe('Spice Rating: 🌶️');
  });
  it('Test recipe display', async () => {
    console.log('Checking if clicking recipe card brings up recipe');
    const card = await page.$('recipe-card');
    card.click();
    const recipe = await page.$('recipe-display');
    const root = await recipe.getProperty('shadowRoot');
    const spice = await root.$('p#recipe-spice-level');
    const text = await spice.getProperty('innerText');
    expect(text._remoteObject.value).toBe('2000');
  });
});
