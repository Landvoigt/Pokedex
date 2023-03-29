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
    for (let x = 1; x < 300; x++) {
        let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${x}`;
        let response = await fetch(pokemonURL);
        pokemon = await response.json();
        variables(pokemon, x);
    }
    showStartButton();
    console.log(pokemon);
}

function showStartButton() {
    let loading = document.getElementById('loadingSymbol');
    loading.classList.add('d-none');
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

function deleteFrontPage() {
    let top = document.getElementById('frontPageTop');
    let bottom = document.getElementById('frontPageBottom');
    top.classList.add('d-none');
    bottom.classList.add('d-none');
    document.getElementById('body').classList.remove('overflow');
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
        <div class="poke-card" onclick="loadBigPokemonCards(${x})">
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
        <div class="poke-card" onclick="loadBigPokemonCards(${x})">
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
    let height = pokemon['height'];
    let weight = pokemon['weight'];
    let experience = pokemon['base_experience'];
    let stat_hp = pokemon['stats'][0]['base_stat'];
    let stat_attack = pokemon['stats'][1]['base_stat'];
    let stat_defense = pokemon['stats'][2]['base_stat'];
    let stat_specialattack = pokemon['stats'][3]['base_stat'];
    let stat_specialdefense = pokemon['stats'][4]['base_stat'];
    let stat_speed = pokemon['stats'][5]['base_stat'];
    // let abilities = [];
    let data = {
        'url': `https://pokeapi.co/api/v2/pokemon/${x}`,
        'name': name,
        'index': index,
        'picSRC': pic,
        'type1': type_1,
        'type2': type_2,
        'typecolor1': typecolor1,
        'typecolor2': typecolor2,
        'shinyPic': shinyPic,
        'height': height,
        'weight': weight,
        'base_experience': experience,
        'hp': stat_hp,
        'attack': stat_attack,
        'defense': stat_defense,
        'speed': stat_speed,
        'specialattack': stat_specialattack,
        'specialdefense': stat_specialdefense
    }
    pokemonArray.push(data);
}

function loadBigPokemonCards(x) {
    document.getElementById(`bigCardWindow`).classList.remove('d-none');
    if (x == 1) {
        hideBigLeftCard(x);
    }
    if (x == pokemonArray.length) {
        hideBigRightCard(x);
    }
    if (x > 1 && x < pokemonArray.length) {
        loadAllCards(x);
    }
}

function hideBigLeftCard(x) {
    let main = document.getElementById(`bigCardMain`);
    let numberPokemonMiddle = x - 1;
    loadPokemonDetailsFromJSON(numberPokemonMiddle, main);
    let right = document.getElementById(`bigCardRight`);
    let numberPokemonRight = x;
    loadPokemonDetailsFromJSON(numberPokemonRight, right);
    document.getElementById('bigCardLeft').classList.add('d-none');
}

function hideBigRightCard(x) {
    let left = document.getElementById(`bigCardLeft`);
    let numberPokemonLeft = x - 2;
    loadPokemonDetailsFromJSON(numberPokemonLeft, left);
    let main = document.getElementById(`bigCardMain`);
    let numberPokemonMiddle = x - 1;
    loadPokemonDetailsFromJSON(numberPokemonMiddle, main);
    document.getElementById('bigCardRight').classList.add('d-none');
}

function loadAllCards(x) {
    document.getElementById('bigCardLeft').classList.remove('d-none');
    let left = document.getElementById(`bigCardLeft`);
    let numberPokemonLeft = x - 2;
    loadPokemonDetailsFromJSON(numberPokemonLeft, left);
    let main = document.getElementById(`bigCardMain`);
    let numberPokemonMiddle = x - 1;
    loadPokemonDetailsFromJSON(numberPokemonMiddle, main);
    document.getElementById('bigCardRight').classList.remove('d-none');
    let right = document.getElementById(`bigCardRight`);
    let numberPokemonRight = x;
    loadPokemonDetailsFromJSON(numberPokemonRight, right);
}

