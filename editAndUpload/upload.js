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

async function init() {

    AddDescription();
    RemoveDescription();

    AddIngredient();
    RemoveIngredient();

    GetImgurImage();
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
function AddDescription(){
    
    const button = document.getElementById("addStepButton");
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
function RemoveDescription(){
    
    const button = document.getElementById("removeStepButton");
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

// adds another textarea for recipe description/steps when add step button is pressed
function AddIngredient(){
    
    const button = document.getElementById("addIngredientButton");
    const div = document.getElementById("ingredients");
    const selectOptions = ["g", "mL", "lb", "oz"];

    button.addEventListener('click', () => {
        let stepNum = Number(div.getAttribute('value'));
        if( stepNum < 8 ){
            stepNum++;
            div.setAttribute('value', stepNum);
            const inputName = document.createElement('input');
            inputName.setAttribute('type', 'text');
            inputName.setAttribute('minlength', '2');
            inputName.setAttribute('maxlength', '40');
            inputName.setAttribute('minlength', '2');
            inputName.setAttribute('placeholder', 'Ingredient Description');
            const inputQuantity = document.createElement('input');
            inputQuantity.setAttribute('type', 'number');
            inputQuantity.setAttribute('min', '0');
            inputQuantity.setAttribute('placeholder', 'Quantity');
            const select = document.createElement('select');
            for( var i = 0; i < selectOptions.length; i++ ){
                var option = document.createElement('option');
                option.setAttribute('value', selectOptions[i]);
                //option.setAttribute('innerText', selectOptions[i]);
                option.innerText = selectOptions[i];
                select.appendChild(option);
            }
            const lineBreak = document.createElement('br');
            
            div.appendChild(lineBreak);
            div.appendChild(inputName);
            div.appendChild(inputQuantity);
            div.appendChild(select);
        }
    });

}

// removes last textarea for recipe description/steps when remove step button is pressed
function RemoveIngredient(){
    
    const button = document.getElementById("removeIngredientButton");
    const div = document.getElementById("ingredients");

    button.addEventListener('click', () => {
        let stepNum = Number(div.getAttribute('value'));
        if( stepNum > 1 ){
            stepNum--;
            div.setAttribute('value', stepNum);
            const lineBreak = div.getElementsByTagName('br')[ div.getElementsByTagName('br').length - 1 ];
            const inputName = div.getElementsByTagName('input')[ div.getElementsByTagName('input').length - 2 ];
            const inputQuantity = div.getElementsByTagName('input')[ div.getElementsByTagName('input').length - 1 ];
            const select = div.getElementsByTagName('select')[ div.getElementsByTagName('select').length - 1 ];

            div.removeChild(lineBreak);
            div.removeChild(inputName);
            div.removeChild(inputQuantity);
            div.removeChild(select);
        }
    });
}

// uses Imgur API to convert image file into a link
function GetImgurImage(){

    const imgUpload = document.getElementById("imgUpload")
    const imgPreview = document.getElementById("imgPreview")
    const url = document.getElementById("url")
    imgUpload.addEventListener("change", ev => {
        const formdata = new FormData()
        formdata.append("image", ev.target.files[0])
        fetch("https://api.imgur.com/3/image/", {
            method: "post",
            headers: {
                Authorization: "Client-ID 0f695d3611373b4"
            },
            body: formdata
        }).then(data => data.json()).then(data => {
            imgPreview.src = data.data.link
            url.innerText = data.data.link
        })
    })

}