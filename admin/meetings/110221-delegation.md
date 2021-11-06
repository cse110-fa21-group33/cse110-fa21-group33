# 110221-delegation

Group 33: Exploding Cats

Meeting type: Delegation & development kickoff

When: Tuesday, 11/02/21, 6:30pm - 8:00pm

Where: CSE 260

Members Present - Everyone

Members Absent -

## Full Agenda:

- Old business:
    - Project pitch updates
        - Suggestion: join management meetings
- New business
    - Setting up the GitHub
        - Require pull request
    - Set up teams
    - Decide on recipe layout
    - Delegate tasks for the week
    - Start doing standups
        - Wednesday standups - asynchronous 11:59pm
        - Saturday standups - asynchronous

### Meeting Minutes

Teams

- Dev
    - Cole (Lead)
    - Yuang
    - Everett
    - Minghui
- UI/UX
    - Lynn (Lead)
    - Kevin
    - Lorenzo
- Testing
    - George (Lead)
    - Tanyunfeng
    - Edward

Tasks

- Have the page layouts done (HTML/CSS)
    - Main page (High priority) **(Minghui & Yuang)**
    - Recipe cards (High priority) **(Kevin)**
    - Recipe page (High priority) **(Lynn)**
        - The pop up cards
    - Recipe create/edit page (High priority) **(Everett & Tanyunfeng)**
        - Delete function
- Backend
    - Define recipe → json format and storage
        - Define the json template **(Cole)**
            - Example recipe
    - Basic CRUD functions
    - Figure out how to do the storage **(Lorenzo)**
    - Research Github Action (**Edward)**
    - Gather the initial recipes **(Everyone - 5)**
    - Research cookies **(Everett)**
- Set up the bare minimum for the github workflow
    - Require pull requests and reviews (**George - Wednesday**)
    - Branches for each person **(Everyone)**
        - Branch for subteams **(Team Lead)**
            - Team lead syncs with main branch
            - Everyone else sync with subteam branch
- Recipe
    - Title
    - Description
    - Image
    - Video Link (optional)
    - Prep time
    - Cook time
    - Serving size
    - Ingredients list (array of ingredient objects)
        - Number
        - Metric
        - Ingredient
        - Scoville unit
    - Directions (array - elements for each step)
    - Nutrition
    - Category tags
        - Course type
        - Cuisine
    - Paired item (optional)
        - Title
        - Image
        - Description
    
    Functions for recipe
    
    - Use the Scoville unit to decide the rating (do the highest unit)
    - Use Scoville unit for exp points
    - Reference table - show Scoville units for common spicy ingredients (editing page)
        
        ![chart](/admin/meetings/media/110221-chart.png)
        
    
    Achievements
    
    - Challenges will just be based on spice rating
    
    Documentation
    
    - Function description above the function name
        - Input and output
    - camel case variables &
    - pascal case functions
    
    Research & Mini Projects
    
    - Cole: [search bar](https://github.com/Cole-Rindal/SearchBar)

### Requires Further Discussion

- Topic, person in charge, etc