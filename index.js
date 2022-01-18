const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas);

const gravity = 0.2;

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 30;
    this.height = 30;
  }

  draw(posx, posy, width, height, color) {
    c.fillStyle = color;
    c.fillRect(posx, posy, width, height);
  }

  update() {
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = -this.velocity.y / 2.5;
    if (
      this.position.x + this.width + this.velocity.x >= canvas.width ||
      this.position.x + this.width + this.velocity.x <= 0
    )
      this.velocity.x = -this.velocity.x / 1.2;
    if (this.position.y + this.height + this.velocity.y <= 0) {
      this.velocity.y = -this.velocity.y / 1.4;
    }
    if (!(this.position.y + this.height + this.velocity.y) < canvas.height) {
      if (this.velocity.x > 0) {
        this.velocity.x *= 0.95;
      }
      if (this.velocity.x < 0) {
        this.velocity.x *= 0.95;
      }
    }

    this.draw(
      this.position.x,
      this.position.y,
      this.width,
      this.height,
      "blue"
    );
  }
}

class Platform {
  constructor(x, y, width, height) {
    this.position = {
      x: x,
      y: y,
    };
    this.width = width;
    this.height = height;
  }
  draw() {
    c.fillStyle = "black";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
const player = new Player();
const platform = new Platform(400, 450, 300, 30);
const platform1 = new Platform(900, 350, 300, 30);
const platform2 = new Platform(100, 650, 300, 30);

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platform.draw();
  platform1.draw();
  platform2.draw();

  if (keys.right.pressed && player.position.x < canvas.width / 3) {
    player.velocity.x = 6;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -6;
  } else {
    if (keys.right.pressed) {
      platform.position.x -= 6;
      platform1.position.x -= 6;
      platform2.position.x -= 6;
    }
    if (keys.left.pressed) {
      platform.position.x += 6;
      platform1.position.x += 6;
      platform2.position.x += 6;
    }
    player.velocity.x = 0;
  }

  if (
    (player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width) ||
    (player.position.y + player.height <= platform1.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform1.position.y &&
      player.position.x + player.width >= platform1.position.x &&
      player.position.x <= platform1.position.x + platform1.width) ||
    (player.position.y + player.height <= platform2.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform2.position.y &&
      player.position.x + player.width >= platform2.position.x &&
      player.position.x <= platform2.position.x + platform2.width)
  ) {
    player.velocity.y = 0;
  }
}

animate();

addEventListener("keydown", ({ keyCode, key }) => {
  switch (key) {
    case "ArrowRight":
      //   console.log("right");
      keys.right.pressed = true;
      break;
    case "ArrowUp":
      //   console.log("up");
      player.velocity.y -= 10;
      break;
    case "ArrowDown":
      //   console.log("down");
      player.velocity.y += 7;
      break;
    case "ArrowLeft":
      //   console.log("left");
      keys.left.pressed = true;
      break;
  }
});

addEventListener("keyup", ({ keyCode, key }) => {
  switch (key) {
    case "ArrowRight":
      //   console.log("right");
      keys.right.pressed = false;
      break;
    case "ArrowUp":
      //   console.log("up");
      player.velocity.y = 0;
      break;
    case "ArrowDown":
      //   console.log("down");
      player.velocity.y = 0;
      break;
    case "ArrowLeft":
      //   console.log("left");
      keys.left.pressed = false;
      break;
  }
});
addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
