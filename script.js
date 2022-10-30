// O método Document.getElementById() pega uma referência para o elemento HTML <canvas>.
// Em seguida, o método HTMLCanvasElement.getContext() pega o contexto daquele elemento - a
// coisa sobre a qual o desenho será renderizado.

// O desenho atual é feito usando a interface CanvasRenderingContext2D. A propriedade fillStyle
// faz o retângulo verde. O método fillRect() coloca seu canto superior direito em (10, 10) e dá
// a ele o tamanho de 150 unidades de largura e 100 de altura.

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

// ctx.fillStyle = 'green';
// ctx.fillRect(10, 10, 150, 100);


//O width atributo especifica a largura do <canvas>elemento, em pixels.
canvas.width = window.innerWidth;
//O height atributo especifica a altura do <canvas>elemento, em pixels.
canvas.height = window.innerHeight;
// innerWidth retorna a largura da viewport de layout da janela . 
// A altura interior da janela—a altura da viewport de layout—pode ser obtida na innerHeightpropriedade.

class Caractere {
    constructor(){

    }
    draw(){

    }
}

class Effect {
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }
}

function animacao(){

}