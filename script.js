const canvas = document.getElementById('canvasMatrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
gradient.addColorStop(0, '#0aff0a');
gradient.addColorStop(0.2, '#46af46');
gradient.addColorStop(0.4, '#147914');
gradient.addColorStop(0.8, '#04fd04ad');
gradient.addColorStop(1, '#0aff0a');


class Simbolo {
    constructor(x, y, fontSize, canvasHeight){
        this.caracteres = "ﺖ	ﺚ	ﺪ	ﺫ	ﺮ	ﺯ	ﺲ	ﺶ	ﺺ	ﺽ	ﻄ	ﻅ	ﻞ	ﻦ ﺍ	ﺐ	ﺝ	ﺡ	ﺥ	ﻉ	ﻍ	ﻒ	ﻖ	ﻙ	ﻢ	ﻩ	ﻮ	ﻱ abcdefghijklmnopqrstuvxzywABCDEFGHIJKLMNOPQRSTUVXZWY<>!@#$%¨&*+ºª®¿ñÑªíóú£øÜØ×ƒÿÖ☺1234567890";
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }
    draw(context){
        this.text = this.caracteres.charAt(Math.floor(Math.random()*this.caracteres.length));
        
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98){
            this.y = 0;
        } else {
            this.y +=1;
        } 
    }
}

class Efeito {
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 15;
        this.colunas = this.canvasWidth/this.fontSize;
        this.simbolos = [];
        this.#despertar();
        console.log(this.simbolos);
    }
    #despertar(){
        for(let i = 0; i < this.colunas; i++){
            this.simbolos[i] = new Simbolo(i, 0, this.fontSize, this.canvasHeight);
        }
    }
    resize(){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.colunas = this.canvasWidth/this.fontSize;
        this.simbolos = [];
        this.#despertar();
    }
}

const efeito = new Efeito(canvas.width, canvas.height)
let lastTime = 0;
const fps = 160;
const nextFrame = 100/fps;
let timer = 0;

function animacao(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame){
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = gradient; //'#0aff0a';
        ctx.font = efeito.fontSize + 'px monospace'; //fonts have characters that occupy the same amount of horizontal space
        efeito.simbolos.forEach(simbolo => simbolo.draw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    }
    
    requestAnimationFrame(animacao);
}
animacao(0);
window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    efeito.resize(canvas.width, canvas.height);
});
