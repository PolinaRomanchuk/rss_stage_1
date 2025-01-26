let body = document.body;
currentLevel = "Easy";
let userClicks = Array(5)
  .fill()
  .map(() => Array(5).fill(0));

let seconds = 0;
let minutes = 0;
let timerInterval;

const catPicture = [
  [0, 0, 1, 0, 1],
  [0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1],
];

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
  backgraund.src = "./assets/img/light-back.mp4";
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
  let statistic = createElement("button", "statistic-btn");
  statistic.classList.add("icon-btn");
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
  label.classList.add("text-btn");
  label.htmlFor = id;
  levelOption.append(radioInput);
  levelOption.append(label);

  radioInput.addEventListener("change", (event) => {
    currentLevel = event.target.value;
    //updateGameField();
  });

  return levelOption;
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
  let container = createElement("button", "dropdown-btn", "Cat");
  container.classList.add("text-btn");
  let dropContainer = createElement("ul", "dropdown-content");
  let dropItem1 = createElement("li", "dropdown-item", "1");
  let dropItem2 = createElement("li", "dropdown-item", "2");
  let dropItem3 = createElement("li", "dropdown-item", "3");
  dropContainer.append(dropItem1);
  dropContainer.append(dropItem2);
  dropContainer.append(dropItem3);

  container.append(dropContainer);

  return container;
}

function createLevelField() {
  let container = createElement("div", "level-container");
  let levelBlock = createLevelBox();

  let btnContainer = createElement("div", "btn-container");
  let dropPicture = createGamePictures();
  let randomGameBtn = createElement("button", "random-game-btn", "Random game");
  randomGameBtn.classList.add("text-btn");
  container.append(levelBlock);

  btnContainer.append(dropPicture);
  btnContainer.append(randomGameBtn);

  container.append(levelBlock);
  container.append(btnContainer);

  return container;
}

function createGameCells() {
  let cells = createElement("div", "game-grid-cells");
  for (let i = 0; i < 5 * 5; i++) {
    let cell = createElement("div", "game-grid-cell");
    cell.addEventListener("click", () => {
      startTimer();
      let row = Math.floor(i / 5);
      let col = i % 5;
      userClicks[row][col] = userClicks[row][col] === 1 ? 0 : 1;
      console.log(userClicks);
      cell.classList.toggle("clicked");
      let sound = new Audio("./assets/audio/click.mp3");
      sound.play();
      checkResult();
    });
    cell.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      cell.classList.toggle("right-clicked");
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
  let saveBtn = createElement("button", "save-btn", "Save game");
  saveBtn.classList.add("text-btn");
  let continueBtn = createElement(
    "button",
    "continue-btn",
    "Continue last game"
  );

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
}

createStartWindow();

function showPicture() {
  let oldcells = document.querySelector(".game-grid-cells");
  oldcells.innerHTML = "";
  let cells = createElement("div", "game-grid-cells");

  for (let i = 0; i < catPicture.length; i++) {
    for (let j = 0; j < catPicture[i].length; j++) {
      let cell = createElement("div", "game-grid-cell");

      if (catPicture[i][j] === 1) {
        cell.classList.add("clicked");
      }
      cells.appendChild(cell);
    }
  }

  let gridContainer = document.querySelector(".game-grid-container");
  gridContainer.append(cells);
}

function countHorisontalHints() {
  let allHints = [];
  for (let i = 0; i < catPicture.length; i++) {
    let count = 0;
    let hints = [];
    for (let j = 0; j < catPicture[i].length; j++) {
      if (catPicture[i][j] === 1) {
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
  for (let col = 0; col < catPicture[0].length; col++) {
    let count = 0;
    let hints = [];
    for (let row = 0; row < catPicture.length; row++) {
      if (catPicture[row][col] === 1) {
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

  for (let i = 0; i < catPicture.length; i++) {
    for (let j = 0; j < catPicture[i].length; j++) {
      if (userClicks[i][j] !== catPicture[i][j]) {
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
  stopTimer();
  let winWindow = createElement("div", "win-window");
  let close = createElement("button", "close-btn");
  let closeContainer = createElement("div", "close-btn-container");

  close.classList.add("icon-btn");
  let text = createElement(
    "div",
    "win-text",
    "Great! You have solved the nonogram!"
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
