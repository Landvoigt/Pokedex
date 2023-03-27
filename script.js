let pokemon;
let pokemonBefore;
let pokemonAfter;
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
    for (let x = 1; x < 100; x++) {
        if (x == 1) {
            let y = x;
            let z = x + 1;
            let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${x}`;
            let urlPokemonBefore = `https://pokeapi.co/api/v2/pokemon/${y}`;
            let urlPokemonAfter = `https://pokeapi.co/api/v2/pokemon/${z}`;
            let response = await fetch(pokemonURL);
            let responseBefore = await fetch(urlPokemonBefore);
            let responseAfter = await fetch(urlPokemonAfter);
            pokemon = await response.json();
            pokemonBefore = await responseBefore.json();
            pokemonAfter = await responseAfter.json();
            // console.log(pokemon, pokemonBefore, pokemonAfter);
            variables(pokemon, pokemonBefore, pokemonAfter, x);
        } else {
            let y = x - 1;
            let z = x + 1;
            let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${x}`;
            let urlPokemonBefore = `https://pokeapi.co/api/v2/pokemon/${y}`;
            let urlPokemonAfter = `https://pokeapi.co/api/v2/pokemon/${z}`;
            let response = await fetch(pokemonURL);
            let responseBefore = await fetch(urlPokemonBefore);
            let responseAfter = await fetch(urlPokemonAfter);
            pokemon = await response.json();
            pokemonBefore = await responseBefore.json();
            pokemonAfter = await responseAfter.json();
            // console.log(pokemon, pokemonBefore, pokemonAfter);
            variables(pokemon, pokemonBefore, pokemonAfter, x);
        }
    }
    showStartButton();
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

function variables(pokemon, y, z, x) {
    let name = pokemon['name'];
    let pic = pokemon['sprites']['other']['home']['front_default'];
    let card = document.getElementById('mainContent');
    if (pokemon['types'].length == 1) {
        let type_1 = pokemon['types'][0]['type']['name'];
        updateTypeColorSingular(name, pic, type_1, card, x, y, z);
    } else {
        let type_1 = pokemon['types'][0]['type']['name'];
        let type_2 = pokemon['types'][1]['type']['name'];
        updateTypeColorMultiple(name, pic, type_1, type_2, card, x, y, z);
    }
}

function updateTypeColorSingular(name, pic, type_1, card, x, y , z) {
    for (let i = 0; i < types.length; i++) {
        let color = types[i]['type'];
        let typecolor = types[i]['color'];
        if (type_1 == color) {
            renderPokemon(name, pic, type_1, card, typecolor, x, y, z)
        }
    }
}

function updateTypeColorMultiple(name, pic, type_1, type_2, card, x, y, z) {
    for (let i = 0; i < types.length; i++) {
        let firstcolor = types[i]['type'];
        if (type_1 == firstcolor) {
            let typecolor1 = types[i]['color'];
            for (let j = 0; j < types.length; j++) {
                let secondcolor = types[j]['type'];
                if (type_2 == secondcolor) {
                    let typecolor2 = types[j]['color'];
                    renderPokemon2(name, pic, type_1, type_2, card, typecolor1, typecolor2, x, y, z);
                }
            }
        }
    }
}

function renderPokemon(name, pic, type_1, card, typecolor, x, y, z) {
    let index = pokemon['id'];
    let test = pokemon[x];
    if (index < 10) {
        index = '00' + index;
    }
    if (index > 9 && index < 100) {
        index = '0' + index;
    }
    let shinyPic = pokemon['sprites']['other']['dream_world']['front_default'];
    let picBefore = y['sprites']['other']['dream_world']['front_default'];
    let picAfter = z['sprites']['other']['dream_world']['front_default'];
    card.innerHTML += `
        <div class="poke-card" onclick="showBigPokemonCard(${x})">
        <img src="${pic}" class="small-pokemon-img">
        <div class="card-bg-one-type" style="background-color: ${typecolor}">
        </div>
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
        <div id="bigCardWindow${x}" class="big-card-window d-none" onclick="hideBigPokemonCard(${x})">
        <img src="./img/icons/arrow_left.png" id="bigImage" class="arrow a-left" onclick="stopProp()">
        <div class="big-poke-card-container">
        <div id="bigCardLeft${x}" class="poke-card big-poke-card-left" onclick="stopProp()">
            <img src="./img/pokeball_bg_grey_3.png" class="big-card-bg">
            <img src="${picBefore}" class="big-pokemon-img">
            <div class="big-card-bg-left" style="background-color: ${typecolor}">
            </div>
            <div class="big-card-bg-right" style="background-color: ${typecolor}">
            </div>
            <div class="big-card-text">
                <div class="card-text-top">
                    <h3 class="big-card-pokemon-name">${name}</h3>
                    <i class="index-number big-card-index-number"> #${index}</i>
                    <span class="type-small-image big-card-type">${type_1}</span>
                </div>
            </div>
            <div class="big-card-details-bg-1"></div>
            <div class="big-card-details-bg-2"></div>
            <div class="big-card-details-bg-3"></div>
            <div class="big-card-details-bg-4">
                <div class="pokemon-details"></div>
            </div>
        </div>
        <div id="bigCardMain${x}" class="poke-card big-poke-card" onclick="stopProp()">
            <img src="./img/pokeball_bg_grey_3.png" class="big-card-bg">
            <img src="${shinyPic}" class="big-pokemon-img">
            <div class="big-card-bg-left" style="background-color: ${typecolor}">
            </div>
            <div class="big-card-bg-right" style="background-color: ${typecolor}">
            </div>
            <div class="big-card-text">
                <div class="card-text-top">
                    <h3 class="big-card-pokemon-name">${name}</h3>
                    <i class="index-number big-card-index-number"> #${index}</i>
                    <span class="type-small-image big-card-type">${type_1}</span>
                </div>
            </div>
            <div class="big-card-details-bg-1"></div>
            <div class="big-card-details-bg-2"></div>
            <div class="big-card-details-bg-3"></div>
            <div class="big-card-details-bg-4">
                <div class="pokemon-details"></div>
            </div>
        </div>
        <div id="bigCardRight${x}" class="poke-card big-poke-card-right" onclick="stopProp()">
            <img src="./img/pokeball_bg_grey_3.png" class="big-card-bg">
            <img src="${picAfter}" class="big-pokemon-img">
            <div class="big-card-bg-left" style="background-color: ${typecolor}">
            </div>
            <div class="big-card-bg-right" style="background-color: ${typecolor}">
            </div>
            <div class="big-card-text">
                <div class="card-text-top">
                    <h3 class="big-card-pokemon-name">${name}</h3>
                    <i class="index-number big-card-index-number"> #${index}</i>
                    <span class="type-small-image big-card-type">${type_1}</span>
                </div>
            </div>
            <div class="big-card-details-bg-1"></div>
            <div class="big-card-details-bg-2"></div>
            <div class="big-card-details-bg-3"></div>
            <div class="big-card-details-bg-4">
                <div class="pokemon-details"></div>
            </div>
        </div>
        <img src="./img/icons/arrow_right.png" id="" class="arrow a-right" onclick="stopProp()">
        </div>
        `;
}

