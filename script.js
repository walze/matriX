const canvas = document.getElementById('canvasMatrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Simbolo {
    constructor(x, y, fontSize, canvasHeight){
        this.caracteres = 'abcdefghijklmnopqrstuvxzyw0123456789';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }
    draw(context){
        this.text = this.caracteres.charAt(Math.floor(Math.random()*this.caracteres.length));
        context.fillStyle = '#0aff0a';
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * fontSize > this.canvasHeight){
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
}

const efeito = new Efeito(canvas.width, canvas.height)

function animacao(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.font = efeito.fontSize + 'px monospace'; //fonts have characters that occupy the same amount of horizontal space
    efeito.simbolos.forEach(simbolo => simbolo.draw(ctx));
    requestAnimationFrame(animacao);
}
animacao();