const gameplay = () => {
  const startButton = document.getElementById("startButton");
  startButton.style.visibility = "hidden";

  const container = document.getElementById("container");
  const over = document.getElementById("over");
  over.style.visibility = "hidden";

  const createRandomNumbers = () => {
    const numbers = Array.from({ length: 8 }, (_, i) => i + 1);
    const shuffledNumbers = shuffle(numbers.concat(numbers));

    return shuffledNumbers.slice(0, 16);
  };

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const numbers = createRandomNumbers();

  for (let number of numbers) {
    const newDiv = document.createElement("div");
    container.insertAdjacentElement("afterbegin", newDiv);
    newDiv.classList.add("hidden");
    newDiv.id = `img${number}`;
  }

  let card1 = null;
  let card2 = null;

  const cardsPaired = [];

  document.addEventListener("click", (e) => {
    if (e.target.nodeName === "DIV") {
      if (
        !e.target.className.includes("paired") &&
        !e.target.className.includes("active")
      ) {
        if (card1 === null) {
          card1 = e.target;
          card1.className = "";
          card1.classList.add("img", card1.id, "active");
        } else {
          if (card2 === null) {
            card2 = e.target;
            card2.className = "";
            card2.classList.add("img", card2.id, "active");
          }
          const evalPair = () => {
            if (card1 !== null && card2 !== null) {
              if (card1.id === card2.id) {
                setTimeout(() => {
                  card1.classList.add("paired");
                  card2.classList.add("paired");
                  cardsPaired.push(card1, card2);
                  card1 = null;
                  card2 = null;
                }, 500);
              } else {
                setTimeout(() => {
                  card1.className = "";
                  card1.classList.add("hidden");
                  card2.className = "";
                  card2.classList.add("hidden");
                  card1 = null;
                  card2 = null;
                }, 500);
              }
            }
          };
          evalPair();
        }
      }
    }
    const interval = setInterval(() => {
      console.log(cardsPaired.length);
      if (cardsPaired.length === 16) {
        over.style.visibility = "visible";
        clearInterval(interval);
      } else {
        over.style.visibility = "hidden";
      }
    }, 100);
  });
};

const restart = () => {
  const container = document.getElementById("container");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  gameplay();
};
