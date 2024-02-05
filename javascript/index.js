let index = 0;
let attempts = 0;
const answer = "APPLE";

function appStart() {
  function handleEnterKey() {
    function displayGameover() {
      const gameoverDiv = document.createElement("div");
      gameoverDiv.innerText = "Game Over!";

      document.body.appendChild(gameoverDiv);
    }

    let answe_number = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const input_letter = block.innerText;
      const answer_letter = answer[i];

      if (input_letter === answer_letter) {
        answe_number += 1;
        block.style.background = "#68B361";
        block.style.color = "white";
      } else if (answer.includes(input_letter)) {
        block.style.background = "#D5BF51";
        block.style.color = "white";
      } else {
        block.style.background = "#767e80";
        block.style.color = "white";
      }
    }

    if (answe_number === 5) {
      console.log("You Won!");
      displayGameover();
      clearInterval(timer);
      return;
    }

    if (attempts === 5) {
      displayGameover();
      clearInterval(timer);
      return;
    } else {
      attempts += 1;
      index = 0;
    }
  }

  function handleBackspace() {
    const preBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index - 1}']`
    );

    if (index > 0) {
      preBlock.innerText = "";
      index -= 1;
    }
  }

  function handleKeydown(event) {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else {
      if (index === 5) {
        if (event.key === "Enter") {
          handleEnterKey();
        } else {
          return;
        }
      } else if (65 <= keyCode && keyCode <= 90) {
        thisBlock.innerText = key;
        index += 1;
      }
    }
  }

  function startTimer() {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timerDiv = document.querySelector(".timer");
      timerDiv.innerText = `Time: ${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  }

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
