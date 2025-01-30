let body = document.body;
let systemStyle = "light";

let gameOver = false;
let isResultsVisible = false;
let currentLevel = "Easy";
let nameGamePicture = "cat";
let gameSize = 5;
let gamePicture = [
  [0, 0, 1, 0, 1],
  [0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1],
];
let matrixs = {
  cat: [
    [0, 0, 1, 0, 1],
    [0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
  ],
  dinosaur: [
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 0, 1, 0],
  ],
  watch: [
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  rabbit: [
    [0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1],
  ],
  fountain: [
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
  ],
};

let userClicks = Array(gameSize)
  .fill()
  .map(() => Array(gameSize).fill(0));

let seconds = 0;
let minutes = 0;
let timerInterval;

const easyPictures = {
  cat: [
    [0, 0, 1, 0, 1],
    [0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
  ],
  dinosaur: [
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 0, 1, 0],
  ],
  watch: [
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  rabbit: [
    [0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1],
  ],
  fountain: [
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
  ],
};

const mediumPictures = {
  rhinoceros: [
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  ],
  mashroom: [
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 1, 1, 0],
    [1, 0, 1, 1, 0, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  ],
  worm: [
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
  ],
  beer: [
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 1, 0, 0, 1, 1, 1, 1],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  ],
  helicopter: [
    [1, 1, 1, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  ],
};
const hardPictures = {
  snail: [
    [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
  ],
  man: [
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0],
    [1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1],
    [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0],
    [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0],
    [1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
  ],
  elk: [
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1],
    [0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  ],
  octopus: [
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1],
    [1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0],
  ],
  unicorn: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  ],
};

function createElement(tagName, className, context) {
  let element = document.createElement(tagName);
  if (className) {
    element.classList.add(className);
  }
  if (context !== undefined && context !== null) {
    element.textContent = context;
  }
  return element;
}

function createBackground() {
  let backgraund = createElement("video", "video-background");
  backgraund.autoplay = true;
  backgraund.loop = true;
  backgraund.muted = true;
  return backgraund;
}

function createManageHeader() {
  let container = createElement("div", "manage-header-container");
  let timer = createElement("div", "timer");
  let minutes = createElement("div", "minutes", "00:");
  let seconds = createElement("div", "seconds", "00");

  timer.append(minutes);
  timer.append(seconds);
  let iconsContainer = createElement("div", "icons-container");
  let light = createElement("button", "light-btn");
  light.classList.add("icon-btn");
  light.classList.add("on");

  light.addEventListener("click", () => {
    systemStyle === "light" ? setSystemStyle("dark") : setSystemStyle("light");
  });

  let statistic = createElement("button", "statistic-btn");
  statistic.classList.add("icon-btn");
  statistic.addEventListener("click", () => {
    displayWinGames();
  });

  iconsContainer.append(light);
  iconsContainer.append(statistic);
  container.append(timer);
  container.append(iconsContainer);
  return container;
}

function createRadioOption(id, name, value, labelText, isChecked) {
  let levelOption = createElement("div", "level-option");
  let radioInput = document.createElement("input");
  radioInput.type = "radio";
  radioInput.id = id;
  radioInput.name = name;
  radioInput.value = value;
  if (isChecked) {
    radioInput.checked = true;
  }
  let label = createElement("label", "level-label", labelText);
  label.htmlFor = id;
  levelOption.append(radioInput);
  levelOption.append(label);

  radioInput.addEventListener("change", (event) => {
    currentLevel = event.target.value;
    getGameSize();
    updateGamePictures(matrixs);
    updateGameField();
    updateGameStyles();
    resetGame();
  });

  return levelOption;
}

function updateGameSize(namekey) {
  if (currentLevel === "Easy") {
    gameSize = 5;
    matrixs = easyPictures;
  } else if (currentLevel === "Medium") {
    gameSize = 10;
    matrixs = mediumPictures;
  } else if (currentLevel === "Hard") {
    gameSize = 15;
    matrixs = hardPictures;
  }
}

function getGameSize() {
  if (currentLevel === "Easy") {
    gameSize = 5;
    matrixs = easyPictures;
    gamePicture = easyPictures.cat;
  } else if (currentLevel === "Medium") {
    gameSize = 10;
    matrixs = mediumPictures;
    gamePicture = mediumPictures.rhinoceros;
  } else if (currentLevel === "Hard") {
    gameSize = 15;
    matrixs = hardPictures;
    gamePicture = hardPictures.snail;
  }
}

function createLevelBox() {
  let levelContainer = createElement("div", "level-options-list");
  let easyOption = createRadioOption(
    "easy",
    "difficulty",
    "Easy",
    "Easy",
    true
  );
  let mediumOption = createRadioOption(
    "medium",
    "difficulty",
    "Medium",
    "Medium",
    false
  );
  let hardOption = createRadioOption(
    "hard",
    "difficulty",
    "Hard",
    "Hard",
    false
  );

  levelContainer.append(easyOption);
  levelContainer.append(mediumOption);
  levelContainer.append(hardOption);
  return levelContainer;
}

function createGamePictures() {
  let container = createElement("button", "dropdown-btn");
  container.classList.add("text-btn");

  let displayText = createElement("span", "button-text-span", "сat");
  container.append(displayText);

  let dropContainer = createElement("ul", "dropdown-content");

  Object.keys(matrixs).forEach((key) => {
    let dropItem = createElement("li", "dropdown-item", key);
    dropContainer.append(dropItem);

    dropItem.addEventListener("click", (event) => {
      event.stopPropagation();
      displayText.textContent = dropItem.textContent;
      dropContainer.classList.remove("show");
      nameGamePicture = dropItem.textContent;
      gamePicture = findPicture(currentLevel, nameGamePicture);

      updateHints();
      resetGame();
    });
  });

  container.append(dropContainer);

  container.addEventListener("click", () => {
    dropContainer.classList.toggle("show");
  });

  return container;
}

function updateGamePictures(matrixs, btnName) {
  let btnText = document.querySelector(".button-text-span");
  let items = document.querySelectorAll(".dropdown-item");

  items.forEach((item, index) => {
    if (index < Object.keys(matrixs).length) {
      item.textContent = Object.keys(matrixs)[index];
    }
  });
  let defaultName = Object.keys(matrixs)[0];
  btnText.textContent = btnName ? btnName : defaultName;
  nameGamePicture = defaultName;
}

function updateHints() {
  let horHints = document.querySelectorAll(".horisontal-hint");
  let vertHints = document.querySelectorAll(".vertical-hint");

  const horisontal = countHorisontalHints();
  const vertical = countVerticalHints();

  for (let i = 0; i < horHints.length; i++) {
    let hintText = horisontal[i].join(" ");
    horHints[i].textContent = hintText;
  }

  for (let i = 0; i < vertHints.length; i++) {
    let hintContainer = vertHints[i];
    let hintColumns = hintContainer.querySelectorAll(".vertical-hint-text");
    hintColumns.forEach((text) => text.remove());

    for (let j = 0; j < vertical[i].length; j++) {
      let hintColumn = createElement(
        "div",
        "vertical-hint-text",
        `${vertical[i][j]}`
      );
      vertHints[i].appendChild(hintColumn);
    }
  }
}

function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return randomIndex;
}

