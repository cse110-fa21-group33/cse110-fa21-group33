# 112321-development

Group 33: Exploding Cats

Meeting type: Development, Task assignment

When: Tuesday, 11/23/21, 6:30pm - 7:15pm

Where: CSE 260

Members Present - Everyone

Members Absent -

## Full Agenda:

- Old business:
    - Catch up with the progress on Friday
    - Iron out details of the challenge
        - So we understand that we have a JSON that keeps track of the user progress
        - How will we show the challenge and their requirements?
        - Do we keep the challenge cards in the recipe page (if so assign task to add challenge cards to the recipe page)
- New business:
    - Some bugs to note:
        - On the deployed site, sometimes delete button needs to be clicked twice due to some warning error
        - Missing lb as an option
        - We need some serious refactoring from the Friday crunch
            - Functiong naming
            - Better  function descriptions
        - Test cases
        - When editing existing jsons they it doesn't always update? or delete or navigate back to the home page
        - Buttons don't work on iPhone
    - Assign tasks
    - Cleaning up the codebase
        - How should we move node modules, package.json, etc
    - Thursday no meeting (enjoy the break)

### Meeting Minutes

Dev button

- Button that refreshes the local database (so that when we demo we don't run into the same issues)

Tasks to Assign

- Fix the problem with IOS **(Kevin)**
    - Clicking the recipe card doesn't seem to work (hover works)
- Test cases **(Edward & George)**
    - Unit tests - Running database with jest is messy
    - e2e tests - something about loading the recipes is wrong
- Main Page
    - Update the recipe cards display upon creation/deletion (shouldn't have to move the slider) **(Lorenzo)**
        - Delete seems to work fine (?)
    - Fix the main page functions **(Lorenzo)**
    - Search bar **(Minghui)**
        - Remove slider, "recommended with you"
        - Change the title in the middle box text to "Search Results"
        - Repopulate the recipe cards
    - Clicking the logo should return to the home page (remove the esc button) **(Yuang)**
- UI Improvement
    - Fix the favicon **(Lynn)**
    - Make the logo with the name **(Lynn)**
    - UI improvements for mobile **(Lynn)**
        - The minutes time goes out of the box
    - UI improvements to make the navigation bar look better **(Cole)**
    - Add visual changes to when the spice slider changes **(Cole)**
        - Add chili peppers next to the slider
        - Move the slider to the nav bar
        - Gradient changes (green to yellow to dark red)
    - Figma wireframe for the edit page **(Everett)**
- Continue fine tuning the edit page **(George)**
    - Include missing units
        - Missing lbs
    - Add more safe cases to the user input
        - Require at least one direction & one ingredient
    - Add a button next to the ingredient/direction that deletes the specific ingredient
    - PLEASE REFACTOR THIS CODE FOR UNIFORMITY
        - function names are not the same format
        - will need better documentation for function description
    - Remove the editUpload folder
- Add functionality to the "I Made This" button **(Tanyunfeng)**
    - adds completion status to the recipe json and updates it
    - Changes the view of the button - change the button to a box that says completed
    - Reflect the changes when setting the data to the recipe page
- Implement secret API key for Imgur - as suggested by the professor **(Cole)**
- Tidiness notes **(Lorenzo)**
    - .gitignore
        - Add ds_store and remove a few
    - Add changelog
    - Release notes (first release is our sketchy CRUD)
    - Move the node modules
    - package json
    - README - why is the jsdoc, vscode
- Create the component for the progress bar **(Yuang)**

Next week grind

- Monday/Wednesday/Friday
- Let the team know what you're working on and what you have done by the end of the day

Standup - Saturday 11/27 

### Requires Further Discussion

- Think about challenges