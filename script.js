let pokemon;
let AUDIO_FRONTPAGE = new Audio('./audio/frontpage/poke_center.mp3');
let types = [
    {
        "type": "normal",
        "color": "#d1d0ce"
    }
    ,
    {
        "type": "fighting",
        "color": "#e17c45"
    }
    ,
    {
        "type": "flying",
        "color": "#afd2ef"
    }
    ,
    {
        "type": "poison",
        "color": "#9c53b7"
    }
    ,
    {
        "type": "ground",
        "color": "#8b6449"
    }
    ,
    {
        "type": "rock",
        "color": "#b7a681"
    }
    ,
    {
        "type": "bug",
        "color": "#c1d15c"
    }
    ,
    {
        "type": "ghost",
        "color": "#5B4964"
    }
    ,
    {
        "type": "steel",
        "color": "#8E8E92"
    }
    ,
    {
        "type": "fire",
        "color": "#d52222"
    }
    ,
    {
        "type": "water",
        "color": "#2d9be3"
    }
    ,
    {
        "type": "grass",
        "color": "#4ac530"
    }
    ,
    {
        "type": "electric",
        "color": "#ffcf00"
    }
    ,
    {
        "type": "psychic",
        "color": "#ff5767"
    }
    ,
    {
        "type": "ice",
        "color": "#5eedea"
    }
    ,
    {
        "type": "dragon",
        "color": "#4567A1"
    }
    ,
    {
        "type": "dark",
        "color": "#4b484e"
    }
    ,
    {
        "type": "fairy",
        "color": "#f381a8"
    }
]
let pokemonArray = [];
let currentLoadedPokemon;

async function loadPokedex() {
    pokemonArray.length = 0;
    for (let x = 1; x < 906; x++) { // 1011 all // 906 have small pic // 650 have big pic
        let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${x}`;
        let response = await fetch(pokemonURL);
        pokemon = await response.json();
        loadVariables(pokemon, x);
        if (x == 100) {
            let pokemonsLoaded = 0;
            let pokemonsToLoad = 100;
            loadPokemonData(pokemonsLoaded, pokemonsToLoad);
            showStartButton();
        }
    }
}

function loadVariables(pokemon, x) {
    let name = pokemon['name'];
    let pic = pokemon['sprites']['other']['home']['front_default'];
    if (pokemon['types'].length == 1) {
        let type_1 = pokemon['types'][0]['type']['name'];
        updateTypeColorSingular(name, pic, type_1, x);
    } else {
        let type_1 = pokemon['types'][0]['type']['name'];
        let type_2 = pokemon['types'][1]['type']['name'];
        updateTypeColorMultiple(name, pic, type_1, type_2, x);
    }
}

function updateTypeColorSingular(name, pic, type_1, x) {
    for (let i = 0; i < types.length; i++) {
        let color = types[i]['type'];
        let typecolor = types[i]['color'];
        if (type_1 == color) {
            let type_2 = '';
            calculateIndexNumber(name, pic, type_1, type_2, typecolor, typecolor, x)
        }
    }
}

function updateTypeColorMultiple(name, pic, type_1, type_2, x) {
    for (let i = 0; i < types.length; i++) {
        let firstcolor = types[i]['type'];
        if (type_1 == firstcolor) {
            let typecolor1 = types[i]['color'];
            for (let j = 0; j < types.length; j++) {
                let secondcolor = types[j]['type'];
                if (type_2 == secondcolor) {
                    let typecolor2 = types[j]['color'];
                    calculateIndexNumber(name, pic, type_1, type_2, typecolor1, typecolor2, x);
                }
            }
        }
    }
}

function stopProp() {
    event.stopPropagation();
}

function loadFiftyMorePokemon() {
    let pokemonsToLoad = currentLoadedPokemon + 50;
    loadPokemonData(currentLoadedPokemon, pokemonsToLoad);
}

function loadOneMorePokemon() {
    let pokemonsToLoad = currentLoadedPokemon + 1;
    loadPokemonData(currentLoadedPokemon, pokemonsToLoad);
}

/// ToDo

function filterPokemon() {
    let content = document.getElementById('mainContent');
    content.innerHTML = '';
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    for (let i = 0; i < pokemonArray.length; i++) {
        const name = pokemonArray[i]['name'];
        if (name.toLowerCase().includes(search)) {
            loadPokemonData2(i);
        }
    }
}


function loadPokemonData2(i) {
        let pokemonData = pokemonArray[x];
        let name = pokemonData['name'];
        let index = pokemonData['index'];
        let pic = pokemonData['picSRC'];
        let type_1 = pokemonData['type1'];
        let type_2 = pokemonData['type2'];
        let typecolor_1 = pokemonData['typecolor1'];
        let typecolor_2 = pokemonData['typecolor2'];
        if (type_2 == 0) {
            renderPokemonWithOneType(name, index, pic, type_1, typecolor_1, x);
        }
        else {
            renderPokemonWithTwoTypes(name, index, pic, type_1, type_2, typecolor_1, typecolor_2, x);
        }
        currentLoadedPokemon = x + 1;
    let loadPokemonButton = document.getElementById('mainContent');
    loadPokemonButton.innerHTML += `
        <button class="load-more-pokemon-button" onclick="loadFiftyMorePokemon()">load next 50 Pokemon</button>
        `;
}