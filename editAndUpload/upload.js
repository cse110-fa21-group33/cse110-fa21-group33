window.addEventListener('DOMContentLoaded', init);

// attempt to take user input and convert to .json file
function SubmitRecipe(event) {
    // TODO: Check if all boxes have been filled

    const button = document.getElementById('submitButton');

    button.addEventListener('click', () => {
        let recipeName = document.getElementById('recipeName').value;
        let description = document.getElementById('description').value;
        let url = document.getElementById('url').innerText;
        let scoville = Number(document.getElementById('scoville').value);
        let prepMins = Number(document.getElementById('prepMins').value);
        let prepHrs = Number(document.getElementById('prepHrs').value);
        let cookMins = Number(document.getElementById('cookMins').value);
        let cookHrs = Number(document.getElementById('cookHrs').value);
        let servingSize = Number(document.getElementById('servingSize').value);
        
        let jsonName = RecipeNameGenerator(recipeName);
        let totalTimeArr = CalculateTotalTime(prepHrs, prepMins, cookHrs,cookMins);

        // TODO: forloops to create variables and get elements
        //document.getElementById('ingredientDescription');
        //document.getElementById('ingredientQuantity');
        //document.getElementById('ingredientUnits'); 

        // Create ingredients array
        const div = document.getElementById('ingredients');

        // TODO: update json file to match html page
        var jsonText = {
            "title": recipeName,
            "id": "ID",
            "description": description,
            "image": url,
            "servingSize": servingSize,
            "scoville": scoville,
            "time": [
                {
                    "name": "prepTime",
                    "hours": prepHrs,
                    "minutes": prepMins
                },
                {
                    "name": "cookTime",
                    "hours": cookHrs,
                    "minutes": cookMins
                },
                {
                    "name": "totalTime",
                    "hours": totalTimeArr[0],
                    "minutes": totalTimeArr[1]
                }
            ]
        };

        // Save json file to local storage
        try {
            localStorage.setItem(jsonName, JSON.stringify(jsonText));
        }
        catch (e) {
            console.log("Storage failed: " + e);
        }
    });
}

// Takes in recipe name and generates .json name
function RecipeNameGenerator(name) {
    let recipeName = "";
    
    // replace all spaces
    for(let i = 0; i < name.length; i++) {
        let curr = name.charAt(i);
        if(curr == ' ') {
            recipeName += '-';
        }
        else {
            recipeName += curr;
        }
    }
    // append file extension
    recipeName += '.json';
    return recipeName;
}

// Calculates total cook time, accounting for overflow
function CalculateTotalTime(prepHrs, prepMins, cookHrs,cookMins) {
    let totalMins = prepMins + cookMins;
    let carryHrs = Math.round(totalMins / 60);

    totalMins = totalMins % 60;
    let totalHrs = prepHrs + cookHrs + carryHrs;

    return new Array(totalHrs, totalMins);
}

// check to see if the user input is valid and let user know what inputs to change to fix input
function RecipeInputsGood(event) {
    // TODO
}


// adds another textarea for recipe instruction/steps when add step button is pressed
function AddInstruction(){
    const button = document.getElementById('addStepButton');
    const div = document.getElementById('instruction');

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

// removes last textarea for recipe instruction/steps when remove step button is pressed
function RemoveInstruction(){
    
    const button = document.getElementById('removeStepButton');
    const div = document.getElementById('instruction');

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

// adds another textarea for recipe instruction/steps when add step button is pressed
function AddIngredient(){
    
    const button = document.getElementById('addIngredientButton');
    const div = document.getElementById('ingredients');
    const selectOptions = ['N/A', 'tsp', 'oz', 'c', 'pt', 'qt', 'gal', 'ml', 'l'];

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

// removes last textarea for recipe instruction/steps when remove step button is pressed
function RemoveIngredient(){
    
    const button = document.getElementById('removeIngredientButton');
    const div = document.getElementById('ingredients');

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

    const imgUpload = document.getElementById('imgUpload')
    const imgPreview = document.getElementById('imgPreview')
    const url = document.getElementById('url')
    imgUpload.addEventListener('change', ev => {
        const formdata = new FormData()
        formdata.append('image', ev.target.files[0])
        fetch('https://api.imgur.com/3/image/', {
            method: 'post',
            headers: {
                Authorization: 'Client-ID 0f695d3611373b4'
            },
            body: formdata
        }).then(data => data.json()).then(data => {
            imgPreview.src = data.data.link
            url.innerText = data.data.link
        })
    })

}

async function init() {
    AddInstruction();
    RemoveInstruction();

    AddIngredient();
    RemoveIngredient();

    GetImgurImage();
    //const form = document.querySelector('form');
    //form.addEventListener('submit', handleSubmit);

    SubmitRecipe();
}