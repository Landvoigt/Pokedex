let currentPokemon;
let AUDIO_FRONTPAGE = new Audio('./audio/frontpage/poke_center.mp3');
let types = [
    {
        "type": "normal",
        "color": "white"
    }
    ,
    {
        "type": "fighting",
        "color": "orange"
    }
    ,
    {
        "type": "flying",
        "color": "lightblue"
    }
    ,
    {
        "type": "poison",
        "color": "purple"
    }
    ,
    {
        "type": "ground",
        "color": "brown"
    }
    ,
    {
        "type": "rock",
        "color": "grey"
    }
    ,
    {
        "type": "bug",
        "color": "lightgreen"
    }
    ,
    {
        "type": "ghost",
        "color": "lightyellow"
    }
    ,
    {
        "type": "steel",
        "color": "silver"
    }
    ,
    {
        "type": "fire",
        "color": "red"
    }
    ,
    {
        "type": "water",
        "color": "blue"
    }
    ,
    {
        "type": "grass",
        "color": "green"
    }
    ,
    {
        "type": "electric",
        "color": "yellow"
    }
    ,
    {
        "type": "psychic",
        "color": "rosa"
    }
    ,
    {
        "type": "ice",
        "color": "turkis"
    }
    ,
    {
        "type": "dragon",
        "color": "darkblue"
    }
    ,
    {
        "type": "dark",
        "color": "black"
    }
    ,
    {
        "type": "fairy",
        "color": "noir"
    }
]

async function loadPokedex() {
    for (let i = 1; i < 60; i++) {
        let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(pokemonURL);
        pokemons = await response.json();
        variables(pokemons);
    }
    console.log(pokemons);
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

function variables(pokemons) {
    let name = pokemons['name'];
    let pic = pokemons['sprites']['other']['home']['front_default'];
    let card = document.getElementById('mainContent');
    if (pokemons['types'].length == 1) {
        let type_1 = pokemons['types'][0]['type']['name'];
        updateTypeColorSingular(name, pic, type_1, card);
    } else {
        let type_1 = pokemons['types'][0]['type']['name'];
        let type_2 = pokemons['types'][1]['type']['name'];
        updateTypeColorMultiple(name, pic, type_1, type_2, card);
    }
}

function updateTypeColorSingular(name, pic, type_1, card) {
    for (let i = 0; i < types.length; i++) {
        let color = types[i]['type'];
        let typecolor = types[i]['color'];
        if (type_1 == color) {
            renderPokemon(name, pic, type_1, card, typecolor)
        }
    }
}

function updateTypeColorMultiple(name, pic, type_1, type_2, card) {
    for (let i = 0; i < types.length; i++) {
        let firstcolor = types[i]['type'];
        if (type_1 == firstcolor) {
            let typecolor1 = types[i]['color'];
            for (let j = 0; j < types.length; j++) {
                let secondcolor = types[j]['type'];
                if (type_2 == secondcolor) {
                    let typecolor2 = types[j]['color'];
                    renderPokemon2(name, pic, type_1, type_2, card, typecolor1, typecolor2);
                }
            }
        }
    }
}

function renderPokemon(name, pic, type_1, card, typecolor) {
    let index = pokemons['id'];
    if (index < 10) {
        index = '00' + index;
    }
    if (index > 9 && index < 100) {
        index = '0' + index;
    }
    card.innerHTML += `
        <div class="poke-card">
            <img src="${pic}">
            <div class="card-bg-left" style="background-color: ${typecolor}">
            </div>
            <div class="card-bg-right" style="background-color: ${typecolor}">
            </div>
            <div class="card-text">
                <div class="card-text-top">
                    <h3 class="text-center mt-40">${name}</h3>
                </div>
                <div class="card-text-bottom">
                    <i class="index-number text-center"> #${index}</i>
                    <span class="type-small-image">${type_1}</span>
                </div>
            </div>
        </div>
    `;
}

function renderPokemon2(name, pic, type_1, type_2, card, typecolor1, typecolor2) {
    let index = pokemons['id'];
    if (index < 10) {
        index = '00' + index;
    }
    if (index > 9 && index < 100) {
        index = '0' + index;
    }
    card.innerHTML += `
        <div class="poke-card">
        <img src="${pic}">
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
    `;
}

function deleteFrontPage() {
    let top = document.getElementById('frontPageTop');
    let bottom = document.getElementById('frontPageBottom');
    top.classList.add('d-none');
    bottom.classList.add('d-none');
    document.getElementById('body').classList.remove('overflow');
}