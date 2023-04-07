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
let pokemonSearch = false;

async function loadPokedex() {
    pokemonArray.length = 0;
    for (let x = 1; x < 906; x++) { // 1011 all // 906 have small pic // 650 have big pic
        let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${x}`;
        let response = await fetch(pokemonURL);
        pokemon = await response.json();
        loadVariables(pokemon, x);
        if (x == 50) {
            loadPokemonFromOwnJSON(0, 50);
            showStartButton();
            identifySearchButton();
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
    loadPokemonFromOwnJSON(currentLoadedPokemon, pokemonsToLoad);
}

function loadOneMorePokemon() {
    let pokemonsToLoad = currentLoadedPokemon + 1;
    loadPokemonFromOwnJSON(currentLoadedPokemon, pokemonsToLoad);
}

function showMainpage() {
    pokemonSearch = false;
    let content = document.getElementById('mainContent');
    content.innerHTML = '';
    loadPokemonFromOwnJSON(0, 50);
}

function identifySearchButton() {
    let input = document.getElementById('search');
    let button = document.getElementById('button');
    button.disabled = true;
    input.addEventListener("change", filterPokemon);
}

function filterPokemon() {
    let input = document.getElementById('search');
    let button = document.getElementById('button');
    if (input.value === "") {
        button.disabled = true;
    } else {
        button.disabled = false;
        let content = document.getElementById('mainContent');
        content.innerHTML = '';
        let search = document.getElementById('search').value;
        search = search.toLowerCase();
        window.scrollTo(0, 0);
        for (let i = 0; i < pokemonArray.length; i++) {
            const name = pokemonArray[i]['name'];
            if (name.toLowerCase().includes(search)) {
                pokemonSearch = true;
                loadPokemonData(i);
                currentLoadedPokemon = 1;
                document.getElementById('search').value = '';
            }
        }
    }
}