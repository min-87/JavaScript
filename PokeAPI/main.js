let url = 'https://pokeapi.co/api/v2/pokemon/';
let submitElement = document.getElementById('submit');
let searchElement = document.getElementById('search');
let resultElement = document.getElementById('result');

submitElement.addEventListener('click', function(event){
	search(searchElement.value);
});

function search(pockemonName){
	let xhr = new XMLHttpRequest();
	xhr.open('GET', url + pockemonName.toLowerCase());
	xhr.responseType = 'json';
	xhr.send();
	xhr.onload = function(){
		//console.log(xhr.response);
		if(xhr.status > 300){
			resultElement.innerHTML = '<div class="pokemon">Такого покемона нету</div>'
		}else{
			drawPokemon(xhr.response);
		}
	}
	xhr.onerror = function(err){
		console.log(err);
		resultElement.innerHTML = '<div class="pokemon">Во время поиска произошла какая-то ошибка. Попробуйте ещё раз</div>'
	}
}
function drawPokemon(pokemon){
	resultElement.innerHTML = '';
	let pokemonElement = document.createElement('div');
	pokemonElement.classList.add('pokemon');
	pokemonElement.innerHTML = `
		<p>id: #${pokemon.id}</p>
		<hr>
		<h1>${pokemon.name}</h1>
		<img src="${pokemon.sprites.front_default}">
	`
	let typeList = document.createElement('ul');
	populateListWithTypes(pokemon.types, typeList);
	pokemonElement.appendChild(typeList);

	let itemsElement = document.createElement('div');
	populateDivWithItems(pokemon.held_items, itemsElement);
	itemsElement.classList.add('items');
	pokemonElement.appendChild(itemsElement);

	resultElement.appendChild(pokemonElement);
}
function populateListWithTypes(types, ul){
	types.forEach(function(type){
		let typeItem = document.createElement('li');
		typeItem.innerText = type.type.name;
		ul.appendChild(typeItem);
	})
}
function populateDivWithItems(items, div){
	items.forEach(function(item){
		let xhr = new XMLHttpRequest();
		xhr.open('GET', item.item.url);
		xhr.responseType = 'json';
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