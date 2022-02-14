const startUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'; 
const startRequest = new XMLHttpRequest();
const nav = document.getElementById('nav');
const prevBtnElement = document.getElementById('prev');
const nextBtnElement = document.getElementById('next');
const resultElement = document.getElementById('result');
let state;

pokemonListRequest(startUrl);

function pokemonListRequest(url){
    startRequest.open('GET', url);
    startRequest.responseType = 'json';
    startRequest.send();
    startRequest.onload = function() {
        state = startRequest.response;
        drawList();
        setButtonsState();
    }
}

function drawList() {
    let pokemonsElement = document.createElement('ul');
    pokemonsElement.classList.add('pokemon-list');
    state.results.forEach(pokemon => {
        pokemonsElement.innerHTML += `
            <li onclick="pokemonRequest('${pokemon.url}')">${pokemon.name}</li>
        `
    });
    resultElement.innerHTML = null;
    resultElement.appendChild(pokemonsElement);
    showButtons();
}

function pokemonRequest(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        if(xhr.status > 300) {
            resultElement.innerHTML = `
                <button class="btn" onclick="drawList()">Go Back</button>
                <div class="pokemon">There is no such pokemon!</div>
            `
        }
        else {
            drawPokemon(xhr.response);
        }
    } 
    xhr.onerror = function(err) {
        console.log(err);
        resultElement.innerHTML = `
            <button class="btn" onclick="drawList()">Go Back</button>
            <div class="pokemon">There was some error durring search! Try again!</div>
        `
    }
}

function drawPokemon(pokemon) {
hideButtons();
    resultElement.innerHTML = '';
    let pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');
    pokemonElement.innerHTML = `
        <button class="btn" onclick="drawList()">Go Back</button>
        <p>id: #${pokemon.id}</p>
        <hr>
        <h1>${pokemon.name}</h1>
        <img src="${pokemon.sprites.front_default}">
    `

    let typeList = document.createElement('ul');
    populateListWithTypes(pokemon.types, typeList)
    pokemonElement.appendChild(typeList);

    let itemsElement = document.createElement('div');
    populateDivWithItems(pokemon.held_items, itemsElement);
    itemsElement.classList.add('items');
    pokemonElement.appendChild(itemsElement);

    resultElement.appendChild(pokemonElement);
}

function populateListWithTypes(types, ul) {
    types.forEach(function(type){
        let typeItem = document.createElement('li');
        typeItem.innerText = type.type.name;
        ul.appendChild(typeItem);
    });
}

function populateDivWithItems(items, div){
    items.forEach(function(item){
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('GET',item.item.url);
        xhr.send();
        xhr.onload = function(){
            let itemElement = document.createElement('div');
            let res = xhr.response;
            itemElement.innerHTML = `
                <h4>${res.name}</h4>
                <img src='${res.sprites.default}'>
                <p>cost: ${res.cost}</p>
            `
            div.appendChild(itemElement);
            }
        });
}

function prev() {
    pokemonListRequest(state.previous);
}

function next() {
    pokemonListRequest(state.next);
}


function setButtonsState() {
    if(state.previous) {
        prevBtnElement.disabled = false;
    }
    else {
        prevBtnElement.disabled = true;
    }
    if(state.next) {
        nextBtnElement.disabled = false;
    }
    else {
        nextBtnElement.disabled = true;
    }
}

function hideButtons() {
    nav.style = 'display: none;';
}

function showButtons() {
    nav.style = 'display: flex;'; 
}


document.getElementById('limit').addEventListener('change', function(event){
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${event.target.value}&offset=0`;
    pokemonListRequest(url);
})