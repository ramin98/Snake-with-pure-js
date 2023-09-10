let game = document.querySelector("#game");
let score = document.querySelector("#score");
let scoreValue = 0;
score.innerText = scoreValue;

const SIZE = 20;

let snake = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
  { x: 3, y: 5 },
];

let dx = 1;
let dy = 0;

let apple = { x: 10, y: 10 };

const gameLoop = () => {
  snakeLogic();
  drawgame();

  setTimeout(gameLoop, 200);
};

const snakeLogic = () => {
  let head = { ...snake[0] };

  head.x += dx;
  head.y += dy;
  snake.unshift(head);
  if (head.x === apple.x && head.y === apple.y) {
    scoreValue++;
    score.innerText = scoreValue;

    apple = {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
    };
  } else {
    snake.pop();
  }

  if (
    head.x < 0 ||
    head.x >= SIZE ||
    head.y < 0 ||
    head.y >= SIZE ||
    snake.some(
      (item) => item.x === head.x && item.y === head.y && item !== head
    )
  ) {
    scoreValue = 0;
    score.innerText = scoreValue;

    snake = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 },
    ];

    apple = { x: 10, y: 10 };

    dx = 1;
    dy = 0;
  }
};

const drawgame = () => {
  game.innerHTML = "";
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 20; col++) {
      const cell = document.createElement("span");
      cell.classList.add((row + col) % 2 === 0 ? "one" : "two");
      game.appendChild(cell);
    }
  }
  snake.forEach((item) => {
    let div = document.createElement("div");
    div.style = `top:${item.y * 20}px;left:${item.x * 20}px;`;
    div.classList.add("snake");
    game.appendChild(div);
  });

  let div = document.createElement("div");
  div.style = `top:${apple.y * 20}px;left:${apple.x * 20}px;`;
  div.classList.add("apple");
  game.appendChild(div);
};

document.addEventListener("keydown", (ev) => {
  if (ev.key === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -1;
  } else if (ev.key === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = 1;
  } else if (ev.key === "ArrowRight" && dx === 0) {
    dy = 0;
    dx = 1;
  } else if (ev.key === "ArrowLeft" && dx === 0) {
    dy = 0;
    dx = -1;
  }
});

gameLoop();
