const binarios = ['01110011 01101111 01100110 01110100 01110111 01100001 01110010 01100101', '01110000 01111001 01110100 01101000 01101111 01101110', '01100100 01100001 01110100 01100001 01110011 01100011 01101001 01100101 01101110 01100011 01100101', '01100110 01110010 01100001 01101101 01100101 01110111 01101111 01110010 01101011']
const respostaBinarios = ['software', 'python', 'datascience', 'framework']

const respostaCifraDeCesar = ['inteligencia artificial', 'desempenho', 'confiabilidade', 'usabilidade', 'responsividade', 'manutenibilidade']

const iniciar = document.getElementById('botao');
const mudarTela = document.querySelector('body');

let tempo = 10 * 60;
let contagem = null;
let timerElement = null;

function sortearNumero(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function atualizarTimer() {
    if (!timerElement) return; 

    let minutos = Math.floor(tempo / 60);
    let segundos = tempo % 60;

    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;

    timerElement.textContent = `${minutos}:${segundos}`;

    if (tempo <= 0) {
        clearInterval(contagem);
        timerElement.textContent = "00:00";
        mudarTela.innerHTML = '';
        mudarTela.style.backgroundImage = 'url(../imgs/fim.png)'
    }

    tempo--;
}

function iniciarTimer() {
    if (contagem) return; 
    atualizarTimer();
    contagem = setInterval(atualizarTimer, 1000);
}

function cifraDeCesar(texto, deslocamento){
    let resultado = "";

    for (let i=0; i < texto.length; i++){
        let char = texto[i];

        if (char >= 'A' && char <= 'Z') {
            resultado += String.fromCharCode(
                ((char.charCodeAt(0) - 65 + deslocamento + 26) % 26 ) + 65
            );
        }else if (char >= 'a' && char <= 'z'){
            resultado+= String.fromCharCode(
                ((char.charCodeAt(0) - 97 + deslocamento + 26) % 26) + 97
            );
        } else {
            resultado += char;
        }
    }

    return resultado;
}

let binarioDaVez = sortearNumero(0, 3);

iniciar.addEventListener('click', () => {
    mudarTela.innerHTML = `<main class="display">
        <div class="desafio">
            <p class="desafio-titulo">1. Binário</p>
            <p class="desafio-texto">
                ${binarios[binarioDaVez]}
            </p>
            <div class="senha">
                <p>Senha: </p>
                <input type="text" id="senha">
            </div>
        </div>
        <div class="cronometro">
            <p class="timer">10:00</p>
            <div class="nivel">
                <img src="imgs/cadeado fechado.png">
                <img src="imgs/cadeado fechado.png">
                <img src="imgs/cadeado fechado.png">
                <img src="imgs/cadeado fechado.png">
                <img src="imgs/cadeado fechado.png">
            </div>
        </div>
    </main>`;

    timerElement = document.querySelector('.timer');
    atualizarTimer();
    iniciarTimer();

    const senha = document.getElementById('senha');

    senha.addEventListener('keypress', (event) => {
        if(event.key === 'Enter') {
            const senhaInserida = senha.value.toLowerCase();
            
            const senhaCorreta = respostaBinarios[binarioDaVez];

            if (senhaInserida === senhaCorreta) {
                    let cifraValor = sortearNumero(1, 26);
                    let cifraDaVez = sortearNumero(0, respostaCifraDeCesar.length - 1);
                    let palavraCriptografada = respostaCifraDeCesar[cifraDaVez]

                    mudarTela.innerHTML = `
                    <main class="display">
                        <div class="desafio">
                            <p class="desafio-titulo">3. Cifra de Cesar</p>
                            <div class="criptografia">
                                <h2 class="cifra-valor">${cifraValor}</h2>
                                <p class="desafio-texto">${cifraDeCesar(palavraCriptografada, cifraValor)}</p>
                            </div>
                            <div class="senha">
                                <p>Senha: </p>
                                <input type="text" id="senha">
                            </div>
                        </div>
                        <div class="cronometro">
                            <p class="timer"></p>
                            <div class="nivel">
                                <img src="imgs/cadeado aberto.png">
                                <img src="imgs/cadeado aberto.png">
                                <img src="imgs/cadeado fechado.png">
                                <img src="imgs/cadeado fechado.png">
                                <img src="imgs/cadeado fechado.png">
                            </div>
                        </div>
                    </main>`;
                
                const senha = document.getElementById('senha');

                senha.addEventListener('keypress', (event) => {
                    if(event.key === 'Enter'){
                        const senhaInserida = senha.value.toLowerCase();

                        if (senhaInserida === palavraCriptografada) {
                            alert('Parabéns, você concluiu o desafio!');
                        }
                        }
                    });

                timerElement = document.querySelector('.timer');
                atualizarTimer();
                iniciarTimer();
            }
        }
    })
});
