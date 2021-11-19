# 111821-development

Group 33: Exploding Cats

Meeting type: Development

When: Thursday, 11/18/21, 6:30pm - 8:20pm

Members Present -

Where: CSE Lab 160

Members Absent - Tanyunfeng, Yuang

## Full Agenda:

- Old business:
    - Update on assigned tasks
        - IndexDB (Lorenzo)
        - Editing page (Cole, Everett, Tanyunfeng) - demo
        - Main & Display (Kevin & Lynn)
        - Test cases (Edward & George)
        - Challenge page (Minghui & Yuang)
        - Slider (Yuang)
- New business
    - Retrospective Meeting
    - Some notes on code scanning
        - Alphabetical order for styling?
    - Start to put the CRUD features together
        - Query by spice level - main page display
        - Include delete/edit button on the recipe display to transition to the editing
        - Editing modifying the database
        - Create recipe page
        - We need the CRUD video by the end of this week (Friday/Monday?)
    - Task Assigning (Goals for the week)
        - Focus on getting the CRUD features for functionality
    - Meeting next Thursday (Thanksgiving) yay or nay? Reschedule?

### Meeting Minutes

Updates

- Editing page demo
    - Mostly functional create to JSON - can save to local storage
    - Ingredients are a WIP but you can add ingredients separately
    - Not working with editing just yet - need to be able to populate the data
- Local storage
    - Dynamic searching (since current searching might take time)
    - Query by completion (for spice level)

Challenges

- JSON that keeps progress of the user
    - Challenge JSON file - keep track of user progress
        - array of challenge objects
            - title
            - numRequired
            - numCompleted
    - Write a javascript program that uses the challenge jsons to the progress bar
- For each recipe JSON
    - Add challenge section - list of challenge strings
    - So every time the recipe is completed - update the challenge progress JSON according to the challenge section in the JSON
    - If the recipe in the challenge don't allow the user to delete it

Assigning tasks

- JSON - for tracking the user progress **(Everett)**
- Editing page wireframe on Figma
- Achievement/Challenge component for the sidebar **(Edward, George, Minghui, Yuang)**
    - Populate the sidebar with the achievement challenge components
    - Includes the progress bar (description in the challenge section)
- Slider functionality for main page display **(Lynn)**
    - Query based on the spice slider
    - Include visual changes according to the slider (Different colors for the block background color)
- Reorganize brainstorming folder **(Lynn)**
- Update the meeting notes **(Lynn)**
- Fix the recipe page appearance **(Kevin)**
- Make some challenges **(Kevin)**
    - Specific recipes per challenge
- Add JSONS of the recipes to populate the main page **(Everyone)**
- Continuing edit **(Everett, Cole, Tanyunfeng)**

ADR - We're doing challenges based on the specific challenge recipes

Serving size changes & unit conversion (difficulty)

- Inputting ingredients