let promises = [];
let pokemons = [];
let sortedPokemons;
let resultElement = document.getElementById('results');
let kantoPokemonsRequest = new XMLHttpRequest();
kantoPokemonsRequest.open("GET", "https://pokeapi.co/api/v2/pokemon?limit=127");
kantoPokemonsRequest.responseType = 'json';
kantoPokemonsRequest.send();
kantoPokemonsRequest.onload = function(){
	kantoPokemonsRequest.response.results.forEach(pokemon =>{
		let promise = new Promise(function(resolve, reject){
			let xhr = new XMLHttpRequest();
			xhr.open("GET", pokemon.url);
			xhr.responseType = 'json';
			xhr.send(); 
			xhr.onload = function(){
				if(xhr.status == 200){
					resolve(xhr.response);
				}else{
					reject(xhr.statusText);
				}
			}
			xhr.onerror = function(){
				reject(xhr.statusText);
			}
		});
		promises.push(promise);
	});
	Promise.all(promises).then(function(results){
		pokemons = results;
		sortedPokemons = pokemons.sort();
		sortedPokemons.forEach(pokemon => drawPokemon(pokemon));
	});
}
function drawPokemon(pokemon){
	let pokemonElement = document.createElement('div');
	pokemonElement.classList.add('pokemon');
	pokemonElement.innerHTML = `
		<p>id: ${pokemon.id}</p>
		<hr>
		<h1>${pokemon.name}</h1>
		<img src="${pokemon.sprites.front_default}">
		<div class="stats">
			<p class="hp">&#10084;${pokemon.stats[0].base_stat}</p>
			<p class="attack">&#9876;${pokemon.stats[1].base_stat}</p>
			<p class="defence">&#128737;${pokemon.stats[2].base_stat}</p>
		</div>
	`
	let typeList = document.createElement('ul');
	populateListWithTypes(pokemon.types, typeList);
	pokemonElement.appendChild(typeList);
	resultElement.appendChild(pokemonElement);
}
function populateListWithTypes(types, ul){
	types.forEach(function(type){
		let typeItem = document.createElement('li');
		typeItem.innerText = type.type.name;
		ul.appendChild(typeItem);
	});
}
function reDrawSortedPokemons(){
	resultElement.innerHTML = null;
	sortedPokemons.forEach(pokemon => drawPokemon(pokemon));
}

let order = 1;
let sortForm = document.getElementById('sort-form');
sortForm.addEventListener('change', function(event){
	if(event.target.name == 'order') {
        switch(event.target.value){
            case 'upsc': 
                order = 1;
                break;
            case 'desc':
                order = -1;
                break;
        }
    }
	switch(sortForm['sort'].value){
		case 'id':
			sortedPokemons = sortedPokemons.sort(function(first, second){
				if(first.id > second.id){

					return order;
				}
				if(first.id < second.id){
					return -order;
				}
				return 0;
			});
			break;
		case 'name':
			sortedPokemons = sortedPokemons.sort(function(first, second){
				if(first.name > second.name){

					return order;
				}
				if(first.name < second.name){
					return -order;
				}
				return 0;
			});
			break;
		case 'hp':
			sortedPokemons = sortedPokemons.sort(function(first, second){
				if(first.stats[0].base_stat > second.stats[0].base_stat){

					return order;
				}
				if(first.stats[0].base_stat < second.stats[0].base_stat){
					return -order;
				}
				return 0;
			});
			break;
		case 'attack':
			sortedPokemons = sortedPokemons.sort(function(first, second){
				if(first.stats[1].base_stat > second.stats[1].base_stat){

					return order;
				}
				if(first.stats[1].base_stat < second.stats[1].base_stat){
					return -order;
				}
				return 0;
			});
			break;
		case 'defence':
			sortedPokemons = sortedPokemons.sort(function(first, second){
				if(first.stats[2].base_stat > second.stats[2].base_stat){

					return order;
				}
				if(first.stats[2].base_stat < second.stats[2].base_stat){
					return -order;
				}
				return 0;
			});
			break;
	}
	reDrawSortedPokemons();
});

document.getElementById('filter-form').addEventListener('submit', function(event){
	event.preventDefault();
	if(event.target['name-filter'].value){
		sortedPokemons = sortedPokemons.filter(function(pokemon){
			return pokemon.name.indexOf(event.target['name-filter'].value.toLowerCase()) != -1;
		});
	}
	if(event.target['hp-filter-from'].value > 10){
		sortedPokemons = sortedPokemons.filter(function(pokemon){
			return pokemon.stats[0].base_stat >= event.target['hp-filter-from'].value;
		});
	}
	if(event.target['hp-filter-to'].value < 250){
		sortedPokemons = sortedPokemons.filter(function(pokemon){
			return pokemon.stats[0].base_stat <= event.target['hp-filter-to'].value;
		});
	}
	if(event.target['attack-filter-from'].value > 5){
		sortedPokemons = sortedPokemons.filter(function(pokemon){
			return pokemon.stats[1].base_stat >= event.target['attack-filter-from'].value;
		});
	}
	if(event.target['attack-filter-to'].value < 130){
		sortedPokemons = sortedPokemons.filter(function(pokemon){
			return pokemon.stats[1].base_stat <= event.target['attack-filter-to'].value;
		});
	}
	if(event.target['defense-filter-from'].value > 5){
		sortedPokemons = sortedPokemons.filter(function(pokemon){
			return pokemon.stats[2].base_stat >= event.target['defense-filter-from'].value;
		});
	}
	if(event.target['defense-filter-to'].value < 180){
		sortedPokemons = sortedPokemons.filter(function(pokemon){
			return pokemon.stats[2].base_stat <= event.target['defense-filter-to'].value;
		});
	}
	event.target['type'].forEach(function(filterType){
		if(!filterType.checked){
			sortedPokemons = sortedPokemons.filter(function(pokemon){
				for(i in pokemon.types){
					if(pokemon.types[i].type.name == filterType.value) return false;
				}
				return true;
			});
		}
	})
	reDrawSortedPokemons();
});
