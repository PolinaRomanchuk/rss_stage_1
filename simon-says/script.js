let body = document.body;
let level = "Easy";

function createRuleWindow() {
  let ruleContainer = createElement("div", "rule-window-container", "");
  let levelBlock = createLevelBox();
  let playButton = createElement("button", "play-btn", "Start");
  ruleContainer.append(levelBlock);
  ruleContainer.append(playButton);

  body.append(ruleContainer);
}

function createGame() {
  let gameContainer = createElement("div", "game-window-container", "");
  let selectedLevel = createElement("div", "selected-level", level);
  let gameField = createGameField(createAlphabetArray());
  
  let userField = createElement("input", "user-input", "");

  let manageContainer = createElement("div", "manage-container");
  let stage = createElement("div", "user-stage", "1/5");
  let gameBtn = createElement("button", "repeat-btn", "Repeat");

  manageContainer.append(stage);
  manageContainer.append(gameBtn);

  gameContainer.append(selectedLevel);
  gameContainer.append(gameField);
  gameContainer.append(userField);
  gameContainer.append(manageContainer);

  body.append(gameContainer);
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
  return levelOption;
}

function createLevelBox() {
  let levelContainer = createElement("div", "level-container", "");
  let levelHeader = createElement("div", "level-header", "Level");
  let levelOptionsList = createElement("div", "level-options-list", "");
  let easyOption = createRadioOption(
    "easy",
    "difficulty",
    "easy",
    "Easy",
    true
  );
  let mediumOption = createRadioOption(
    "medium",
    "difficulty",
    "medium",
    "Medium",
    false
  );
  let hardOption = createRadioOption(
    "hard",
    "difficulty",
    "hard",
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

createRuleWindow();
createGame();
