# Schema 
## Models

### Recipe Object

| Property      | Type     | Description |
| ------------- | -------- | ------------|
| recipeID | Integer |  Primary key (auto-increments)|
| userID| Integer | Id of the user that created recipe (default -1) |
|    title    |  String  |    Recipe name     |
|   description    | String   |  Recipe description   |
|    image    |  String   |  Link to recipe image  |
|    servingSize     |   Float |    Serving size of the recipe   |
|    scoville    |   Integer |    Spice level (scoville units) of hottest ingredient      |
| spiceRating | Integer | Spice level on scale of 1-5 (Calculated from scoville)
|    prepTime  |  Integer  |  Prep time in minutes (recalculate for hours)   |
|     cookTime   |   Integer  |  Cook time in minutes (recalculate for hours)  |
|     totalTime   |  Integer  |    Calculated from prepTime + cookTime   |
| directions | String | All directions in one string (will be separated by new line) |
| challenge | Enum | {"No Challenge", "Two Spicy", "Habanero Hero", "Haunted Bowels", "I Got the Sauce", "Spicy Sips"}|
  
<br>

### Ingredients Object

| Property      | Type     | Description |
| ------------- | -------- | ------------|
|  incredientID    |  Integer  | Primary key (auto-increments)    |
|   name    |  String  | Name of ingredient   |
|    quantity    |   Float | Quantity of the ingredient     |
| units |String | Units of measurement |
  
<br>

### Recipe-Ingredients Object

| Property      | Type     | Description |
| ------------- | -------- | ------------|
|   recipeIngredientsID     |  Integer  |   Primary key (auto-increments)   |
| recipeID | Integer | Recipe ID of the recipe that owns this ingredient |
|  incredientID    |  Integer  |   Ingredient ID of the ingredient that is owned by the recipe  |

<br>

### User Object

| Property      | Type     | Description |
| ------------- | -------- | ------------|
|  userID   | Integer   |   Primary key (auto-increments)   |
|   email    |  String  | User email        |
|   password     |  String  | User password     |
|   username   | String   |   User's username    |

<br>   

### Saved Recipe Object

| Property      | Type     | Description |
| ------------- | -------- | ------------|
|   savedRecipeID     | Integer   | Primary key (auto-increments)   |
|     userID   | Integer   |  ID of the user object    |
|    recipeID    |  Integer  |    ID of the recipe object   |

  
<br>


### Completed Recipe Object

| Property      | Type     | Description |
| ------------- | -------- | ------------|
|   completedRecipeID     | Integer   | Primary key (auto-increments)   |
|     userID   | Integer   |  ID of the user object    |
|    recipeID    |  Integer  |    ID of the recipe object   |
   
<br>

### Time Object (Optional until future discussion)

| Property      | Type     | Description |
| ------------- | -------- | ------------|
|   timeID   |  Integer  |   Primary key (auto-increments)      |
| recipeID | Integer | Recipe ID of the recipe that owns this ingredient |
|    name    |  Enum  |   {prepTime, cookTime, totalTime}   |
|   hours     |  Integer  |  Amount of hours   |
|     minutes   |   Integer |   Amount of minutes    |