function renderPokemon2(name, pic, type_1, type_2, card, typecolor1, typecolor2, x) {
    let index = pokemon['id'];
    if (index < 10) {
        index = '00' + index;
    }
    if (index > 9 && index < 100) {
        index = '0' + index;
    }
    let shinyPic = pokemon['sprites']['other']['dream_world']['front_default'];
    card.innerHTML += `
        <div class="poke-card" onclick="showBigPokemonCard(${x})">
        <img src="${pic}" class="small-pokemon-img">
        <div class="card-bg-left" style="background-color: ${typecolor1}">
        </div>
        <div class="card-bg-right" style="background-color: ${typecolor2}">
        </div>
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
        <div id="bigCardWindow${x}" class="big-card-window d-none" onclick="hideBigPokemonCard(${x})">
        <img src="./img/icons/arrow_left.png" class="arrow a-left" onclick="stopProp()">
        <div class="big-poke-card-container">
        <div id="bigCardLeft${x}" class="poke-card big-poke-card-left" onclick="stopProp()"></div>
        <div id="bigCardMain${x}" class="poke-card big-poke-card" onclick="stopProp()">
            <img src="./img/pokeball_bg_grey_3.png" class="big-card-bg">
            <img src="${shinyPic}" class="big-pokemon-img">
            <div class="big-card-bg-left" style="background-color: ${typecolor1}">
            </div>
            <div class="big-card-bg-right" style="background-color: ${typecolor2}">
            </div>
            <div class="big-card-text">
                <div class="card-text-top">
                    <h3 class="big-card-pokemon-name">${name}</h3>
                    <i class="index-number big-card-index-number"> #${index}</i>
                    <span class="type-small-image big-card-type">${type_1}</span>
                    <span class="type-small-image big-card-type">${type_2}</span>
                </div>
            </div>
            <div class="big-card-details-bg-1"></div>
            <div class="big-card-details-bg-2"></div>
            <div class="big-card-details-bg-3"></div>
            <div class="big-card-details-bg-4">
                <div class="pokemon-details"></div>
            </div>
        </div>
        <div id="bigCardRight${x}" class="poke-card big-poke-card-right" onclick="stopProp()"></div>
        </div>
        <img src="./img/icons/arrow_right.png" class="arrow a-right" onclick="stopProp()">
        </div>
        `;
}

function deleteFrontPage() {
    let top = document.getElementById('frontPageTop');
    let bottom = document.getElementById('frontPageBottom');
    top.classList.add('d-none');
    bottom.classList.add('d-none');
    document.getElementById('body').classList.remove('overflow');
}

async function showBigPokemonCard(x) {
    document.getElementById(`bigCardWindow${x}`).classList.remove('d-none');
    // let left = document.getElementById(`bigCardLeft${x}`);
    // let main = document.getElementById(`bigCardMain${x}`);
    // let right = document.getElementById(`bigCardRight${x}`);
    // console.log(pokemon, left, right, main);
    // let name = pokemon['name'];
    // let pic = pokemon['sprites']['other']['home']['front_default'];
    // showPokemon(name, pic, left);
    // showPokemon(name, pic, main);
    // showPokemon(name, pic, right);
}

function showPokemon(name, pic, position) {
    position.innerHTML =
        `
    <img src="./img/pokeball_bg_grey_3.png" class="big-card-bg">
    <img src="${pic}" class="big-pokemon-img">
    <div class="big-card-bg-left" style="background-color: ">
    </div>
    <div class="big-card-bg-right" style="background-color: ">
    </div>
    <div class="big-card-text">
        <div class="card-text-top">
            <h3 class="big-card-pokemon-name">${name}</h3>
            <i class="index-number big-card-index-number"> #</i>
            <span class="type-small-image big-card-type"></span>
            <span class="type-small-image big-card-type"></span>
        </div>
    </div>
    <div class="big-card-details-bg-1"></div>
    <div class="big-card-details-bg-2"></div>
    <div class="big-card-details-bg-3"></div>
    <div class="big-card-details-bg-4">
        <div class="pokemon-details"></div>
    </div>
    `;
}

function hideBigPokemonCard(x) {
    document.getElementById(`bigCardWindow${x}`).classList.add('d-none');
}

function stopProp() {
    event.stopPropagation();
}