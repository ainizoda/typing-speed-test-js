function createElement(el, attributes, children) {
  const element = document.createElement(el);

  if (attributes) {
    if (
      attributes.constructor.name === "Object" &&
      Object.keys(attributes).length
    ) {
      for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
      }
    }
  }

  if (children) {
    if (typeof children === "string")
      element.innerHTML = children; // replace innerHTML with textContent
    else if (children.constructor.name.startsWith("HTML"))
      element.appendChild(children);
  }

  return element;
}

function convertLetterToElement(letter) {
  return createElement("span", { class: "letter" }, letter);
}

function convertToWordEl(word) {
  const wordElement = createElement("div", { class: "word" });

  for (let i = 0; i < word.length; i++) {
    wordElement.appendChild(convertLetterToElement(word[i]));
  }

  return wordElement;
}

function animateError(element) {
  let count = 255;
  let prevColor = element.style.color;

  let anim = setInterval(() => {
    element.style.color = `rgb(${count}, 0, 0)`;

    if (count > 0) {
      count -= 50;
    } else {
      element.style.color = "rgb(52, 198, 127)";
      clearInterval(anim);
    }
  }, 100);
}

function loadText(area, text) {
  let word = "";

  for (let i = 0; i < text.length; i++) {
    word += text[i];

    if (text[i] === " ") {
      area.appendChild(convertToWordEl(word));
      word = "";
    }
  }

  area.appendChild(convertToWordEl(word));
}

const text = `there is some example text for testing application`;
const playingArea = document.querySelector(".area");
const resultBar = document.querySelector(".speed");

let currentKeyIndex = 0,
  before;

function isPausedGame(paused, firstLetter) {
  paused ? playingArea.blur() : playingArea.focus();

  playingArea.classList.toggle("paused");
  firstLetter.classList.toggle("current");
}

function gameOver(time) {
  let speed = (60000 * text.split(" ").length) / time;

  speedVal.textContent = speed.toFixed(2);
  resultBar.style.display = "flex";
}

function startGame(event) {
  const { ctrlKey, altKey } = event;

  if (event.key.length !== 1 || ctrlKey || altKey) {
    return;
  }

  if (currentKeyIndex === 0) {
    before = new Date();
  }

  const keys = document.querySelectorAll(".letter");

  const keyToBePressed = keys[currentKeyIndex];

  if (event.key === keyToBePressed.textContent) {
    keyToBePressed.classList.add("correct");
    keyToBePressed.classList.remove("current");
  } else {
    animateError(keyToBePressed);

    return false;
  }

  if (currentKeyIndex < keys.length - 1) {
    keys[++currentKeyIndex].classList.add("current");
  } else {
    let time = new Date().getTime() - before.getTime();

    gameOver(time);
  }
}

function main() {
  loadText(playingArea, text.trim());

  const firstLetter = document.querySelectorAll(".letter")[0];

  isPausedGame(false, firstLetter);

  playingArea.onblur = function () {
    isPausedGame(true, firstLetter);
  };

  playingArea.onfocus = function () {
    isPausedGame(false, firstLetter);
  };

  playingArea.onkeydown = startGame;
}

window.onload = main;
