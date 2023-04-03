function showProportions(number) {
    let pokemon = pokemonArray[number];
    let height = pokemon['height'];
    height = height / 10;
    let weight = pokemon['weight'];
    weight = weight / 10;
    let experience = pokemon['base_experience'];
    let details = document.getElementById(`pokemonDetails${number}`);
    // details.innerHTML = '';
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