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