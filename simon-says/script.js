let body = document.body;
let currentLevel = "Easy";
let currentStage = 1;
let gameField = {};
let gameChain = [];
let isRepeated = false;
let isShowing = true;
let keyboardHandler;
let isInputBlocked = false;
let victoryMusic;

function createStartWindow() {
  createGameControlWindow();
  gameField = createGameField(checkLevelAndCreateArr());
  body.append(gameField);
}

function createGameControlWindow() {
  let gameControlContainer = createElement("div", "rule-window-container", "");
  let selectLevelBlock = createLevelBox();
  let startGameButton = createElement("button", "play-btn", "Start");
  gameControlContainer.append(selectLevelBlock);
  gameControlContainer.append(startGameButton);

  startGameButton.addEventListener("click", () => {
    let gameControlWindow = document.querySelector(".rule-window-container");
    gameControlWindow.classList.add("hidden");
    createGameWindow();
    gameChain = getRandomChain(2);
    showChain();
    console.log(gameChain);
  });

  body.append(gameControlContainer);
}

function createGameWindow() {
  let gameWindowContainer = createElement("div", "game-window-container", "");
  let selectedLevel = createElement("div", "selected-level", currentLevel);
  let userInputField = createElement("input", "user-input", "");
  userInputField.setAttribute("readonly", true);
  userInputField.id = "input";

  let manageContainer = createElement("div", "manage-container");
  let newGameBtn = createElement("button", "new-game-btn", "New Game");

  let stage = createElement("div", "user-stage", `${currentStage}/5`);
  let repeatGameBtn = createElement("button", "repeat-btn", "Repeat");

  manageContainer.append(newGameBtn);
  manageContainer.append(stage);
  manageContainer.append(repeatGameBtn);

  gameWindowContainer.append(selectedLevel);
  gameWindowContainer.append(gameField);
  gameWindowContainer.append(userInputField);
  gameWindowContainer.append(manageContainer);

  body.append(gameWindowContainer);

  newGameBtn.addEventListener("click", () => {
    if (isShowing) {
      return;
    }
    let gameWindowContainer = document.querySelector(".game-window-container");
    gameWindowContainer.classList.add("hidden");
    let gameControlWindow = document.querySelector(".rule-window-container");
    gameControlWindow.classList.remove("hidden");
    deleteGame();
    updateGameField();
    enableUserActions();
  });

  repeatGameBtn.addEventListener("click", () => {
    if (isShowing) {
      return;
    }
    userInputField.value = "";
    showChain();
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

function showChain() {
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
  const winGif = document.querySelector(".victory-gif");

  let input = document.querySelector(".user-input");
  input.value = "";
  gameContainer.remove();
  isRepeated = false;
  currentStage = 1;

  if (winGif) {
    winGif.remove();
  }
  if (victoryMusic && !victoryMusic.paused) {
    victoryMusic.pause();
    victoryMusic.currentTime = 0;
  }
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
  if (inputField) {
    inputField.disabled = false;
    inputField.value = "";
  }

  getKeyBoardInput();
  getButtonInput();
}

function getKeyBoardInput() {
  const inputField = document.querySelector(".user-input");
  const buttons = gameField.querySelectorAll(".element-game");
  const validValues = Array.from(buttons).map((element) => element.textContent);

  const symbolsMap = {
    а: "f",
    б: ",",
    в: "d",
    г: "u",
    д: "l",
    е: "t",
    ё: "`",
    ж: ";",
    з: "p",
    и: "b",
    й: "q",
    к: "r",
    л: "k",
    м: "v",
    н: "y",
    о: "j",
    п: "g",
    р: "h",
    с: "c",
    т: "n",
    у: "e",
    ф: "a",
    х: "[",
    ц: "w",
    ч: "x",
    ш: "i",
    щ: "o",
    ъ: "]",
    ы: "s",
    ь: "m",
    э: "'",
    ю: ".",
    я: "z",
  };

  function convertToEnglish(key) {
    return symbolsMap[key] || key;
  }

  function handleKeyDown(event) {
    if (isInputBlocked) return;

    const inputKey = convertToEnglish(event.key.toLowerCase());

    if (!validValues.includes(inputKey)) {
      isProcessing = false;
      return;
    }

    if (!isShowing && inputField.value.length < gameChain.length) {
      isInputBlocked = true;
      inputField.value += inputKey;
      checkInput();
      highlightButton(inputKey);
    }
    setTimeout(function () {
      isInputBlocked = false;
    }, 300);
  }

  function highlightButton(key) {
    const buttons = document.querySelectorAll(".element-game");
    const button = Array.from(buttons).find(
      (button) => button.textContent.trim() === key
    );
    if (button) {
      button.classList.add("highlight");
      setTimeout(() => {
        button.classList.remove("highlight");
      }, 600);
    }
  }
  if (keyboardHandler) {
    document.removeEventListener("keydown", keyboardHandler);
  }
  keyboardHandler = handleKeyDown;
  document.addEventListener("keydown", keyboardHandler);
}

function getButtonInput() {
  if (isInputBlocked) return;
  const inputField = document.querySelector(".user-input");
  const buttons = document.querySelectorAll(".element-game");

  buttons.forEach((button) => {
    const newButton = button.cloneNode(true);
    button.replaceWith(newButton);
  });

  const newButtons = document.querySelectorAll(".element-game");

  newButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!isShowing && inputField.value.length < gameChain.length) {
        isInputBlocked = true;
        inputField.value += button.textContent;
        button.classList.add("highlight");
        setTimeout(() => {
          button.classList.remove("highlight");
          isInputBlocked = false;
        }, 300);
        checkInput();
      }
    });
  });
}

