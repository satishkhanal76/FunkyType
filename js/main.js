const paragraphElement = document.getElementById("typing-paragraph");

// constant variable -- not gonna change

let currentIndex = 0;
let doneLetters = "";
let notDoneLetters = "";

let isCompleted = false;

let doneElement = document.createElement("span");
doneElement.classList.add("typed");
let undoneElement = document.createElement("span");

let incorrectLetterCount = 0;
let wordCount;

let startingTimestamp;
let endingTimestamp;

let paragraph =
  "Went to the park and saw a tree, it was a big tree and it was very green. I could see a red apple on a high branch so I reached up and picked it off. It was weird how I picked it off, as I am very short. I suppose I just jumped really high.";
reset(paragraph);

document.getElementById("easy").addEventListener("click", (event) => {
  paragraph = "Easy great have fun and good luck";
  reset(paragraph);
});

document.getElementById("medium").addEventListener("click", (event) => {
  paragraph = "A quick brown fox jumps over the lazy dog.";
  reset(paragraph);
});
document.getElementById("hard").addEventListener("click", (event) => {
  paragraph =
    "Went to the park and saw a tree, it was a big tree and it was very green. I could see a red apple on a high branch so I reached up and picked it off. It was weird how I picked it off, as I am very short. I suppose I just jumped really high.";
  reset(paragraph);
});

document.getElementById("redo").addEventListener("click", (event) => {
  reset(paragraph);
});

document.addEventListener("keypress", (event) => {
  if (currentIndex === 0 && paragraph.charAt(currentIndex) === event.key) {
    startingTimestamp = Date.now();
  }

  if (isCompleted) return;

  if (paragraph.charAt(currentIndex) === event.key) {
    doneLetters = paragraph.slice(0, currentIndex + 1);
    notDoneLetters = paragraph.slice(currentIndex + 1, paragraph.length);

    currentIndex++;
  }

  doneElement.textContent = doneLetters;
  undoneElement.textContent = notDoneLetters;
  let cursorElement = document.createElement("span");
  cursorElement.classList.add("cursor");
  cursorElement.textContent = "|";

  paragraphElement.innerHTML = "";
  paragraphElement.append(doneElement, cursorElement, undoneElement);

  if (notDoneLetters.length <= 0) {
    endingTimestamp = Date.now();

    isCompleted = true;
    let timpestampDifference = endingTimestamp - startingTimestamp;
    let min = timpestampDifference / 1000 / 60;
    let wpm = wordCount / min;

    paragraphElement.textContent = `WPM: ${Math.round(wpm)}`;
  }
});

function reset(text) {
  currentIndex = 0;
  doneLetters = "";
  notDoneLetters = text;

  isCompleted = false;

  doneElement.textContent = "";
  undoneElement.textContent = "";

  interval = undefined;
  seconds = 0;

  paragraphElement.textContent = text;
  wordCount = text.split(" ").length;
}
