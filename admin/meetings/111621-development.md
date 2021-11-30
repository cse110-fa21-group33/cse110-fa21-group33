# 111621-development

Group 33: Exploding Cats

Meeting type:

When: Tuesday, 11/16/21, 6:30pm - End time

Where: Lab 140

Members Present -

Members Absent -

## Full Agenda:

- Old business:
    - Pipeline documentation review (sprint review)
    - Updates on dexe
    - Updates on any new html/css component
    - Updates on displaying recipes
    - Updates on editing recipes
- New business
    - Lint - possible to ban inline css
    - Sprint Review
    - This week's objectives
        - Get a functioning website with the CRUD features
            - Displays recipe cards (probably randomized for now)
            - When clicking on recipe, should display
            - Can delete the recipe
            - Can edit the recipe
            - Can add a recipe (from the navigation bar)
    - New components to add
        - Navigation bar
    - Limit pull request
        - Max lines
    - Assign tasks

### Meeting Minutes

IndexDB modules - for updating DB only

- Constructor
    - Load the database
    - Check if blob exists
        - Initialize recipes if it doesn't
- Save() - Update the database
    - Upon any change on the database - save it to local storage
    - Called by create, update, delete
- Create(JSON) recipe - adds to the object
- Update(JSON) the recipe
- Delete(JSON) the recipe
- Query by name
- Query by spice level

Tasks to assign

- IndexDB work **(Lorenzo)**
    - Get IndexDB to work with editing/deleting/adding
    - Get IndexDB to obtain recipes
- Editing page **(Everett, Cole, Tanyunfeng)**
- Write some tests for IndexDB functions **(Edward & George)**
- Write javascript for the recipe cards **(Kevin)**
- Work on the main page to display recipes **(Lynn)**
    - Create navigation bar component to display user menu for adding recipe
- Write up ADR for netlify **(Lorenzo)**
- Challenge JSON template
- Challenge page - click it and shows the recipes included in the challenge - wireframe **(Minghui & Yuang)**
    - Should include - Challenge title, badge, a progress bar, the specific recipes for the challenge
    - Note: We're doing specific recipes for each challenge, so it should show the recipe cards
    - This will likely end up being a small pop up that will show up in the center of the screen upon clicking the challenge in the challenge sidebar

UI/UX

- When the sidebar changes
    - Change the colors of the recipe blocks (yellow to red)
    - Default spice level at 3
    - Add smoke effects (low priority)

JSON detailes

- Spice rating range
    - 1 [0-3K)
    - 2 [3K-25K)
    - 3 [25K-100K)
    - 4 [100K-350K)
    - 5 [350K+)

### Requires Further Discussion

- Topic, person in charge, etc