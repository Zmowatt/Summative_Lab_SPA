async function wordSearch(input) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
        const data = await response.json();
        console.log(data)
        displayInfo(data[0])
     } catch (error) {
        alert("There was an error with the search")
        console.log(error.message)
        return;
     }
}

    const display = document.querySelector("#results");
    const button = document.querySelector("#button");
    const faveList = document.querySelector("#fave-list");
    

function displayInfo(input){
    display.innerHTML = "";
    
    
    const phoneticText = input.phonetics?.[0]?.text || "No phonetic available";
    const audioUrl = input.phonetics.find(p => p.audio)?.audio;
    
    display.innerHTML = `
        <h2 id="searched-word">${input.word}</h2>
        <p id="phonetics"><em>${phoneticText} </em></p>
        <p><button id="say-it">Want to hear it?</button></p>
        <button id="fave-btn">Add to Favorites</button> 
        <ul id="definitions"><strong>Definitions:</strong></ul>
    `;
   
    
    document.querySelector("#say-it").addEventListener('click', () => {
        if(audioUrl) {new Audio(audioUrl).play();
    } else {
        alert("Sorry! No pronunciation available for this word.")
        }
    });

    listMeanings(input.meanings);  

    const faveButton = document.querySelector("#fave-btn");

    faveButton.addEventListener('click', (e) => {
        e.preventDefault();

        const faveItem = document.createElement('div')
        faveItem.classList.add('favorited');
        
        faveItem.innerHTML = `
          <span>${input.word}</span>
            <button class="define-me">Define</button>
        `;

       faveList.appendChild(faveItem);

        faveItem.querySelector('.define-me').addEventListener('click', () => {
           
            wordSearch(input.word)
        })

    })
}

function listMeanings(defArray){

        const defList = document.querySelector('#definitions');

        defArray.forEach((meaningObj) => {
            const meaning = document.createElement('li');
        
            meaningObj.definitions.forEach(def => {
                meaning.innerHTML += `
                    <p><strong>${meaningObj.partOfSpeech}</strong>: ${def.definition}</p>
                    ${def.example ? `<p><em>Example: ${def.example}</em></p>` : ""}
                `;
            });

        defList.appendChild(meaning);
    })
}

const form = document.querySelector("#word-input")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const word = document.querySelector("#word").value.trim();
    if(!word){
        alert("Word not found. Try Again.")
        return;
    }
    wordSearch(word);
});