function createLevelField() {
  let container = createElement("div", "level-container");
  let levelBlock = createLevelBox();

  let btnContainer = createElement("div", "btn-container");
  let dropPicture = createGamePictures();
  let randomGameBtn = createElement("button", "random-game-btn", "Random game");
  randomGameBtn.classList.add("text-btn");

  randomGameBtn.addEventListener("click", () => {
    let textBtn = document.querySelector(".button-text-span");
    textBtn.textContent = "";
    const levels = [easyPictures, mediumPictures, hardPictures];
    const randomLevelIndex = getRandomElement(levels);

    const levelsMap = {
      Easy: easyPictures,
      Medium: mediumPictures,
      Hard: hardPictures,
    };
    let currentLevelString;
    for (let level in levelsMap) {
      if (levelsMap[level] === levels[randomLevelIndex]) {
        currentLevelString = level;
        break;
      }
    }

    currentLevel = currentLevelString;

    const pictures = Object.entries(levels[randomLevelIndex]);
    const randomPictureIndex = getRandomElement(pictures);
    const [pictureKey, newPicture] = pictures[randomPictureIndex];

    gamePicture = newPicture;
    textBtn.textContent = pictureKey;

    updateGameSize();
    updateGameField();
    updateGameStyles();
    resetGame();
    updateGamePictures(matrixs, pictureKey);
    getLevelBtnAndShowIt(currentLevel);
  });

  container.append(levelBlock);

  btnContainer.append(dropPicture);
  btnContainer.append(randomGameBtn);

  container.append(levelBlock);
  container.append(btnContainer);

  return container;
}

