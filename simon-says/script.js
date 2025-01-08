let body = document.body;

function createRuleWindow() {
  let ruleContainer = createElement("div", "rule-window-container", "");
  let levelBlock = createLevelBox();
  let playButton = createElement("button", "play-btn", "Start");
  ruleContainer.append(levelBlock);
  ruleContainer.append(playButton);

  body.append(ruleContainer);
}

function createElement(tagName, className, context) {
  let element = document.createElement(tagName);
  if (className) {
    element.classList.add(className);
  }
  if (context) {
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

createRuleWindow();