function checkInput() {
  const inputField = document.querySelector(".user-input");
  const userInput = inputField.value;

  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] !== gameChain[i]) {
      error();
    } else {
      /* if (userInput.length !== gameChain.length) {
        let sound = new Audio("good.mp3");
        sound.play();
      } */
    }
  }
  if (
    userInput.length === gameChain.length &&
    userInput === gameChain.join("")
  ) {
    if (currentStage == 5) {
      let gameBtn = document.querySelector(".repeat-btn");
      const inputField = document.querySelector(".user-input");
      victoryMusic = new Audio("victory.mp3");
      victoryMusic.play();
      gameBtn.disabled = true;
      var img = new Image(500, 500);
      img.src = "victory.gif";
      img.classList.add("victory-gif");
      body.append(img);
      setTimeout(function () {
        img.remove();
      }, 15 * 1000);
      inputField.value = "You win!";
    } else {
      let sound = new Audio("win.mp3");
      sound.play();
      nextLevel();
    }
  }
}

function error() {
  const inputField = document.querySelector(".user-input");
  inputField.value = "You can try again. Press the repeat button";
  if (!isRepeated) {
    let sound = new Audio("wrong.mp3");
    sound.play();
  }

  if (isRepeated) {
    inputField.value = "Game over. You can start new game";
    let sound = new Audio("gameover.mp3");
    sound.play();
  }
}

function nextLevel() {
  let gameBtn = document.querySelector(".repeat-btn");
  gameBtn.classList.add("hidden");

  let manageContainer = document.querySelector(".manage-container");
  let nextBtn = document.querySelector(".next-btn");

  if (!nextBtn) {
    nextBtn = createElement("button", "next-btn", "Next");
    manageContainer.append(nextBtn);

    nextBtn.addEventListener("click", (e) => {
      let stage = document.querySelector(".user-stage");
      currentStage += 1;
      stage.textContent = `${currentStage}/5`;

      nextBtn.classList.add("hidden");
      gameBtn.classList.remove("hidden");

      const inputField = document.querySelector(".user-input");
      inputField.value = "";
      isRepeated = false;
      gameChain = getRandomChain(currentStage * 2);
      showChain();
      console.log(gameChain);
    });
  }
  nextBtn.classList.remove("hidden");
}

createStartWindow();
