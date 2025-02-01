let body = document.body;
let systemStyle = "light";

let gameOver = false;
let isScoreVisible = false;
let isSounding = true;
let currentLevel = "Easy";
let nameGamePicture = "cat";
let gameSize = 5;
let gamePictureMatrix = [
  [0, 0, 1, 0, 1],
  [0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1],
];
let allMatrixsCurrentLevel = {
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

function createWindowBackground() {
  let background = createElement("video", "video-background");
  background.autoplay = true;
  background.loop = true;
  background.muted = true;
  return background;
}

function setSoundIcon() {
  let sound = document.querySelector(".sound-btn");
  if (isSounding) {
    sound.style.backgroundImage = `url(./assets/img/${systemStyle}/off-${systemStyle}.png)`;
  } else {
    sound.style.backgroundImage = `url(./assets/img/${systemStyle}/on-${systemStyle}.png)`;
  }
}

function createManageHeader() {
  let container = createElement("div", "manage-header-container");
  let timer = createElement("div", "timer");
  let minutes = createElement("div", "minutes", "00:");
  let seconds = createElement("div", "seconds", "00");
  timer.append(minutes);
  timer.append(seconds);

  let iconsContainer = createElement("div", "icons-container");
  let sound = createElement("button", "sound-btn");
  sound.classList.add("icon-btn");
  sound.addEventListener("click", () => {
    isSounding ? (isSounding = false) : (isSounding = true);
    setSoundIcon();
  });

  let style = createElement("button", "light-btn");
  style.classList.add("icon-btn");
  style.addEventListener("click", () => {
    systemStyle === "light" ? setSystemStyle("dark") : setSystemStyle("light");
  });

  let score = createElement("button", "statistic-btn");
  score.classList.add("icon-btn");
  score.addEventListener("click", () => {
    displayWinGames();
  });

  iconsContainer.append(sound);
  iconsContainer.append(style);
  iconsContainer.append(score);
  container.append(timer);
  container.append(iconsContainer);
  return container;
}

function createLevelOption(id, name, value, labelText, isChecked) {
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
    let isInitial = true;
    getGameSizeAndMatrixs(isInitial);
    updateGamePicturesOptions(allMatrixsCurrentLevel);
    setGameField();
    setGameGridSizes();
    resetGame();
  });

  return levelOption;
}

function getGameSizeAndMatrixs(isInitial) {
  if (currentLevel === "Easy") {
    gameSize = 5;
    allMatrixsCurrentLevel = easyPictures;
  } else if (currentLevel === "Medium") {
    gameSize = 10;
    allMatrixsCurrentLevel = mediumPictures;
  } else if (currentLevel === "Hard") {
    gameSize = 15;
    allMatrixsCurrentLevel = hardPictures;
  }
  if (isInitial) {
    let firstKey = Object.keys(allMatrixsCurrentLevel)[0];
    gamePictureMatrix = allMatrixsCurrentLevel[firstKey];
  }
}