function getLevelBtnAndShowIt(level) {
  const radioButtons = document.querySelectorAll('input[name="difficulty"]');
  radioButtons.forEach((radioButton) => {
    if (radioButton.value === level) {
      radioButton.checked = true;
    }
  });
}

function createGameCells() {
  let cells = createElement("div", "game-grid-cells");
  for (let i = 0; i < gameSize * gameSize; i++) {
    let cell = createElement("div", "game-grid-cell");
    cell.addEventListener("click", () => {
      if (gameOver) return;
      startTimer();
      let row = Math.floor(i / gameSize);
      let col = i % gameSize;
      if (userClicks[row][col] === 1) {
        cell.classList.add("clicked");
      }

      userClicks[row][col] = userClicks[row][col] === 1 ? 0 : 1;
      if (cell.classList.contains("right-clicked")) {
        cell.classList.remove("right-clicked");
        cell.classList.remove("clicked");
        userClicks[row][col] = userClicks[row][col] = 0;
      } else {
        cell.classList.toggle("clicked");
      }
      console.log(userClicks);

      let sound = new Audio("./assets/audio/click.mp3");
      sound.play();
      checkResult();
    });
    cell.addEventListener("contextmenu", (event) => {
      if (gameOver) return;
      let row = Math.floor(i / gameSize);
      let col = i % gameSize;
      userClicks[row][col] = userClicks[row][col] = 0;
      console.log(userClicks);

      event.preventDefault();
      cell.classList.toggle("right-clicked");
      cell.classList.remove("clicked");
      let sound = new Audio("./assets/audio/click.mp3");
      sound.play();
    });

    cells.appendChild(cell);
  }

  return cells;
}

function createHints(className) {
  if (className == "horisontal-hint") {
    const horisontal = countHorisontalHints();
    let hints = createElement("div", `${className}s`);

    for (let i = 0; i < horisontal.length; i++) {
      let hintText = horisontal[i].join(" ");
      let hint = createElement("div", `${className}`, `${hintText}`);
      hints.appendChild(hint);
    }

    return hints;
  } else {
    const vertical = countVerticalHints();
    let hints = createElement("div", `${className}s`);

    for (let i = 0; i < vertical.length; i++) {
      let hint = createElement("div", `${className}`);
      for (let j = 0; j < vertical[i].length; j++) {
        let hintColumn = createElement(
          "div",
          `${className}-text`,
          `${vertical[i][j]}`
        );
        hint.appendChild(hintColumn);
      }
      hints.appendChild(hint);
    }
    return hints;
  }
}

function createGameField() {
  let content = document.querySelector(".game-container");
  if (content) {
    content.innerHTML = "";
  }
  let container = createElement("div", "game-container");
  let gridContainer = createElement("div", "game-grid-container");
  let horisHints = createHints("horisontal-hint");
  let verticHints = createHints("vertical-hint");
  let cells = createGameCells();
  gridContainer.append(horisHints);
  gridContainer.append(cells);
  gridContainer.append(verticHints);
  container.append(gridContainer);
  return container;
}

function updateGameField() {
  let content = document.querySelector(".game-container");
  if (content) {
    content.innerHTML = "";
  }
  let gridContainer = createElement("div", "game-grid-container");
  let horisHints = createHints("horisontal-hint");
  let verticHints = createHints("vertical-hint");
  let cells = createGameCells();

  gridContainer.append(horisHints);
  gridContainer.append(cells);
  gridContainer.append(verticHints);
  content.append(gridContainer);
}

function createSettingGameInFooter() {
  let container = createElement("div", "footer-game-setting-container");
  let settingIcon = createElement("button", "setting-btn");
  settingIcon.classList.add("icon-btn");

  let solutionBtn = createElement("button", "solution-btn", "Solution");
  solutionBtn.classList.add("text-btn");

  solutionBtn.addEventListener("click", () => showPicture());

  let hiddenBtnContainer = createElement("div", "hidden-btn-container");
  let resetBtn = createElement("button", "reset-btn", "Reset game");
  resetBtn.classList.add("text-btn");
  settingIcon.addEventListener("click", () => {
    hiddenBtnContainer.classList.toggle("hidden");
  });
  resetBtn.addEventListener("click", () => {
    resetGame();
  });

  let saveBtn = createElement("button", "save-btn", "Save game");
  saveBtn.classList.add("text-btn");
  let continueBtn = createElement(
    "button",
    "continue-btn",
    "Continue last game"
  );

  saveBtn.addEventListener("click", () => {
    saveGame();
  });

  continueBtn.addEventListener("click", () => {
    loadGame();
  });

  continueBtn.classList.add("text-btn");
  let settingContainer = createElement("div", "setting-container", "");
  hiddenBtnContainer.append(resetBtn);
  hiddenBtnContainer.append(saveBtn);
  hiddenBtnContainer.append(continueBtn);

  container.append(solutionBtn);
  settingContainer.append(settingIcon);
  settingContainer.append(hiddenBtnContainer);
  container.append(settingContainer);
  return container;
}

