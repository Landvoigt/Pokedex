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
    <img src="./img/background/pokeball_bg_grey_3.png" class="big-card-bg">
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
                <h5 id="detailHeadline1${number}" class="links" onclick="showProportions(${number})">Proportions</h5>
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

function showLeftArrow(x) {
    x = x + 1;
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

function previousPokemon(x) {   ///not good enough
    if (x + 1 == pokemonArray.length) {
        x = x - 1;
        loadBigPokemonCards(x);
    }
    if (x == pokemonArray.length) {
        x = x - 2;
        loadBigPokemonCards(x);
    }
    if (x < pokemonArray.length) {
        x = x - 2;
        loadBigPokemonCards(x);
    }
}

function nextPokemon(x) {
    x = x + 1;
    loadBigPokemonCards(x);
}