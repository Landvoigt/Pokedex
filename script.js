let currentPokemon;

async function loadPokedex() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log(currentPokemon);
    renderPokedex();
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
    setTimeout(deleteFrontPage, 2500);
}

function renderPokedex() {

}

function deleteFrontPage() {
    let top = document.getElementById('frontPageTop');
    let bottom = document.getElementById('frontPageBottom');
    top.classList.add('d-none');
    bottom.classList.add('d-none');
}