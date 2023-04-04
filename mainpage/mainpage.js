function calculateIndexNumber(name, pic, type_1, type_2, typecolor1, typecolor2, x) {
    let index = pokemon['id'];
    if (index < 10) {
        index = '00' + index;
    }
    if (index > 9 && index < 100) {
        index = '0' + index;
    }
    pushPokemonDetailsInJSON(name, index, pic, type_1, type_2, typecolor1, typecolor2, x);
}

function pushPokemonDetailsInJSON(name, index, pic, type_1, type_2, typecolor1, typecolor2, x) {
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
    let data = {
        // 'url': `https://pokeapi.co/api/v2/pokemon/${x}`,
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

function loadPokemonData(pokemonsLoaded, pokemonsToLoad) {
    for (let x = pokemonsLoaded; x < pokemonsToLoad; x++) {
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
    }
    let loadPokemonButton = document.getElementById('mainContent');
    loadPokemonButton.innerHTML += `
        <button class="load-more-pokemon-button" onclick="loadFiftyMorePokemon()">load next 50 Pokemon</button>
        `;
}

function renderPokemonWithOneType(name, index, pic, type_1, typecolor_1, x) {
    let card = document.getElementById('mainContent');
    card.innerHTML += `
        <div class="poke-card" onclick="loadBigPokemonCards(${x})">
            <img src="${pic}" class="small-pokemon-img">
            <div class="card-bg-one-type" style="background-color: ${typecolor_1}"></div>
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
}

function renderPokemonWithTwoTypes(name, index, pic, type_1, type_2, typecolor_1, typecolor_2, x) {
    let card = document.getElementById('mainContent');
    card.innerHTML += `
        <div class="poke-card" onclick="loadBigPokemonCards(${x})">
            <img src="${pic}" class="small-pokemon-img">
            <div class="card-bg-left" style="background-color: ${typecolor_1}"></div>
            <div class="card-bg-right" style="background-color: ${typecolor_2}"></div>
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
