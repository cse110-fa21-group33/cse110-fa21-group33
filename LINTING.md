# Linting in VSCode (On Save)

## Step 1: Installation & Set Up
1. Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint#:~:text=If%20you%20haven't%20installed,eslintrc%20configuration%20file) in the VSCode Extensions Manager
2. (**Note: If .eslintrc.js already exists in your base project directory, please skip to Step 2: Set Up VSCode Settings for Fix on Save**) 
3. Open the terminal (View > Terminal) and install ESLint
    * In base project directory run: ``npm install eslint`` (Node.js must be installed)
4. Setup up eslint for Javascript linting using the Airbnb guidelines
    * In project directory run: ``npx eslint --init``
    * Using the Arrow Keys and Enter, please select the following prompts:
        * ``> To check syntax, find problems, and enforce code style``
        * ``> JavaScript modules (import/export)``
        * ``> None of these``
        * ``> No``
        * ``> Browser``
        * ``> Use a popular style guide``
        * ``> Airbnb``
        * ``> JavaScript``
        * ``> Yes``
    * You should now see a .eslintrc.js file in your working directory

## Step 2: Set Up VSCode Settings for Fix on Save
1. Open your VSCode Settings.json (Command Pallette > "Open Settings(JSON)")
2. Add the following settings to your JSON file:
    ```
    "eslint.alwaysShowStatus": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": ["javascript"]
    ```
3. Save and reopen VSCode

## Step 3: Testing if Linting is Working
1. Create a tester file ex. lint-test.js
2. Paste:
    ```
    const helloYou    = (name)=> {
    name = 'you' || name   ;
    console.log("hello" + name + "!" )
    }

    console.log(helloYou)
    ```
3. In the Problems tab (View > Problems), you should see 20 errors thrown by ESLint.
4. Save lint-test.js
5. Syntax should be fixed and resulting errors can be manually reviewed
6. Delete lint-test.js