function createGameWindow() {
  let gameWindow = createElement("div", "game-window");
  let header = createManageHeader();
  let level = createLevelField();
  let game = createGameField();
  let footer = createSettingGameInFooter();

  gameWindow.append(header);
  gameWindow.append(level);
  gameWindow.append(game);
  gameWindow.append(footer);

  return gameWindow;
}

function createStartWindow() {
  let backgraund = createBackground();
  let gameWindow = createGameWindow();
  body.append(backgraund);
  body.append(gameWindow);
  setSystemStyle(systemStyle);
}

createStartWindow();

function showPicture() {
  let cells = document.querySelectorAll(".game-grid-cell");

  for (let i = 0; i < gamePicture.length; i++) {
    for (let j = 0; j < gamePicture[i].length; j++) {
      let cell = cells[i * gameSize + j];
      if (gamePicture[i][j] === 1) {
        cell.classList.add("clicked");
      } else {
        cell.classList.remove("clicked");
      }
    }
  }
}

function countHorisontalHints() {
  let allHints = [];
  for (let i = 0; i < gamePicture.length; i++) {
    let count = 0;
    let hints = [];
    for (let j = 0; j < gamePicture[i].length; j++) {
      if (gamePicture[i][j] === 1) {
        count += 1;
      } else if (count > 0) {
        hints.push(count);
        count = 0;
      }
    }
    if (count > 0) {
      hints.push(count);
    }
    if (hints.length === 0) {
      hints.push(0);
    }
    allHints.push(hints);
  }
  console.log(allHints);
  return allHints;
}

function countVerticalHints() {
  let allHints = [];
  for (let col = 0; col < gamePicture[0].length; col++) {
    let count = 0;
    let hints = [];
    for (let row = 0; row < gamePicture.length; row++) {
      if (gamePicture[row][col] === 1) {
        count += 1;
      } else if (count > 0) {
        hints.push(count);
        count = 0;
      }
    }
    if (count > 0) {
      hints.push(count);
    }
    if (hints.length === 0) {
      hints.push(0);
    }
    allHints.push(hints);
  }
  console.log(allHints);
  return allHints;
}

function checkResult() {
  let isCorrect = true;

  for (let i = 0; i < gamePicture.length; i++) {
    for (let j = 0; j < gamePicture[i].length; j++) {
      if (userClicks[i][j] !== gamePicture[i][j]) {
        isCorrect = false;
        break;
      }
    }
    if (!isCorrect) break;
  }

  if (isCorrect) {
    win();
  }
}

function win() {
  gameOver = true;
  stopTimer();
  const minutesElement = document.querySelector(".minutes");
  const secondsElement = document.querySelector(".seconds");

  let winWindow = createElement("div", "win-window");
  let close = createElement("button", "close-btn");
  let closeContainer = createElement("div", "close-btn-container");

  close.classList.add("icon-btn");
  let text = createElement(
    "div",
    "win-text",
    `Great! You have solved the nonogram  in ${minutesElement.textContent}${secondsElement.textContent} seconds!`
  );
  let gifContainer = createElement("div", "gif-win-container");

  let gif = createElement("div", "gif-win");

  gifContainer.append(gif);

  closeContainer.append(close);
  winWindow.append(closeContainer);
  winWindow.append(text);
  winWindow.append(gifContainer);

  close.addEventListener("click", () => {
    winWindow.classList.toggle("hidden");
  });

  body.append(winWindow);
  let sound = new Audio("./assets/audio/win.mp3");
  sound.play();
  saveWinGames();
}

