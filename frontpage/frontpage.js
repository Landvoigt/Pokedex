function showStartButton() {
    let loading = document.getElementById('loadingSymbol');
    loading.classList.add('d-none');
    let btn = document.getElementById('startButton');
    btn.classList.remove('d-none');
}

function showStartAnimation() {
    AUDIO_FRONTPAGE.play();
    let top = document.getElementById('frontPageTop');
    let bottom = document.getElementById('frontPageBottom');
    let topMobile = document.getElementById('frontPageUndergroundMobileTop');
    let bottomMobile = document.getElementById('frontPageUndergroundMobileBottom');
    top.classList.add('animation-go-up');
    topMobile.classList.add('animation-go-up');
    bottom.classList.add('animation-go-down');
    bottomMobile.classList.add('animation-go-down-mobile');
    setTimeout(deleteFrontPage, 3500);
}

function deleteFrontPage() {
    let top = document.getElementById('frontPageTop');
    let bottom = document.getElementById('frontPageBottom');
    let topMobile = document.getElementById('frontPageUndergroundMobileTop');
    let bottomMobile = document.getElementById('frontPageUndergroundMobileBottom');
    top.classList.add('d-none');
    topMobile.classList.add('d-none');
    bottom.classList.add('d-none');
    bottomMobile.classList.add('d-none');
    document.getElementById('body').classList.remove('overflow');
}