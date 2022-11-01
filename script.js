const canvas = document.getElementById("canvasMatrix");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "#0aff0a");
gradient.addColorStop(0.2, "#46af46");
gradient.addColorStop(0.4, "#147914");
gradient.addColorStop(0.8, "#04fd04ad");
gradient.addColorStop(1, "#0aff0a");

const chars = Array.from({ length: 2 ** 16 }, (_, i) => i + 1)
  .map((i) => String.fromCharCode(i))
  .filter((a) => a.match(/\p{Alphabetic}/u))
  .filter(Boolean)
  .join(" ");

const random = () => crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;

class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = "";
    this.canvasHeight = canvasHeight;
  }

  draw(context) {
    this.text = chars.charAt(Math.floor(random() * chars.length));

    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);

    if (this.y * this.fontSize > this.canvasHeight && random() > 0.98) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 15;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#awakening();

    console.log(this.symbols);
  }

  #awakening() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }

  resize() {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#awakening();
  }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 160;
const nextFrame = 100 / fps;
let timer = 0;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  if (timer > nextFrame) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.textAlign = "center";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = gradient; //'#0aff0a';
    ctx.font = effect.fontSize + "px Noto Sans"; //fonts have characters that occupy the same amount of horizontal space
    effect.symbols.forEach((simbolo) => simbolo.draw(ctx));
    timer = 0;
  } else {
    timer += deltaTime;
  }

  requestAnimationFrame(animate);
}

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  effect.resize(canvas.width, canvas.height);
});

window.addEventListener("load", () => animate(0));
