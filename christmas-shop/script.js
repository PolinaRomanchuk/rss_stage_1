let giftsContainer = document.querySelector('.gifts_container');



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
        let giftname = card.querySelector(".ball_name").textContent;
        let data = await getGiftsData();
        let gift = data.find(g => g.name === giftname);
        openModal(gift);
    };

    return card;
}

function getClassNameCategory(gift) {
    return gift.category.slice(4).toLowerCase();
}

async function drawCards() {
    const giftsList = await getRandomGifts(4);
    giftsContainer.innerHTML = '';
    giftsList.forEach(gift => {
        let card = createCard(gift);
        giftsContainer.append(card);
    });
}

drawCards();