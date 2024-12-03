let modalWindow = document.querySelector('.modal-window');
let closeButton = document.querySelector(".modal-window_close");
let tabsContainer = document.querySelector('.tabs_container');
let tab = document.querySelectorAll(".tab");

let currentTab = 'All';


async function getGiftsData() {
    const response = await fetch('../christmas-shop/assets/data.json');
    const data = await response.json();
    return data;
}

async function getRandomGifts(number) {
    const datagifts = await getGiftsData();
    let randomGiftList = [];
    while (randomGiftList.length != number) {
        let randomIndex = Math.floor(Math.random() * datagifts.length);
        let randomGift = datagifts[randomIndex];
        if ((!randomGiftList.some(gift => gift.name === randomGift.name))) {
            randomGiftList.push(randomGift);
        }
    }
    return randomGiftList;
}

async function getGiftsByCategory(category) {
    const datagifts = await getGiftsData();
    return datagifts.filter(gift => gift.category === category);
}

function createCard(gift) {
    let card = document.createElement('div');
    card.className = 'card_container';
    let category = getClassNameCategory(gift);

    card.innerHTML = `
        <div class="card_img_container"><img src="./assets/img/${category}_ball.png" alt="ball"></div>
                                <div class="card_desc_container">
                                    <div class="card_desc_content">
                                        <div class="ball_propose ${category}">
                                            <h4>${gift.category}</h4>
                                        </div>
                                        <div class="ball_name">
                                            <h3>${gift.name}</h3>
                                        </div>
                                    </div>
                                </div>
    `;

    card.onclick = async function () {
        let giftname = card.querySelector(".ball_name").textContent.trim();
        let data = await getGiftsData();
        let gift = data.find(g => g.name === giftname);
        openModal(gift);
    };

    return card;
}

function openModal(gift) {
    fillModal(gift);
    body.classList.toggle('clicked');
    modalWindow.classList.add('clicked');
}

closeButton.onclick = function (e) {
    closeWindow();
}
function closeWindow(e) {
    body.classList.remove('clicked');
    modalWindow.classList.remove('clicked');
}
modalWindow.onclick = function (e) {
    if (!e.target.closest('.modal-window_content')) { closeWindow(); }
}

function fillModal(gift) {
    let category = getClassNameCategory(gift);
    let ballCategory =  document.querySelector('.modal-window_ball_category');

    document.querySelector('.modal-window-photo').src = `./assets/img/${category}_ball.png`;
    document.querySelector('.modal-window_ball_category').textContent = gift.category;

    ballCategory.className = 'modal-window_ball_category ball_propose';
    ballCategory.classList.add(category);

    document.querySelector('.modal-window_ball_name').textContent = gift.name;
    document.querySelector('.modal-window_description').textContent = gift.description;
    document.querySelector('.live-power').textContent = gift.superpowers.live;
    document.querySelector('.create-power').textContent = gift.superpowers.create;
    document.querySelector('.love-power').textContent = gift.superpowers.love;
    document.querySelector('.dream-power').textContent = gift.superpowers.dream;
    drawSnowFlakes(gift);
}

function getClassNameCategory(gift) {
    return gift.category.slice(4).toLowerCase();
}

async function drawCards() {
    let homeGiftsContainer = document.querySelector('.gifts_container.home');
    let giftsGiftsContainer = document.querySelector('.gifts_container.gifts');

    const [homeGiftsList, giftsGiftsList] = await Promise.all([
        homeGiftsContainer ? getRandomGifts(4) : Promise.resolve([]),

        currentTab === 'All'
            ? (giftsGiftsContainer ? getRandomGifts(36) : Promise.resolve([]))
            : (giftsGiftsContainer ? getGiftsByCategory(currentTab) : Promise.resolve([]))
    ]);

    const appendGiftsToContainer = (container, gifts) => {
        container.innerHTML = '';
        gifts.forEach(gift => {
            const card = createCard(gift);
            container.append(card);
        });
    };

    if (homeGiftsContainer) {
        appendGiftsToContainer(homeGiftsContainer, homeGiftsList);
    }

    if (giftsGiftsContainer) {
        appendGiftsToContainer(giftsGiftsContainer, giftsGiftsList);
    }
}

function countActiveSnowflakes(gift) {
    let livePower = parseInt(gift.superpowers.live.slice(1, 2));
    let lovePower = parseInt(gift.superpowers.love.slice(1, 2));
    let createPower = parseInt(gift.superpowers.create.slice(1, 2));
    let dreamPower = parseInt(gift.superpowers.dream.slice(1, 2));

    return { livePower, lovePower, createPower, dreamPower }
}

function drawSnowFlakes(gift) {
    const { livePower, lovePower, createPower, dreamPower } = countActiveSnowflakes(gift);
    const imageURLActive = './assets/img/active.png';
    const imageURLInactive = './assets/img/inactive.png';
    let liveContainer = document.querySelector('.snowflakes_container.live');
    let loveContainer = document.querySelector('.snowflakes_container.love');
    let createContainer = document.querySelector('.snowflakes_container.create');
    let dreamContainer = document.querySelector('.snowflakes_container.dream');

    function drawSnowflakesInContainer(container, power) {
        container.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const img = document.createElement('img');
            img.src = i < power ? imageURLActive : imageURLInactive;
            img.alt = 'Snowflake';
            container.append(img);
        }
    }

    drawSnowflakesInContainer(liveContainer, livePower);
    drawSnowflakesInContainer(loveContainer, lovePower);
    drawSnowflakesInContainer(createContainer, createPower);
    drawSnowflakesInContainer(dreamContainer, dreamPower);
}

if (tabsContainer) {
    tabsContainer.onclick = function (e) {
        const clickedTab = e.target.closest('.tab');
        if (!clickedTab) return;
        if (clickedTab.textContent.trim() === currentTab) return;


        const activeTab = tabsContainer.querySelector('.active');
        if (activeTab) {
            activeTab.classList.remove('active');
        }

        clickedTab.classList.add('active');
        currentTab = clickedTab.textContent.trim();
        drawCards();
    };
}




drawCards();