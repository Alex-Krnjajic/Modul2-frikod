(function () {
  let flasher = null;
  let total = document.querySelector(".total");
  document.querySelector(".host").innerHTML =
    "This site is hosted by " + location.hostname;

  let number = Number(document.querySelector(".total").innerHTML);

  document.addEventListener("rich", () => {
    console.log("rich event");
    document.querySelector(".rich").innerText = "u are rich";
  });

  document.addEventListener("rich", () => {
    console.log("before flash");
    flasher = setInterval(flash, 100);
  });

  document.addEventListener("notRich", () => {
    document.querySelector(".rich").innerText = "";
    flasher && clearInterval(flasher);
  });

  function flash(id) {
    console.log("flash");
    //let text = document.querySelector(id);
    document.querySelector(".total").style.color =
      document.querySelector(".total").style.color == "black"
        ? "green"
        : "black";
  }

  const addNumber = (el) => {
    let newNumber = parseInt(document.querySelector(".numberInput").value);
    console.log(newNumber);
    const clickTarget = el.target.textContent;
    console.log(clickTarget);
    const targetFind = (index) => {
      return index == clickTarget;
    };
    let targetNumber = buttonArray.findIndex(targetFind);
    console.log("addNumber" + targetNumber);
    console.log(number);
    if (targetNumber == 0) {
      number += newNumber;
    } else if (targetNumber > 3) {
      console.log("minus");
      number -= numberArray[targetNumber];
    } else {
      number += numberArray[targetNumber];
    }
    if (number > 100) {
      console.log("number is larger than 100");
      const event = new CustomEvent("rich");
      document.dispatchEvent(event);
    }
    if (number <= 100) {
      const event = new CustomEvent("notRich");
      document.dispatchEvent(event);
    }
    console.log(number);
    total.innerHTML = number;
  };

  const numberArray = [0, 1, 10, 100, 1, 10, 100];

  const buttonArray = [
    "addNumber",
    "plus1",
    "plus10",
    "plus100",
    "minus1",
    "minus10",
    "minus100",
  ];

  for (i = 0; i < 7; i++) {
    const div = document.querySelector(".buttons");
    const button = document.createElement("button");
    button.innerText = buttonArray[i];
    button.classList.add(`.${buttonArray[i]}`);
    button.addEventListener("click", addNumber);
    div.appendChild(button);
  }
})();
