describe('Basic user flow for Website', () => {
  beforeAll(async () => {
    await page.goto('https://vigorous-clarke-a013c1.netlify.app/');
  });

  it('Check to see click works', async () => {
    const title = await page.$('h1');
    await title.click();
    const text = await title.getProperty('innerText');
    expect(text._remoteObject.value).toBe('This should be the new text');
  }, 10000);
});