function createLevelBox() {
  let levelContainer = createElement("div", "level-options-list");
  let easyOption = createLevelOption(
    "easy",
    "difficulty",
    "Easy",
    "Easy",
    true
  );
  let mediumOption = createLevelOption(
    "medium",
    "difficulty",
    "Medium",
    "Medium",
    false
  );
  let hardOption = createLevelOption(
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

function createGamePicturesOptions() {
  let container = createElement("button", "dropdown-btn");
  container.classList.add("text-btn");

  let displayText = createElement("span", "button-text-span", "сat");
  container.append(displayText);

  let dropContainer = createElement("ul", "dropdown-content");

  Object.keys(allMatrixsCurrentLevel).forEach((key) => {
    let dropItem = createElement("li", "dropdown-item", key);
    dropContainer.append(dropItem);

    dropItem.addEventListener("click", (event) => {
      event.stopPropagation();
      displayText.textContent = dropItem.textContent;
      dropContainer.classList.remove("show");
      nameGamePicture = dropItem.textContent;
      gamePictureMatrix = findPictureMatrix(currentLevel, nameGamePicture);

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

function updateGamePicturesOptions(matrixs, btnName) {
  let btnText = document.querySelector(".button-text-span");
  let dropItems = document.querySelectorAll(".dropdown-item");

  dropItems.forEach((item, index) => {
    if (index < Object.keys(matrixs).length) {
      item.textContent = Object.keys(matrixs)[index];
    }
  });
  let defaultName = Object.keys(matrixs)[0];
  btnText.textContent = btnName ? btnName : defaultName;
  nameGamePicture = btnName ? btnName : defaultName;
}

function updateHints() {
  let horHints = document.querySelectorAll(".horisontal-hint");
  let vertHints = document.querySelectorAll(".vertical-hint");

  const horisontalNumbers = countHorisontalHints();
  const verticalNumbers = countVerticalHints();

  for (let i = 0; i < horHints.length; i++) {
    let hintText = horisontalNumbers[i].join(" ");
    horHints[i].textContent = hintText;
  }

  for (let i = 0; i < vertHints.length; i++) {
    let hintContainer = vertHints[i];
    let hintsVerticalTextContainer = hintContainer.querySelectorAll(
      ".vertical-hint-text"
    );
    hintsVerticalTextContainer.forEach((text) => text.remove());

    for (let j = 0; j < verticalNumbers[i].length; j++) {
      let hintVertTextContainer = createElement(
        "div",
        "vertical-hint-text",
        `${verticalNumbers[i][j]}`
      );
      vertHints[i].appendChild(hintVertTextContainer);
    }
  }
}

function getRandomIndex(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return randomIndex;
}

function createLevelField() {
  let container = createElement("div", "level-container");
  let levelBlock = createLevelBox();

  let btnContainer = createElement("div", "btn-container");
  let dropPicturesOptions = createGamePicturesOptions();
  let randomGameBtn = createElement("button", "random-game-btn", "Random game");
  randomGameBtn.classList.add("text-btn");

  randomGameBtn.addEventListener("click", () => {
    let textBtn = document.querySelector(".button-text-span");
    textBtn.textContent = "";
    const levels = [easyPictures, mediumPictures, hardPictures];
    const randomLevelIndex = getRandomIndex(levels);

    const levelsMap = {
      Easy: easyPictures,
      Medium: mediumPictures,
      Hard: hardPictures,
    };

    let currentLevelString = "";
    for (let level in levelsMap) {
      if (levelsMap[level] === levels[randomLevelIndex]) {
        currentLevelString = level;
        break;
      }
    }

    currentLevel = currentLevelString;

    const pictures = Object.entries(levels[randomLevelIndex]);
    const randomPictureIndex = getRandomIndex(pictures);
    const [pictureKey, newPicture] = pictures[randomPictureIndex];

    gamePictureMatrix = newPicture;
    textBtn.textContent = pictureKey;
    nameGamePicture = pictureKey;

    getGameSizeAndMatrixs();
    setGameField();
    setGameGridSizes();
    resetGame();
    updateGamePicturesOptions(allMatrixsCurrentLevel, pictureKey);
    getLevelBtnAndCheckedIt(currentLevel);
  });

  container.append(levelBlock);

  btnContainer.append(dropPicturesOptions);
  btnContainer.append(randomGameBtn);

  container.append(levelBlock);
  container.append(btnContainer);

  return container;
}

function getLevelBtnAndCheckedIt(level) {
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
        cell.style.backgroundImage = "";
        userClicks[row][col] = userClicks[row][col] = 0;
        if (isSounding) {
          let sound = new Audio("./assets/audio/delete-click.mp3");
          sound.play();
        }
      } else {
        if (cell.classList.contains("clicked")) {
          cell.classList.remove("clicked");
          if (isSounding) {
            let sound = new Audio("./assets/audio/delete-click.mp3");
            sound.play();
          }
        } else {
          cell.classList.add("clicked");
          if (isSounding) {
            let sound = new Audio("./assets/audio/click.mp3");
            sound.play();
          }
        }
      }
      // console.log(userClicks);

      checkResult();
    });
    cell.addEventListener("contextmenu", (event) => {
      if (gameOver) return;
      startTimer();
      let row = Math.floor(i / gameSize);
      let col = i % gameSize;
      userClicks[row][col] = userClicks[row][col] = 0;
      // console.log(userClicks);

      event.preventDefault();
      cell.classList.remove("clicked");

      if (cell.classList.contains("right-clicked")) {
        cell.classList.remove("right-clicked");
        cell.style.backgroundImage = "";
        if (isSounding) {
          let sound = new Audio("./assets/audio/delete-click.mp3");
          sound.play();
        }
      } else {
        cell.classList.add("right-clicked");
        setCrossStyle();
        if (isSounding) {
          let sound = new Audio("./assets/audio/right-click.mp3");
          sound.play();
        }
      }
    });

    cells.appendChild(cell);
  }

  return cells;
}

function createHints(className) {
  if (className == "horisontal-hint") {
    const horisontalNumbers = countHorisontalHints();
    let hints = createElement("div", `${className}s`);

    for (let i = 0; i < horisontalNumbers.length; i++) {
      let hintText = horisontalNumbers[i].join(" ");
      let hint = createElement("div", `${className}`, `${hintText}`);
      hints.appendChild(hint);
    }
    return hints;
  } else {
    const verticalNumbers = countVerticalHints();
    let hints = createElement("div", `${className}s`);

    for (let i = 0; i < verticalNumbers.length; i++) {
      let hint = createElement("div", `${className}`);
      for (let j = 0; j < verticalNumbers[i].length; j++) {
        let hintColumn = createElement(
          "div",
          `${className}-text`,
          `${verticalNumbers[i][j]}`
        );
        hint.appendChild(hintColumn);
      }
      hints.appendChild(hint);
    }
    return hints;
  }
}

function setGameField() {
  let content = document.querySelector(".game-container");
  if (content) {
    content.innerHTML = "";
  } else {
    content = createElement("div", "game-container");
  }
  let gridContainer = createElement("div", "game-grid-container");
  let horisHints = createHints("horisontal-hint");
  let verticHints = createHints("vertical-hint");
  let cells = createGameCells();
  gridContainer.append(horisHints);
  gridContainer.append(cells);
  gridContainer.append(verticHints);
  content.append(gridContainer);
  return content;
}

function createManageFooter() {
  let container = createElement("div", "footer-game-setting-container");

  let solutionBtn = createElement("button", "solution-btn", "Solution");
  solutionBtn.classList.add("text-btn");
  solutionBtn.addEventListener("click", () => {
    resetTimer();
    resetGame();
    showSolution();
  });

  let settingContainer = createElement("div", "setting-container", "");

  let settingIcon = createElement("button", "setting-btn");
  settingIcon.classList.add("icon-btn");
  settingIcon.addEventListener("click", () => {
    hiddenBtnContainer.classList.toggle("inactive");
  });

  let hiddenBtnContainer = createElement("div", "hidden-btn-container");
  let resetBtn = createElement("button", "reset-btn", "Reset game");
  resetBtn.classList.add("text-btn");
  resetBtn.addEventListener("click", () => {
    let isplaying = true;
    resetGame(isplaying);
  });

  let saveBtn = createElement("button", "save-btn", "Save game");
  saveBtn.classList.add("text-btn");
  saveBtn.addEventListener("click", () => {
    saveGame();
  });

  let continueBtn = createElement(
    "button",
    "continue-btn",
    "Continue last game"
  );
  continueBtn.classList.add("text-btn");
  continueBtn.addEventListener("click", () => {
    loadGame();
  });

  hiddenBtnContainer.append(resetBtn);
  hiddenBtnContainer.append(saveBtn);
  hiddenBtnContainer.append(continueBtn);

  settingContainer.append(settingIcon);
  settingContainer.append(hiddenBtnContainer);

  container.append(solutionBtn);
  container.append(settingContainer);
  return container;
}

function createGameWindow() {
  let gameWindow = createElement("div", "game-window");
  let header = createManageHeader();
  let level = createLevelField();
  let game = setGameField();
  let footer = createManageFooter();

  gameWindow.append(header);
  gameWindow.append(level);
  gameWindow.append(game);
  gameWindow.append(footer);

  return gameWindow;
}

function createStartWindow() {
  let background = createWindowBackground();
  let gameWindow = createGameWindow();
  body.append(background);
  body.append(gameWindow);
  checkWindowHeight();
  setSystemStyle(systemStyle);
}

function showSolution() {
  let cells = document.querySelectorAll(".game-grid-cell");

  for (let i = 0; i < gamePictureMatrix.length; i++) {
    for (let j = 0; j < gamePictureMatrix[i].length; j++) {
      let cell = cells[i * gameSize + j];
      if (gamePictureMatrix[i][j] === 1) {
        cell.classList.add("clicked");
      } else {
        cell.classList.remove("clicked");
      }
    }
  }
}

function countHorisontalHints() {
  let allHints = [];
  for (let i = 0; i < gamePictureMatrix.length; i++) {
    let count = 0;
    let hints = [];
    for (let j = 0; j < gamePictureMatrix[i].length; j++) {
      if (gamePictureMatrix[i][j] === 1) {
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
  for (let col = 0; col < gamePictureMatrix[0].length; col++) {
    let count = 0;
    let hints = [];
    for (let row = 0; row < gamePictureMatrix.length; row++) {
      if (gamePictureMatrix[row][col] === 1) {
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

  for (let i = 0; i < gamePictureMatrix.length; i++) {
    for (let j = 0; j < gamePictureMatrix[i].length; j++) {
      if (userClicks[i][j] !== gamePictureMatrix[i][j]) {
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
  close.classList.add("icon-btn");
  let closeContainer = createElement("div", "close-btn-container");

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
    overlay.classList.remove("show");
  });

  body.append(winWindow);
  if (isSounding) {
    let sound = new Audio("./assets/audio/win.mp3");
    sound.play();
  }

  saveWinGames();
  let overlay = document.querySelector(".overlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
  }
  overlay.classList.add("show");
  overlay.addEventListener("click", (event) => {
    if (!winWindow.contains(event.target)) {
      winWindow.classList.add("hidden");
      overlay.classList.remove("show");
    }
  });
  setCrossStyle();
  setWinWindowStyle();
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

function resetGame(isplaying) {
  gameOver = false;
  if (!isplaying) {
    resetTimer();
  }
  let cell = document.querySelectorAll(".game-grid-cell");
  cell.forEach((element) => element.classList.remove("clicked"));
  cell.forEach((element) => element.classList.remove("right-clicked"));

  userClicks = Array(gameSize)
    .fill()
    .map(() => Array(gameSize).fill(0));
}

function findPictureMatrix(level, name) {
  const levels = {
    Easy: easyPictures,
    Medium: mediumPictures,
    Hard: hardPictures,
  };
  return levels[level][name];
}

function setGameGridSizes(checked) {
  let pxSize = "";
  if (currentLevel === "Easy") {
    gameSize = 5;
    pxSize = `70px`;
  } else if (currentLevel === "Medium") {
    gameSize = 10;
    pxSize = `40px`;
  } else if (currentLevel === "Hard") {
    gameSize = 15;
    pxSize = `23px`;
  }

  let cells = document.querySelector(".game-grid-cells");
  let verHints = document.querySelector(".vertical-hints");
  let horHints = document.querySelector(".horisontal-hints");

  cells.style.gridTemplateColumns = `repeat(${gameSize}, ${pxSize})`;
  cells.style.gridTemplateRows = `repeat(${gameSize}, ${pxSize})`;
  verHints.style.gridTemplateColumns = `repeat(${gameSize}, ${pxSize})`;
  horHints.style.gridTemplateRows = `repeat(${gameSize}, ${pxSize})`;

  if (currentLevel === "Medium") {
    verHints.style.height = `90px`;
  }

  if (currentLevel === "Hard") {
    verHints.style.height = `135px`;
    horHints.style.width = `90px`;
  }

  addGridLines(5);
  if (!checked) {
    checkWindowHeight();
  }

  setGameFieldColors(systemStyle);
}

function addGridLines(cellCount) {
  let cells = document.querySelector(".game-grid-cells");
  let color = `var(--color-game-border-${systemStyle})`;
  cells.style.border = "none";
  cells.style.borderTop = `3px solid ${color}`;
  cells.style.borderLeft = `3px solid ${color}`;

  if (currentLevel !== "Easy") {
    let cellElements = cells.querySelectorAll(".game-grid-cell");
    let verHints = document.querySelectorAll(".vertical-hint");
    let horHints = document.querySelectorAll(".horisontal-hint");

    for (let i = 0; i < cellElements.length; i++) {
      let rowIndex = Math.floor(i / gameSize);
      let colIndex = i % gameSize;

      if ((colIndex + 1) % cellCount === 0 && colIndex !== gameSize - 1) {
        cellElements[i].style.borderRight = `3px solid ${color}`;
      }

      if ((rowIndex + 1) % cellCount === 0 && rowIndex !== gameSize - 1) {
        cellElements[i].style.borderBottom = `3px solid ${color}`;
      }
    }

    for (let i = 0; i < verHints.length; i++) {
      let colIndex = i % gameSize;

      if ((colIndex + 1) % cellCount === 0 && colIndex !== gameSize - 1) {
        verHints[i].style.borderRight = `3px solid ${color}`;
      }
    }

    for (let i = 0; i < horHints.length; i++) {
      let colIndex = i % gameSize;
      if ((colIndex + 1) % cellCount === 0 && colIndex !== gameSize - 1) {
        horHints[i].style.borderBottom = `3px solid ${color}`;
      }
    }
  }
}

function removeGridLines() {
  let cells = document.querySelector(".game-grid-cells");
  let cellElements = cells.querySelectorAll(".game-grid-cell");

  cellElements.forEach((cell) => {
    cell.style.borderRight = "none";
    cell.style.borderBottom = "none";
  });
}

function checkWindowHeight() {
  let cells = document.querySelector(".game-grid-cells");
  let verHints = document.querySelector(".vertical-hints");
  let horHints = document.querySelector(".horisontal-hints");

  if (window.innerHeight <= 750) {
    horHints.style.setProperty(
      "grid-template-rows",
      `repeat(${gameSize}, 20px)`,
      "important"
    );
    cells.style.setProperty(
      "grid-template-columns",
      `repeat(${gameSize}, 20px)`,
      "important"
    );
    cells.style.setProperty(
      "grid-template-rows",
      `repeat(${gameSize}, 20px)`,
      "important"
    );
    verHints.style.setProperty(
      "grid-template-columns",
      `repeat(${gameSize}, 20px)`,
      "important"
    );
    if (currentLevel === "Hard") {
      horHints.style.setProperty(
        "grid-template-rows",
        `repeat(${gameSize}, 15px)`,
        "important"
      );
      cells.style.setProperty(
        "grid-template-columns",
        `repeat(${gameSize}, 15px)`,
        "important"
      );
      cells.style.setProperty(
        "grid-template-rows",
        `repeat(${gameSize}, 15px)`,
        "important"
      );
      verHints.style.setProperty(
        "grid-template-columns",
        `repeat(${gameSize}, 15px)`,
        "important"
      );
    }
  } else {
    let checked = true;
    setGameGridSizes(checked);
  }
}

function setCrossStyle() {
  let close = document.querySelector(".close-btn");
  if (close) {
    close.style.backgroundImage = `url(./assets/img/${systemStyle}/cross.png)`;
  }
  let crosses = document.querySelectorAll(".right-clicked");
  let crossUrl = `url(./assets/img/${systemStyle}/cross.png)`;
  if (crosses.length > 0) {
    crosses.forEach((cross) => {
      cross.style.backgroundImage = crossUrl;
    });
  }
}

function setResultStyle() {
  let results = document.querySelector(".results-container");
  if (results) {
    results.style.backgroundColor = `var(--color-accent-${systemStyle})`;

    let rows = document.querySelectorAll(".result-table-body-row");
    rows.forEach((row, index) => {
      if (index % 2 === 0) {
        row.style.backgroundColor = `var(--color-table-row-odd-${systemStyle})`;
      } else {
        row.style.backgroundColor = `var(--color-table-row-even-${systemStyle})`;
      }
    });
  }
}
function setWinWindowStyle() {
  let window = document.querySelector(".win-window");
  if (window) {
    window.style.backgroundColor = `var(--color-accent-${systemStyle})`;
  }
}

function setSystemStyle(style) {
  systemStyle = style;

  let background = document.querySelector(".video-background");
  background.src = `./assets/img/${systemStyle}/background.mp4`;

  let window = document.querySelector(".game-window");
  window.style.backgroundColor = `var(--color-background-game-window-${systemStyle})`;

  let textBtns = document.querySelectorAll(".text-btn");
  textBtns.forEach((btn) => {
    btn.style.backgroundColor = `var(--color-btn-background-inactive-${systemStyle})`;
  });

  let levels = document.querySelectorAll(".level-label ");
  levels.forEach((btn) => {
    btn.style.backgroundColor = `var(--color-btn-background-inactive-${systemStyle})`;
  });

  let styleBtn = document.querySelector(".light-btn");
  styleBtn.style.backgroundImage = `url(./assets/img/${systemStyle}/styleIcon.png)`;

  let settingBtn = document.querySelector(".setting-btn");
  settingBtn.style.backgroundImage = `url(./assets/img/${systemStyle}/settingsIcon.png)`;

  let scoreBtn = document.querySelector(".statistic-btn");
  scoreBtn.style.backgroundImage = `url(./assets/img/${systemStyle}/statisticsIcon.png)`;

  let sound = document.querySelector(".sound-btn");
  if (isSounding) {
    sound.style.backgroundImage = `url(./assets/img/${systemStyle}/off-${systemStyle}.png)`;
  } else {
    sound.style.backgroundImage = `url(./assets/img/${systemStyle}/on-${systemStyle}.png)`;
  }

  let dropItems = document.querySelectorAll(".dropdown-item");
  dropItems.forEach((item) => {
    item.style.backgroundColor = `var(--color-btn-background-inactive-${systemStyle})`;
  });

  document.documentElement.style.setProperty(
    "color",
    `var(--color-font-main-${systemStyle})`
  );

  setGameFieldColors(style);
  setCrossStyle();
  setResultStyle();
}

function setGameFieldColors(style) {
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
    gamePicture: gamePictureMatrix,
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
    gamePictureMatrix = gameState.gamePicture;
    systemStyle = gameState.systemStyle;
    gameSize = gameState.gameSize;

    setSystemStyle(systemStyle);
    getGameSizeAndMatrixs(currentLevel);
    setGameField();
    setGameGridSizes();
    getLevelBtnAndCheckedIt(currentLevel);

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

function closeResults() {
  let resultsContainer = document.querySelector(".results-container");
  let overlay = document.querySelector(".overlay");

  if (resultsContainer) resultsContainer.classList.remove("show");
  if (overlay) overlay.classList.remove("show");

  setTimeout(() => {
    if (resultsContainer) resultsContainer.remove();
    if (overlay) overlay.remove();
  }, 500);

  isScoreVisible = false;
}

function displayWinGames() {
  let allResults = JSON.parse(localStorage.getItem("nonoGramsResults")) || [];
  let resultsContainer = document.querySelector(".results-container");
  let overlay = document.querySelector(".overlay");

  if (isScoreVisible) {
    closeResults();
    return;
  }

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
  }

  if (!resultsContainer) {
    resultsContainer = createElement("div", "results-container");
    document.body.appendChild(resultsContainer);
  } else {
    resultsContainer.innerHTML = "";
  }

  let closeContainer = createElement("div", "close-btn-container");
  let close = createElement("button", "close-btn");
  close.classList.add("icon-btn");
  close.classList.add("results");
  close.addEventListener("click", closeResults);
  closeContainer.appendChild(close);
  resultsContainer.appendChild(closeContainer);

  let header = createElement("div", "results-header", "Top 5 Results:");
  resultsContainer.appendChild(header);

  let table = createElement("table", "results-table");
  let thead = createElement("thead", "result-table-head");
  let tbody = createElement("tbody");

  let headers = ["Level", "Picture", "Time"];
  let headRow = createElement("tr", "result-table-head-row");
  headers.forEach((headerText) => {
    let th = createElement("th", "result-table-head-col-name", headerText);
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);

  allResults.forEach((result) => {
    let row = createElement("tr", "result-table-body-row");
    let levelCell = createElement(
      "td",
      "result-table-body-col",
      result.currentLevel
    );
    let pictureCell = createElement(
      "td",
      "result-table-body-col",
      result.nameGamePicture
    );
    let timeCell = createElement(
      "td",
      "result-table-body-col",
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
  setTimeout(() => {
    resultsContainer.classList.add("show");
    overlay.classList.add("show");
  }, 10);
  isScoreVisible = true;

  overlay.addEventListener("click", (event) => {
    if (!resultsContainer.contains(event.target)) {
      closeResults();
    }
  });
  setCrossStyle();
  setResultStyle();
}

createStartWindow();
window.addEventListener("resize", checkWindowHeight);