function loadPokemonDetailsFromJSON(number, position) {
    let pokemon = pokemonArray[number];
    let name = pokemon['name'];
    let index = pokemon['index'];
    let pic = pokemon['shinyPic'];
    let type1 = pokemon['type1'];
    let type2 = pokemon['type2'];
    let typecolor1 = pokemon['typecolor1'];
    let typecolor2 = pokemon['typecolor2'];
    showPokemonDetails(name, index, pic, type1, type2, typecolor1, typecolor2, number, position);
}

function showPokemonDetails(name, index, pic, type1, type2, typecolor1, typecolor2, number, position) {
    showLeftArrow(number);
    showRightArrow(number);
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
        <div class="pokemon-details">
            <div class="details-headlines">
                <h5 id="detailHeadline1${number}" class="links " onclick="showProportions(${number})">Proportions</h5>
                <h5 id="detailHeadline2${number}" class="links active" onclick="showStats(${number})">Stats</h5>
            </div>
            <div id="pokemonDetails${number}" class="details-content">
            </div>
        </div>
    </div>
    `;
    if (type2 == 0) {
        document.getElementById(`secondType${number}`).classList.add('d-none');
    }
    showProportions(number);
}

function showProportions(number) {
    let pokemon = pokemonArray[0];
    let height = pokemon['height'];
    height = height / 10;
    let weight = pokemon['weight'];
    weight = weight / 10;
    let experience = pokemon['base_experience'];
    let details = document.getElementById(`pokemonDetails${number}`);
    details.innerHTML =
        `
    <div class="progress-bar-container">
        <div class="progress-bar-box">
            <h6>Height</h6>
            <div class="percent">
                <svg>
                    <circle cx="45" cy="45" r="45"></circle>
                    <circle cx="45" cy="45" r="45" style="stroke: #18bd00; stroke-dashoffset: calc(440 - (283 * ${height}) / 10);"></circle>
                </svg>
                <div class="num">
                    <h7>${height}<span>m</span></h7>
                </div>
            </div>
        </div>
        <div class="progress-bar-box">
            <h6>Weight</h6>
            <div class="percent">
                <svg>
                    <circle cx="45" cy="45" r="45"></circle>
                    <circle cx="45" cy="45" r="45" style="stroke: #e79100; stroke-dashoffset: calc(440 - (283 * ${weight}) / 1000);"></circle>
                </svg>
                <div class="num">
                    <h7>${weight}<span>kg</span></h7>
                </div>
            </div>
        </div>
        <div class="progress-bar-box">
            <h6>Base Experience</h6>
            <div class="percent">
                <svg>
                    <circle cx="45" cy="45" r="45"></circle>
                    <circle cx="45" cy="45" r="45" style="stroke: #a91cc7; stroke-dashoffset: calc(440 - (283 * ${experience}) / 650);"></circle>
                </svg>
                <div class="num">
                    <h7>${experience}<span></span></h7>
                </div>
            </div>
        </div>
    </div>
    `;
    activeLink(number);
}

function showStats(number) {
    let pokemon = pokemonArray[number];
    let hp = pokemon['hp'];
    let attack = pokemon['attack'];
    let defense = pokemon['defense'];
    let speed = pokemon['speed'];
    let specialattack = pokemon['specialattack'];
    let specialdefense = pokemon['specialdefense'];
    let details = document.getElementById(`pokemonDetails${number}`);
    details.innerHTML =
        `
    <div class="progress-bar-container">
        <div class="progress-bar-box" style="height: 130px">
            <h6 class="text">HP</h6>
            <div class="percent" style="width: 78px; height: 130px">
                <svg>
                    <circle cx="35" cy="35" r="35"></circle>
                    <circle cx="35" cy="35" r="35" style="stroke: #0dd374; stroke-dashoffset: calc(440 - (220 * ${hp}) / 250);"></circle>
                </svg>
                <div class="num">
                    <h7 class="margin-extra" >${hp}<span></span></h7>
                </div>
            </div>
        </div>
        <div class="progress-bar-box" style="height: 130px">
            <h6 class="text">Attack</h6>
            <div class="percent" style="width: 78px; height: 130px">
                <svg>
                    <circle cx="35" cy="35" r="35"></circle>
                    <circle cx="35" cy="35" r="35" style="stroke: #f15d5d; stroke-dashoffset: calc(440 - (220 * ${attack}) / 210);"></circle>
                </svg>
                <div class="num">
                    <h7 class="margin-extra" >${attack}<span></span></h7>
                </div>
            </div>
        </div>
        <div class="progress-bar-box" style="height: 130px">
            <h6 class="text">Defense</h6>
            <div class="percent" style="width: 78px; height: 130px">
                <svg>
                    <circle cx="35" cy="35" r="35"></circle>
                    <circle cx="35" cy="35" r="35" style="stroke: #3ea4f5; stroke-dashoffset: calc(440 - (220 * ${defense}) / 230);"></circle>
                </svg>
                <div class="num">
                    <h7 class="margin-extra" >${defense}<span></span></h7>
                </div>
            </div>
        </div>
        <div class="progress-bar-box" style="height: 130px">
            <h6 class="text">Speed</h6>
            <div class="percent" style="width: 78px; height: 130px">
                <svg>
                    <circle cx="35" cy="35" r="35"></circle>
                    <circle cx="35" cy="35" r="35" style="stroke: #ffcf32; stroke-dashoffset: calc(440 - (220 * ${speed}) / 210);"></circle>
                </svg>
                <div class="num">
                    <h7 class="margin-extra" >${speed}<span></span></h7>
                </div>
            </div>
        </div>
        <div class="progress-bar-box" style="height: 130px">
            <h6 class="text">Special Attack</h6>
            <div class="percent" style="width: 78px; height: 130px">
                <svg>
                    <circle cx="35" cy="35" r="35"></circle>
                    <circle cx="35" cy="35" r="35" style="stroke: #d50000; stroke-dashoffset: calc(440 - (220 * ${specialattack}) / 210);"></circle>
                </svg>
                <div class="num">
                    <h7 class="margin-extra" >${specialattack}<span></span></h7>
                </div>
            </div>
        </div>
        <div class="progress-bar-box" style="height: 130px">
            <h6 class="text">Special Defense</h6>
            <div class="percent" style="width: 78px; height: 130px">
                <svg>
                    <circle cx="35" cy="35" r="35"></circle>
                    <circle cx="35" cy="35" r="35" style="stroke: #0539e5; stroke-dashoffset: calc(440 - (220 * ${specialdefense}) / 230);"></circle>
                </svg>
                <div class="num">
                    <h7 class="margin-extra" >${specialdefense}<span></span></h7>
                </div>
            </div>
        </div>
    </div>
    `;
    activeLink(number);
}

function showLeftArrow(x) {
    document.getElementById('arrowLeftBox').innerHTML =
        `
    <img src="./img/icons/arrow_left.png" class="arrow" onclick="stopProp(); previousPokemon(${x})">
    `;
}

function showRightArrow(x) {
    document.getElementById('arrowRightBox').innerHTML =
        `
    <img src="./img/icons/arrow_right.png" class="arrow" onclick="stopProp(); nextPokemon(${x})">
    `;
}

function hideBigPokemonCard() {
    document.getElementById(`bigCardWindow`).classList.add('d-none');
}

function previousPokemon(x) {
    if (x + 1 == pokemonArray.length) {
        loadBigPokemonCards(x);
        x = x - 1;
        showLeftArrow(x);
    }
    else {
        x = x - 1;
        loadBigPokemonCards(x);
    }
}

function nextPokemon(x) {
    x = x + 1;
    loadBigPokemonCards(x);
}

function stopProp() {
    event.stopPropagation();
}

function activeLink(number) {
    let x = document.getElementById(`detailHeadline1${number}`).classList.contains('active');
    if (x) {
        document.getElementById(`detailHeadline1${number}`).classList.remove('active');
        document.getElementById(`detailHeadline2${number}`).classList.add('active');
    }
    else {
        document.getElementById(`detailHeadline2${number}`).classList.remove('active');
        document.getElementById(`detailHeadline1${number}`).classList.add('active');
    }
}