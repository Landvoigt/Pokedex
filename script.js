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

async function loadPokedex() {
    pokemonArray.length = 0;
    for (let x = 1; x < 20; x++) {
        let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${x}`;
        let response = await fetch(pokemonURL);
        pokemon = await response.json();
        variables(pokemon, x);
    }
    showStartButton();
    console.log(pokemon);
}

function showStartButton() {
    let btn = document.getElementById('startButton');
    btn.classList.remove('d-none');
}

function showStartAnimation() {
    let top = document.getElementById('frontPageTop');
    let bottom = document.getElementById('frontPageBottom');
    top.classList.add('animation-go-up');
    bottom.classList.add('animation-go-down');
    AUDIO_FRONTPAGE.play();
    setTimeout(deleteFrontPage, 2500);
}

function variables(pokemon, x) {
    let name = pokemon['name'];
    let pic = pokemon['sprites']['other']['home']['front_default'];
    let card = document.getElementById('mainContent');
    if (pokemon['types'].length == 1) {
        let type_1 = pokemon['types'][0]['type']['name'];
        updateTypeColorSingular(name, pic, type_1, card, x);
    } else {
        let type_1 = pokemon['types'][0]['type']['name'];
        let type_2 = pokemon['types'][1]['type']['name'];
        updateTypeColorMultiple(name, pic, type_1, type_2, card, x);
    }
}

function updateTypeColorSingular(name, pic, type_1, card, x) {
    for (let i = 0; i < types.length; i++) {
        let color = types[i]['type'];
        let typecolor = types[i]['color'];
        if (type_1 == color) {
            renderPokemon(name, pic, type_1, card, typecolor, x)
        }
    }
}

function updateTypeColorMultiple(name, pic, type_1, type_2, card, x) {
    for (let i = 0; i < types.length; i++) {
        let firstcolor = types[i]['type'];
        if (type_1 == firstcolor) {
            let typecolor1 = types[i]['color'];
            for (let j = 0; j < types.length; j++) {
                let secondcolor = types[j]['type'];
                if (type_2 == secondcolor) {
                    let typecolor2 = types[j]['color'];
                    renderPokemon2(name, pic, type_1, type_2, card, typecolor1, typecolor2, x);
                }
            }
        }
    }
}

function renderPokemon(name, pic, type_1, card, typecolor, x) {
    let index = pokemon['id'];
    if (index < 10) {
        index = '00' + index;
    }
    if (index > 9 && index < 100) {
        index = '0' + index;
    }
    card.innerHTML += `
        <div class="poke-card" onclick="showBigPokemonCard(${x})">
            <img src="${pic}" class="small-pokemon-img">
            <div class="card-bg-one-type" style="background-color: ${typecolor}"></div>
            <div class="card-text">
                <div class="card-text-top">
                    <h3 class="text-center mt-40">${name}</h3>
                </div>
                <div class="card-text-bottom">
                    <i class="index-number text-center"> #${index}</i>
                    <span id="type${x}" class="type-small-image">${type_1}</span>
                </div>
            </div>
        </div>
        `;
    let type_2 = '';
    pushPokemonDetailsInJSON(x, name, index, pic, type_1, type_2, typecolor, typecolor);
}

function renderPokemon2(name, pic, type_1, type_2, card, typecolor1, typecolor2, x) {
    let index = pokemon['id'];
    if (index < 10) {
        index = '00' + index;
    }
    if (index > 9 && index < 100) {
        index = '0' + index;
    }
    card.innerHTML += `
        <div class="poke-card" onclick="showBigPokemonCard(${x})">
            <img src="${pic}" class="small-pokemon-img">
            <div class="card-bg-left" style="background-color: ${typecolor1}"></div>
            <div class="card-bg-right" style="background-color: ${typecolor2}"></div>
            <div class="card-text">
                <div class="card-text-top">
                    <span class="type-small-image">${type_1}</span>
                    <h3 class="text-center">${name}</h3>
                </div>
                <div class="card-text-bottom">
                    <i class="index-number text-center"> #${index}</i>
                    <span class="type-small-image">${type_2}</span>
                </div>
            </div>
        </div>
        `;
    pushPokemonDetailsInJSON(x, name, index, pic, type_1, type_2, typecolor1, typecolor2);
}

function pushPokemonDetailsInJSON(x, name, index, pic, type_1, type_2, typecolor1, typecolor2) {
    let shinyPic = pokemon['sprites']['other']['dream_world']['front_default'];
    let data = {
        'url': `https://pokeapi.co/api/v2/pokemon/${x}`,
        'name': name,
        'index': index,
        'picSRC': pic,
        'type1': type_1,
        'type2': type_2,
        'typecolor1': typecolor1,
        'typecolor2': typecolor2,
        'shinyPic' : shinyPic
    }
    pokemonArray.push(data);
}

function deleteFrontPage() {
    let top = document.getElementById('frontPageTop');
    let bottom = document.getElementById('frontPageBottom');
    top.classList.add('d-none');
    bottom.classList.add('d-none');
    document.getElementById('body').classList.remove('overflow');
}

function showBigPokemonCard(x) {
    document.getElementById(`bigCardWindow`).classList.remove('d-none');
    let main = document.getElementById(`bigCardMain`);
    let numberPokemonMiddle = x - 1;
    loadPokemonsDetails(numberPokemonMiddle, main);
    let left = document.getElementById(`bigCardLeft`);
    let numberPokemonLeft = x - 2;
    loadPokemonsDetails(numberPokemonLeft, left);
    let right = document.getElementById(`bigCardRight`);
    let numberPokemonRight = x;
    loadPokemonsDetails(numberPokemonRight, right);
}

function loadPokemonsDetails(number, position) {
    let pokemon = pokemonArray[number];
    let name = pokemon['name'];
    let index = pokemon['index'];
    let pic = pokemon['shinyPic'];
    let type1 = pokemon['type1'];
    let type2 = pokemon['type2'];
    let typecolor1 = pokemon['typecolor1'];
    let typecolor2 = pokemon['typecolor2'];
    showPokemon(name, index, pic, type1, type2, typecolor1, typecolor2, number, position);
}

function showPokemon(name, index, pic, type1, type2, typecolor1, typecolor2, number, position) {
    position.innerHTML =
        `
    <img src="./img/pokeball_bg_grey_3.png" class="big-card-bg">
    <img src="${pic}" class="big-pokemon-img">
    <div class="big-card-bg-left" style="background-color: ${typecolor1}">
    </div>
    <div class="big-card-bg-right" style="background-color: ${typecolor2}">
    </div>
    <div class="big-card-text">
        <div class="card-text-top">
            <h3 class="big-card-pokemon-name">${name}</h3>
            <i class="index-number big-card-index-number"> #${index}</i>
            <span class="type-small-image big-card-type">${type1}</span>
            <span id="secondType${number}" class="type-small-image big-card-type">${type2}</span>
        </div>
    </div>
    <div class="big-card-details-bg-1"></div>
    <div class="big-card-details-bg-2"></div>
    <div class="big-card-details-bg-3"></div>
    <div class="big-card-details-bg-4">
        <div class="pokemon-details"></div>
    </div>
    `;
    if (type2 == 0) {
        document.getElementById(`secondType${number}`).classList.add('d-none');
    }
}

function hideBigPokemonCard() {
    document.getElementById(`bigCardWindow`).classList.add('d-none');
}

function stopProp() {
    event.stopPropagation();
}