function startTimer() {
  if (timerInterval) return;
  const minutesElement = document.querySelector(".minutes");
  const secondsElement = document.querySelector(".seconds");

  timerInterval = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    minutesElement.textContent = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
    secondsElement.textContent = seconds < 10 ? `0${seconds}` : `${seconds}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  minutes = 0;
  seconds = 0;

  const minutesElement = document.querySelector(".minutes");
  const secondsElement = document.querySelector(".seconds");

  minutesElement.textContent = "00:";
  secondsElement.textContent = "00";
}

function resetGame() {
  gameOver = false;
  resetTimer();
  let cell = document.querySelectorAll(".game-grid-cell");
  cell.forEach((element) => element.classList.remove("clicked"));
  cell.forEach((element) => element.classList.remove("right-clicked"));

  userClicks = Array(gameSize)
    .fill()
    .map(() => Array(gameSize).fill(0));
}

function findPicture(level, name) {
  const levels = {
    Easy: easyPictures,
    Medium: mediumPictures,
    Hard: hardPictures,
  };
  return levels[level][name];
}

function updateGameStyles() {
  if (currentLevel === "Easy") {
    gameSize = 5;
  } else if (currentLevel === "Medium") {
    gameSize = 10;
  } else if (currentLevel === "Hard") {
    gameSize = 15;
  }
  let window = document.querySelector(".game-window");
  let gameContainer = document.querySelector(".game-container");

  let cells = document.querySelector(".game-grid-cells");
  let verHints = document.querySelector(".vertical-hints");
  let horHints = document.querySelector(".horisontal-hints");

  cells.style.gridTemplateColumns = `repeat(${gameSize}, 40px)`;
  cells.style.gridTemplateRows = `repeat(${gameSize}, 40px)`;

  verHints.style.gridTemplateColumns = `repeat(${gameSize}, 40px)`;

  horHints.style.gridTemplateRows = `repeat(${gameSize}, 40px)`;

  if (currentLevel === "Medium") {
    window.style.height = `840px`;
    window.style.width = `800px`;
    gameContainer.style.height = `67%`;
    verHints.style.height = `120px`;
  }

  if (currentLevel === "Hard") {
    window.style.height = `840px`;
    window.style.width = `800px`;
    gameContainer.style.height = `67%`;
    verHints.style.height = `140px`;
    horHints.style.width = `90px`;

    cells.style.gridTemplateColumns = `repeat(${gameSize}, 20px)`;
    cells.style.gridTemplateRows = `repeat(${gameSize}, 20px)`;

    verHints.style.gridTemplateColumns = `repeat(${gameSize}, 20px)`;

    horHints.style.gridTemplateRows = `repeat(${gameSize}, 20px)`;
  }
  setGameColors(systemStyle);
}

function setSystemStyle(style) {
  systemStyle = style;

  let background = document.querySelector(".video-background");
  let window = document.querySelector(".game-window");

  let textBtns = document.querySelectorAll(".text-btn");
  let iconBtns = document.querySelectorAll(".icon-btn");
  let levels = document.querySelectorAll(".level-label ");

  let styleBtn = document.querySelector(".light-btn");
  let settingBtn = document.querySelector(".setting-btn");
  let statisticsBtn = document.querySelector(".statistic-btn");

  let horisontalHints = document.querySelectorAll(".horisontal-hint");
  let verticalHints = document.querySelectorAll(".vertical-hint");
  let cells = document.querySelectorAll(".game-grid-cell");

  let dropItems = document.querySelectorAll(".dropdown-item");
  let cross = document.querySelector(".right-clicked");

  background.src = `./assets/img/${systemStyle}/background.mp4`;
  styleBtn.style.backgroundImage = `url(./assets/img/${systemStyle}/styleIcon.png)`;
  statisticsBtn.style.backgroundImage = `url(./assets/img/${systemStyle}/statisticsIcon.png)`;
  settingBtn.style.backgroundImage = `url(./assets/img/${systemStyle}/settingsIcon.png)`;

  textBtns.forEach((btn) => {
    btn.style.backgroundColor = `var(--color-btn-background-inactive-${systemStyle})`;
  });
  levels.forEach((btn) => {
    btn.style.backgroundColor = `var(--color-btn-background-inactive-${systemStyle})`;
  });

  window.style.backgroundColor = `var(--color-background-game-window-${systemStyle})`;
  document.documentElement.style.setProperty(
    "color",
    `var(--color-font-main-${systemStyle})`
  );

  setGameColors(style);

  dropItems.forEach((item) => {
    item.style.backgroundColor = `var(--color-btn-background-inactive-${systemStyle})`;
  });

  let close = document.querySelector(".close-btn");
  if (close) {
    close.style.backgroundImage = `url(./assets/img/${systemStyle}/cross.png)`;
  }
}

function setGameColors(style) {
  let horisontalHints = document.querySelectorAll(".horisontal-hint");
  let verticalHints = document.querySelectorAll(".vertical-hint");
  let cells = document.querySelectorAll(".game-grid-cell");

  [horisontalHints, verticalHints, cells].forEach((elements) => {
    elements.forEach((element) => {
      element.style.backgroundColor = `var(--color-game-notclicked-${style})`;
      element.style.borderColor = `var(--color-game-border-${style})`;
    });
  });
}

function saveGame() {
  if (gameOver) return;
  const gameState = {
    userClicks: userClicks,
    minutes: minutes,
    seconds: seconds,
    currentLevel: currentLevel,
    nameGamePicture: nameGamePicture,
    gamePicture: gamePicture,
    systemStyle: systemStyle,
    gameSize: gameSize,
  };

  localStorage.setItem("gameState", JSON.stringify(gameState));
}

function loadGame() {
  gameOver = false;
  const gameState = JSON.parse(localStorage.getItem("gameState"));

  if (gameState) {
    userClicks = gameState.userClicks;
    minutes = gameState.minutes;
    seconds = gameState.seconds;
    currentLevel = gameState.currentLevel;
    nameGamePicture = gameState.nameGamePicture;
    gamePicture = gameState.gamePicture;
    systemStyle = gameState.systemStyle;
    gameSize = gameState.gameSize;

    setSystemStyle(systemStyle);
    updateGameSize(currentLevel);
    updateGameField();
    updateGameStyles();
    getLevelBtnAndShowIt(currentLevel);

    let btnText = document.querySelector(".button-text-span");
    btnText.textContent = nameGamePicture;

    const minutesElement = document.querySelector(".minutes");
    const secondsElement = document.querySelector(".seconds");
    minutesElement.textContent = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
    secondsElement.textContent = seconds < 10 ? `0${seconds}` : `${seconds}`;

    let cells = document.querySelectorAll(".game-grid-cell");
    for (let i = 0; i < gameSize * gameSize; i++) {
      let row = Math.floor(i / gameSize);
      let col = i % gameSize;
      if (userClicks[row][col] === 1) {
        cells[i].classList.add("clicked");
      } else {
        cells[i].classList.remove("clicked");
      }
    }
  }
}

function saveWinGames() {
  let allResults = JSON.parse(localStorage.getItem("nonoGramsResults")) || [];

  const newResult = {
    currentLevel: currentLevel,
    nameGamePicture: nameGamePicture,
    minutes: minutes,
    seconds: seconds,
    totalSeconds: minutes * 60 + seconds,
  };
  allResults.push(newResult);

  allResults.sort((a, b) => a.totalSeconds - b.totalSeconds);

  if (allResults.length > 5) {
    allResults = allResults.slice(0, 5);
  }

  localStorage.setItem("nonoGramsResults", JSON.stringify(allResults));
}

function displayWinGames() {
  let allResults = JSON.parse(localStorage.getItem("nonoGramsResults")) || [];

  if (isResultsVisible) {
    let resultsContainer = document.querySelector(".results-container");
    if (resultsContainer) {
      resultsContainer.remove();
    }
    isResultsVisible = false;
  } else {
    let resultsContainer = document.querySelector(".results-container");
    if (!resultsContainer) {
      resultsContainer = createElement("div", "results-container");
      document.body.appendChild(resultsContainer);
    } else {
      resultsContainer.innerHTML = "";
    }

    let header = createElement("div", "results-header", "Top 5 Results:");
    resultsContainer.appendChild(header);

    let table = createElement("table", "results-table");
    let thead = createElement("thead");
    let tbody = createElement("tbody");

    let headers = ["Level", "Picture", "Time"];
    let headRow = createElement("tr");
    headers.forEach((headerText) => {
      let th = createElement("th", null, headerText);
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);

    allResults.forEach((result) => {
      let row = createElement("tr");
      let levelCell = createElement("td", null, result.currentLevel);
      let pictureCell = createElement("td", null, result.nameGamePicture);
      let timeCell = createElement(
        "td",
        null,
        `${result.minutes}:${result.seconds < 10 ? "0" : ""}${result.seconds}`
      );

      row.appendChild(levelCell);
      row.appendChild(pictureCell);
      row.appendChild(timeCell);
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    resultsContainer.appendChild(table);
    isResultsVisible = true;
  }
}
