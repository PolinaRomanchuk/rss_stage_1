let body = document.body;
currentLevel = "Easy";

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
  let backgraund = createElement("video", "video-background", "");
  backgraund.src = "./assets/img/light-back.mp4";
  backgraund.autoplay = true;
  backgraund.loop = true;
  backgraund.muted = true;
  return backgraund;
}

function createManageHeader() {
  let container = createElement("div", "manage-header-container", "");
  let timer = createElement("div", "timer", "00:00");

  let iconsContainer = createElement("div", "icons-container", "");
  let light = createElement("button", "light-btn", "");
  light.classList.add("on");
  let statistic = createElement("button", "statistic-btn", "");
  iconsContainer.append(light);
  iconsContainer.append(statistic);
  container.append(timer);
  container.append(iconsContainer);
  return container;
}

function createRadioOption(id, name, value, labelText, isChecked) {
  let levelOption = createElement("div", "level-option", "");
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
    //updateGameField();
  });

  return levelOption;
}

function createLevelBox() {
  let levelContainer = createElement("div", "level-options-list", "");
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
  let container = createElement("button", "dropdown-btn", "Picture");
  let dropContainer = createElement("ul", "dropdown-content", "");
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
  let container = createElement("div", "level-container", "");
  let levelBlock = createLevelBox();

  let btnContainer = createElement("div", "btn-container", "");
  let dropPicture = createGamePictures();
  let randomGameBtn = createElement("button", "random-game", "Random game");
  container.append(levelBlock);

  btnContainer.append(dropPicture);
  btnContainer.append(randomGameBtn);

  container.append(levelBlock);
  container.append(btnContainer);

  return container;
}

function createGameCells() {
let cells = createElement("div", "game-grid-cells", "");
for (let i = 0; i < 5 * 5; i++) {
  let cell = createElement("div", "game-grid-cell", "");
  cells.appendChild(cell);
}
return cells;
}

function createHints(className) {
  let hints = createElement("div", `${className}s`, "");
  for (let i = 0; i < 5 ; i++) {
    let hint = createElement("div", `${className}`, "1");
    hints.appendChild(hint);
  }
  return hints;
  }
 

function createGameField() {
  let container = createElement("div", "game-container", "");
  let gridContainer = createElement("div", "game-grid-container", "");
  let horisHints = createHints("horisontal-hint");
  let verticHints = createHints("vertical-hint");
  let cells = createGameCells();
  gridContainer.append(horisHints);
  gridContainer.append(cells);
  gridContainer.append(verticHints);
  container.append(gridContainer);
  return container;
}

function createGameWindow() {
  let gameWindow = createElement("div", "game-window");
  let header = createManageHeader();
  let level = createLevelField();
  let game = createGameField();

  gameWindow.append(header);
  gameWindow.append(level);
  gameWindow.append(game);

  return gameWindow;
}

function createStartWindow() {
  let backgraund = createBackground();
  let gameWindow = createGameWindow();
  body.append(backgraund);
  body.append(gameWindow);
}

createStartWindow();
