window.addEventListener('DOMContentLoaded', init);

document.getElementById("recipeName");
document.getElementById("imageURL");
document.getElementById("scoville");
document.getElementById("PrepMins");
document.getElementById("PrepHrs");
document.getElementById("cookMins");
document.getElementById("cookHrs");
document.getElementById("servingSize");
document.getElementById("ingredientDescription");
document.getElementById("ingredientQuantity");
document.getElementById("ingredientUnits");

document.getElementById("ingredientAddMoreButton");
document.getElementById("descriptionAddMoreButton");

async function init() {

    AddDescriptions();
    RemoveDescriptions();

    //const form = document.querySelector('form');
    //form.addEventListener('submit', handleSubmit);
}

// attempt to take user input and convert to .json file
function SubmitRecipe(event) {
    
    if (!RecipeInputsGood(event)) {
        return;
    }

    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    console.log({ value });
}





// check to see if the user input is valid and let user know what inputs to change to fix input
function RecipeInputsGood(event) {

}


// adds another textarea for recipe description/steps when add step button is pressed
function AddDescriptions(){
    
    const button = document.getElementById("AddStepButton");
    const div = document.getElementById("description");

    button.addEventListener('click', () => {
        let stepNum = Number(div.getAttribute('value'));
        if( stepNum < 8 ){
            stepNum++;
            div.setAttribute('value', stepNum);
            const textArea = document.createElement('textarea');
            textArea.setAttribute('cols', '60');
            textArea.setAttribute('rows', '2');
            textArea.setAttribute('placeholder', 'Step ' + stepNum);
            div.appendChild(textArea);
        }
    });

}

// removes last textarea for recipe description/steps when remove step button is pressed
function RemoveDescriptions(){
    
    const button = document.getElementById("RemoveStepButton");
    const div = document.getElementById("description");

    button.addEventListener('click', () => {
        let stepNum = Number(div.getAttribute('value'));
        if( stepNum > 1 ){
            stepNum--;
            div.setAttribute('value', stepNum);
            const textArea = div.getElementsByTagName('textarea')[ div.getElementsByTagName('textarea').length - 1 ];
            div.removeChild(textArea);
        }
    });
}