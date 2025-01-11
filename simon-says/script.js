let body = document.body;
let currentLevel = "Easy";
let currentStage = 1;
let gameField = {};
let gameChain = [];
let isRepeated = false;
let isShowing = true;

function createstartWindow() {
  createRuleWindow();
  gameField = createGameField(checkLevelAndCreateArr());
  body.append(gameField);
}

function createRuleWindow() {
  let ruleContainer = createElement("div", "rule-window-container", "");
  let levelBlock = createLevelBox();
  let playButton = createElement("button", "play-btn", "Start");
  ruleContainer.append(levelBlock);
  ruleContainer.append(playButton);

  playButton.addEventListener("click", (e) => {
    let rulewindow = document.querySelector(".rule-window-container");
    rulewindow.classList.add("hidden");
    createGame();
    gameChain = getRandomChain(2);
    showRandomChain();
  });

  body.append(ruleContainer);
}

function createGame() {
  let gameContainer = createElement("div", "game-window-container", "");
  let selectedLevel = createElement("div", "selected-level", currentLevel);
  let userField = createElement("input", "user-input", "");
  userField.setAttribute("readonly", true);

  let manageContainer = createElement("div", "manage-container");
  let newGameBtn = createElement("button", "new-game-btn", "New Game");

  let stage = createElement("div", "user-stage", "1/5");
  let gameBtn = createElement("button", "repeat-btn", "Repeat");

  manageContainer.append(newGameBtn);
  manageContainer.append(stage);
  manageContainer.append(gameBtn);

  gameContainer.append(selectedLevel);
  gameContainer.append(gameField);
  gameContainer.append(userField);
  gameContainer.append(manageContainer);

  body.append(gameContainer);

  newGameBtn.addEventListener("click", (e) => {
    if (isShowing) {
      return;
    }
    let game = document.querySelector(".game-window-container");
    game.classList.add("hidden");
    let rulewindow = document.querySelector(".rule-window-container");
    rulewindow.classList.remove("hidden");
    deleteGame();
    updateGameField();
  });

  gameBtn.addEventListener("click", (e) => {
    if (isShowing) {
      return;
    }
    showRandomChain();
    isRepeated = true;
  });
}

function checkLevelAndCreateArr() {
  if (currentLevel == "Easy") {
    return createNumberArray();
  } else if (currentLevel == "Medium") {
    return createAlphabetArray();
  } else if (currentLevel == "Hard") {
    let newArr = [];
    newArr.push(createNumberArray());
    newArr.push(createAlphabetArray());
    return newArr.flat();
  }
}

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

function createRadioOption(id, name, value, labelText, isChecked) {
  let levelOption = createElement("div", "", "");
  let radioInput = document.createElement("input");
  radioInput.type = "radio";
  radioInput.id = id;
  radioInput.name = name;
  radioInput.value = value;
  if (isChecked) {
    radioInput.checked = true;
  }
  let label = createElement("label", "", labelText);
  label.htmlFor = id;
  levelOption.append(radioInput);
  levelOption.append(label);

  radioInput.addEventListener("change", (event) => {
    currentLevel = event.target.value;
    updateGameField();
  });

  return levelOption;
}

function createLevelBox() {
  let levelContainer = createElement("div", "level-container", "");
  let levelHeader = createElement("div", "level-header", "Level");
  let levelOptionsList = createElement("div", "level-options-list", "");
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

  levelOptionsList.append(easyOption);
  levelOptionsList.append(mediumOption);
  levelOptionsList.append(hardOption);
  levelContainer.append(levelHeader);
  levelContainer.append(levelOptionsList);
  return levelContainer;
}

function createGameField(arr) {
  let gameField = createElement("div", "game-field", "");

  arr.map((el) => {
    let button = createElement("button", "element-game", el);
    gameField.append(button);
  });

  return gameField;
}

function updateGameField() {
  let oldGameField = document.querySelector(".game-field");
  if (oldGameField) {
    oldGameField.remove();
  }

  gameField = createGameField(checkLevelAndCreateArr());

  body.append(gameField);
}

function createNumberArray() {
  let numberArray = [];
  for (let i = 0; i <= 9; i++) {
    numberArray.push(i);
  }
  return numberArray;
}

function createAlphabetArray() {
  let alphabetArray = [];
  for (let i = 97; i <= 122; i++) {
    alphabetArray.push(String.fromCharCode(i));
  }
  return alphabetArray;
}

function getRandomChain(number) {
  const buttons = gameField.querySelectorAll(".element-game");
  const values = Array.from(buttons).map((element) => element.textContent);
  const randomValues = values.sort(() => Math.random() - 0.5).slice(0, number);

  return randomValues;
}

function showRandomChain() {
  if (isRepeated) {
    return;
  }
  isShowing = true;
  disableUserActions();
  const buttons = gameField.querySelectorAll(".element-game");
  const values = Array.from(buttons);

  gameChain.forEach((chainValue, index) => {
    setTimeout(() => {
      const button = values.find((btn) => btn.textContent === chainValue);

      if (button) {
        button.classList.add("highlight");

        setTimeout(() => {
          button.classList.remove("highlight");
        }, 5 * 100);
      }
      if (index === gameChain.length - 1) {
        setTimeout(() => {
          isShowing = false;
          enableUserActions();
        }, 500);
      }
    }, index * 6 * 100);
  });
}

function deleteGame() {
  let gameContainer = document.querySelector(".game-window-container");
  gameContainer.remove();
  isRepeated = false;
  currentStage = 1;
}

function disableUserActions() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = true;
  });
  document.querySelector(".user-input").disabled = true;
}

function enableUserActions() {
  const repeatBtn = document.querySelector(".repeat-btn");

  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = false;
  });
  if (isRepeated) {
    repeatBtn.disabled = true;
  }

  let inputField = document.querySelector(".user-input");
  inputField.disabled = false;
  inputField.value = "";

  getKeyBoardInput();
  getButtonInput();
}

function getKeyBoardInput() {
  const inputField = document.querySelector(".user-input");

  function handleKeyDown(event) {
    if (!isShowing) {
      if (inputField.value.length < gameChain.length) {
        inputField.value += event.key;
      }
    }
  }

  if (inputField.value.length >= gameChain.length) {
    document.removeEventListener("keydown", handleKeyDown);
  }

  document.addEventListener("keydown", handleKeyDown);
}

function getButtonInput() {
  const inputField = document.querySelector(".user-input");
  const buttons = document.querySelectorAll(".element-game");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!isShowing && inputField.value.length < gameChain.length) {
        inputField.value += button.textContent;
      }
    });
  });
}

createstartWindow();
