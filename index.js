// document.addEventListener("DOMContentLoaded", (e) => {
//     e.preventDefault();
// })


async function wordSearch(input) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        console.log(data)
        displayInfo(data)
     } catch (error) {
        alert("There was an error with the search")
        console.log(error.message)
     }
}

    const display = document.querySelector("#results");
    const button = document.querySelector("#button");
    const favorites = document.querySelector("#favorites");
    

function displayInfo(input){
    display.innerHTML = "";
    
    const results = document.createElement("div");

    display.innerHTML = `
        <p id="searched-word"><strong>${input.word}</strong><button id="fave-btn">Add to Favorites<button></p>
        <p id="phonetics"><em>${input.phonetics[0].text}</em> 
        <p>Want to here it?</p> 
        </p>
        <ul id="definitions"><strong>Definitions:</strong></ul>
    `
    results.appendChild('results')

    listMeanings(input.meanings);  
}

function listMeanings(defArray){
    defArray.forEach(() => {
        const meaning = document.createElement('li')
        const partOfSpeech = document.createElement('p');
        const definition = document.createElement('p');
        const example = document.createElement('p');
        const synonyms = document.createElement('p');
        const antoyms = document.createElement('p');

        partOfSpeech = defArray.partOfSpeech;
        definition = defArray.definitions[0].definition;
        example = defArray.definitions[0].example;
        synonyms = defArray.definitions[0].synonyms;
        antoyms = defArray.definitions[0].antonyms;

        meaning.innerHTML = `
        ${partOfSpeech}
        ${definition}
        ${example}
        ${synonyms}
        ${antoyms}
        `

        const defList = querySelector('#definitions');

        defList.appendChild('meaning');
    })
}

button.addEventListener("submit", wordSearch(word.value))