const binarios = ['01110011 01101111 01100110 01110100 01110111 01100001 01110010 01100101', '01110000 01111001 01110100 01101000 01101111 01101110', '01100100 01100001 01110100 01100001 01110011 01100011 01101001 01100101 01101110 01100011 01100101', '01100110 01110010 01100001 01101101 01100101 01110111 01101111 01110010 01101011'];
const respostaBinarios = ['software', 'python', 'datascience', 'framework'];

const respostaCifraDeCesar = ['inteligencia artificial', 'desempenho', 'confiabilidade', 'usabilidade', 'responsividade', 'manutenibilidade'];

const respostaGenius = [5,5,3,4,1,2,4,3,5,1];

const sons = {
    1: new Audio('sons/som1.mp3'),
    2: new Audio('sons/som2.mp3'),
    3: new Audio('sons/som3.mp3'),
    4: new Audio('sons/som4.mp3'),
    5: new Audio('sons/som5.mp3'),
}

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
        mudarTela.style.backgroundImage = 'url(/imgs/fim.png)'
    }

    localStorage.setItem('tempoAtual', tempo);
    tempo--;
}

function iniciarTimer() {
    if (contagem) return; 
    atualizarTimer();
    contagem = setInterval(atualizarTimer, 1000);
}

function temporizador() {
    timerElement = document.querySelector('.timer');
    atualizarTimer();
    iniciarTimer();
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
            </div>
        </div>
    </main>`;

    temporizador();

    const senha = document.getElementById('senha');

    senha.addEventListener('keypress', (event) => {
        if(event.key === 'Enter') {
            const senhaInserida = senha.value.toLowerCase();
            
            const senhaCorreta = respostaBinarios[binarioDaVez];

            if (senhaInserida === senhaCorreta) {
                    let cifraValor = sortearNumero(1, 25);
                    let cifraDaVez = sortearNumero(0, respostaCifraDeCesar.length - 1);
                    let palavraCriptografada = respostaCifraDeCesar[cifraDaVez]

                    mudarTela.innerHTML = `
                    <main class="display">
                        <div class="desafio">
                            <p class="desafio-titulo">2. Cifra de Cesar</p>
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
                            </div>
                        </div>
                    </main>`;
                
                const senha = document.getElementById('senha');

                senha.addEventListener('keypress', (event) => {
                    if(event.key === 'Enter'){
                        const senhaInserida = senha.value.toLowerCase();

                        if (senhaInserida === palavraCriptografada) {
                            mudarTela.innerHTML = `
                                <main class="display">
                                    <div class="desafio">
                                        <p class="desafio-titulo">3. Genius</p>
                                        <div class="quadrados">
                                            <div class="quadrado" data-id="1"></div>
                                            <div class="quadrado" data-id="2"></div>
                                            <div class="quadrado" data-id="3"></div>
                                            <div class="quadrado" data-id="4"></div>
                                            <div class="quadrado" data-id="5"></div>
                                        </div>
                                    </div>
                                    <div class="cronometro">
                                        <p class="timer"></p>
                                        <div class="nivel">
                                            <img src="imgs/cadeado aberto.png">
                                            <img src="imgs/cadeado aberto.png">
                                            <img src="imgs/cadeado fechado.png">
                                        </div>
                                    </div>
                                </main>`;

                            let ordemClique = [];
                            const quadrados = document.querySelectorAll('.quadrado');

                            quadrados.forEach(quadrado => {
                                quadrado.addEventListener('click', () => {
                                    const id = parseInt(quadrado.dataset.id);
                                    ordemClique.push(id);

                                    sons[1].currentTime = 0;
                                    sons[id].play();

                                    const index = ordemClique.length - 1;

                                    if (ordemClique[index] !== respostaGenius[index]) {
                                        quadrados.forEach (el  => el.classList.add('errou'));
                                        setTimeout(() => {
                                            quadrados.forEach (el  => el.classList.remove('errou'));
                                            ordemClique = [];
                                        }, 1000);
                                        return;
                                    }

                                    if (ordemClique.length === respostaGenius.length) {
                                        mudarTela.style.backgroundImage = 'none';
                                        mudarTela.style.background = 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("../imgs/bg-final.jpg") center/cover no-repeat';
                                        mudarTela.innerHTML = `
                                            <main id="console" role="main" aria-labelledby="panelTitle">
                                                <div class="header">
                                                    <div class="brand">
                                                    <div class="logo">SH</div>
                                                    <div>
                                                        <h1>Shinra Data Control</h1>
                                                        <p>Sistema de Segurança — Unidade Nível: Sektor 7</p>
                                                    </div>
                                                    </div>

                                                    <div style="display:flex;align-items:center;gap:12px">
                                                    <div class="leds" aria-hidden="true">
                                                        <div class="led r" id="led-red"></div>
                                                        <div class="led y" id="led-yellow"></div>
                                                        <div class="led g" id="led-green"></div>
                                                    </div>
                                                    <div style="font-family:var(--mono);color:#9fbfb7;font-size:13px">STATUS: <strong id="statusText" style="color:#f3fffb;margin-left:8px">ALERTA</strong></div>
                                                    </div>
                                                </div>

                                                <!-- left: terminal / logs -->
                                                <section class="terminal" aria-label="Terminal">
                                                    <div class="title">
                                                    <div>CONSOLE / NÚCLEO</div>
                                                    <div class="status">Última verificação: <span id="lastCheck">--:--:--</span></div>
                                                    </div>

                                                    <div class="screen" id="screen">
                                                    <div class="line muted">Inicializando módulos…</div>
                                                    <div class="line muted">Carregando firewall de nível A-12…</div>
                                                    <div class="line">ACESSO: Integridade do núcleo — <strong>COMPROMETIDA</strong></div>
                                                    <div class="line">REQUISIÇÃO: Desativação do sistema de coleta</div>
                                                    <div class="line">Digite a senha de desativação no painel de controle à direita.</div>
                                                    <div class="line" id="log-area" style="margin-top:12px"></div>
                                                    </div>
                                                </section>

                                                <!-- right: controls -->
                                                <aside class="controls" aria-label="Controles">
                                                    <div>
                                                    <div class="panel-title"><span id="panelTitle">PAINEL DE DESATIVAÇÃO</span><span class="hint">Protocolo: <strong>Ω-7</strong></span></div>

                                                    <div class="timer-wrap" style="margin-top:6px">
                                                        <p class="timer-shinra" aria-live="polite" id="timer">00:00</p>
                                                        <div style="display:flex;flex-direction:column;gap:6px">
                                                        <div class="hint">Tempo restante</div>
                                                        <div class="hint" id="attemptsHint">Tentativas restantes: <strong id="attempts">5</strong></div>
                                                        </div>
                                                    </div>

                                                    <div style="margin-top:12px" class="input-row">
                                                        <input class="code" id="codeInput" type="password" placeholder="Senha de desativação" aria-label="Senha de desativação" />
                                                        <button id="submit" aria-label="Enviar código">CONFIRM</button>
                                                    </div>

                                                    <div style="margin-top:12px">
                                                        <div id="feedback" class="feedback muted">Aguardando entrada...</div>
                                                    </div>
                                                    </div>

                                                    <div style="margin-top:auto">
                                                    <div class="muted" style="font-size:12px">Procedimento: insira o código correto e pressione <strong>CONFIRM</strong>. O sistema bloqueará após esgotar tentativas.</div>
                                                    </div>
                                                </aside>

                                                <div class="overlay" id="overlay" aria-hidden="true">
                                                    <div class="burst" id="burst">SISTEMA DESATIVADO — Coleta interrompida. Saia do local imediatamente.</div>
                                                </div>
                                                </main>
                                        `
                                        // Recupera o tempo salvo da tela anterior
                                        let tempoSalvo = parseInt(localStorage.getItem('tempoAtual')) || 0;
                                        let tempo = tempoSalvo > 0 ? tempoSalvo : 120; // se não houver tempo salvo, define um padrão (ex: 2 minutos)

                                        // Atualiza o timer anterior imediatamente e começa a contagem
                                        let remaining = tempo; // define como tempo restante
                                        localStorage.setItem('tempoAtual', remaining); // garante consistência

                                        const MAX_ATTEMPTS = 5;
                                        const DEACTIVATE_CODE = "Fofuxo2024"; // código de desativação
                                        const timerEl = document.getElementById('timer');
                                        const codeInput = document.getElementById('codeInput');
                                        const submitBtn = document.getElementById('submit');
                                        const attemptsEl = document.getElementById('attempts');
                                        const feedbackEl = document.getElementById('feedback');
                                        const logArea = document.getElementById('log-area');
                                        const overlay = document.getElementById('overlay');
                                        const burst = document.getElementById('burst');
                                        const statusText = document.getElementById('statusText');
                                        const ledRed = document.getElementById('led-red');
                                        const ledYellow = document.getElementById('led-yellow');
                                        const ledGreen = document.getElementById('led-green');
                                        const lastCheck = document.getElementById('lastCheck');

                                        let attempts = MAX_ATTEMPTS;
                                        let timerInterval = null;
                                        let locked = false;

                                        // inicializa UI
                                        attemptsEl.textContent = attempts;
                                        updateTimerDisplay();
                                        appendLog('Painel online. Recuperando contagem de missão anterior...');
                                        startTimer(); // 🟢 inicia automaticamente ao abrir

                                        function appendLog(text) {
                                        const t = new Date().toLocaleTimeString();
                                        logArea.innerHTML += `<div class="line"><span class="muted">[${t}]</span> ${text}</div>`;
                                        // scroll if needed
                                        logArea.parentElement.scrollTop = logArea.parentElement.scrollHeight;
                                        }

                                        // timer control
                                        function startTimer() {
                                        if (timerInterval) return;
                                        lastCheck.textContent = new Date().toLocaleTimeString();
                                        timerInterval = setInterval(() => {
                                            remaining--;
                                            localStorage.setItem('tempoAtual', remaining);
                                            updateTimerDisplay();

                                            // small LED effects depending on remaining time
                                            if (remaining <= 30) {
                                            flashLed(ledRed, 200);
                                            statusText.textContent = 'CRÍTICO';
                                            statusText.style.color = '#ff4d6d';
                                            } else if (remaining <= 90) {
                                            pulseLed(ledYellow);
                                            statusText.textContent = 'ALERTA';
                                            statusText.style.color = '#ffd580';
                                            } else {
                                            pulseLed(ledGreen, true);
                                            statusText.textContent = 'OPERACIONAL';
                                            statusText.style.color = '#66ffcc';
                                            }

                                            if (remaining <= 0) {
                                            clearInterval(timerInterval);
                                            timerInterval = null;
                                            onTimerExpired();
                                            }
                                        }, 1000);
                                        }

                                        function updateTimerDisplay() {
                                        const mm = String(Math.floor(remaining / 60)).padStart(2,'0');
                                        const ss = String(Math.max(0, remaining % 60)).padStart(2,'0');
                                        timerEl.textContent = `${mm}:${ss}`;
                                        }

                                        function onTimerExpired() {
                                        appendLog('TEMPO ESGOTADO — Bloqueio do sistema iniciado.');
                                        feedbackEl.className = 'feedback err';
                                        feedbackEl.textContent = 'TEMPO ESGOTADO — Sistema bloqueado';
                                        lockPanel();
                                        }

                                        // lock the panel (when attempts exhausted or timer expired)
                                        function lockPanel() {
                                        locked = true;
                                        codeInput.disabled = true;
                                        submitBtn.disabled = true;
                                        statusText.textContent = 'BLOQUEADO';
                                        statusText.style.color = '#ff4d6d';
                                        // fast red flash
                                        flashLed(ledRed, 120, 6);
                                        appendLog('Painel bloqueado. Contato de emergência requerido.');
                                        }

                                        // success flow
                                        function onSuccess() {
                                        clearInterval(timerInterval);
                                        timerInterval = null;
                                        appendLog('Código aceito. Iniciando sequência de desativação...');
                                        feedbackEl.className = 'feedback ok';
                                        feedbackEl.textContent = 'CÓDIGO VÁLIDO — Desativando sistema...';
                                        // show overlay
                                        overlay.classList.add('show');
                                        overlay.setAttribute('aria-hidden','false');

                                        // status change
                                        statusText.textContent = 'DESATIVADO';
                                        statusText.style.color = '#66ffcc';
                                        // play success led
                                        chaseSuccess();
                                        // disable inputs
                                        codeInput.disabled = true;
                                        submitBtn.disabled = true;

                                        // final log and visual
                                        setTimeout(() => {
                                            appendLog('SISTEMA DESATIVADO — Coleta interrompida. Saia do local imediatamente.');
                                        }, 800);
                                        }

                                        // UI helpers (LED effects)
                                        let ledPulseTimer = null;
                                        function pulseLed(el, gentle=false) {
                                        // set simple css animation via JS (one shot)
                                        el.animate([{ boxShadow: '0 6px 18px rgba(0,0,0,0.2) inset' }, { boxShadow: '0 10px 28px rgba(0,0,0,0.35) inset' }], {
                                            duration: gentle ? 900 : 500,
                                            iterations: 1
                                        }).onfinish = () => {};
                                        }

                                        function flashLed(el, ms=200, times=1) {
                                        let i = 0;
                                        const orig = el.style.opacity || '';
                                        function step(){
                                            el.style.visibility = (el.style.visibility === 'hidden') ? 'visible' : 'hidden';
                                            i++;
                                            if (i < times*2) setTimeout(step, ms);
                                            else el.style.visibility = 'visible';
                                        }
                                        step();
                                        }

                                        function chaseSuccess(){
                                        const seq = [ledGreen, ledYellow, ledGreen, ledRed];
                                        let i=0;
                                        const run = setInterval(() => {
                                            seq.forEach((l, idx) => l.style.opacity = (idx === (i % seq.length)) ? '1' : '0.5');
                                            i++;
                                            if (i>12) {
                                            clearInterval(run);
                                            // final set
                                            ledGreen.style.opacity = '1';
                                            ledYellow.style.opacity = '0.5';
                                            ledRed.style.opacity = '0.3';
                                            }
                                        }, 160);
                                        }

                                        // check code handler
                                        function checkCode(input) {
                                        // normalize simple spacing and case
                                        return input.trim() === DEACTIVATE_CODE;
                                        }

                                        // attach events
                                        submitBtn.addEventListener('click', () => {
                                        if (locked) return;
                                        const code = codeInput.value || '';
                                        // start timer on first interaction
                                        if (!timerInterval) startTimer();

                                        if (!code) {
                                            feedbackEl.className = 'feedback err';
                                            feedbackEl.textContent = 'Insira um código antes de confirmar.';
                                            return;
                                        }

                                        if (checkCode(code)) {
                                            onSuccess();
                                        } else {
                                            attempts--;
                                            attemptsEl.textContent = attempts;
                                            feedbackEl.className = 'feedback err';
                                            feedbackEl.textContent = 'CÓDIGO INVÁLIDO — Acesso negado';
                                            appendLog(`Tentativa inválida: "${escapeHtml(code)}" — Tentativas restantes: ${attempts}`);

                                            // small shake animation for input
                                            codeInput.animate([
                                            { transform:'translateX(0)' },
                                            { transform:'translateX(-8px)' },
                                            { transform:'translateX(8px)' },
                                            { transform:'translateX(0)' }
                                            ], { duration: 260 });

                                            flashLed(ledRed, 140);
                                            if (attempts <= 0) {
                                            appendLog('Tentativas esgotadas — Bloqueando painel.');
                                            lockPanel();
                                            }
                                        }
                                        });

                                        // optional: support Enter key
                                        codeInput.addEventListener('keydown', (e)=>{
                                        if (e.key === 'Enter') submitBtn.click();
                                        });

                                        // helper to escape logs
                                        function escapeHtml(str) {
                                        return str.replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
                                        }

                                        // start a subtle ambient log stream (flavor)
                                        let contador = 0;
                                        let flavorInterval = setInterval(() => {
                                        const flavors = [
                                            'Verificando integridade dos módulos…',
                                            'Rede interna: pacotes anômalos detectados.',
                                            'Criptografia secundária: chave parcial requisitada.',
                                            'Rotina de contingência ativada — aguardando confirmação.'
                                        ];
                                        appendLog(flavors[Math.floor(Math.random()*flavors.length)]);

                                        contador++;
                                        if (contador >= 5) clearInterval(flavorInterval);
                                        }, 9000);
                                        

                                        // start initial LED state
                                        ledGreen.style.opacity = '0.6';
                                        ledYellow.style.opacity = '0.5';
                                        ledRed.style.opacity = '0.4';

                                        // expose a function to set new code programmatically (dev use)
                                        window.__setDeactivateCode = (newCode) => {
                                        console.warn('DEACTIVATE_CODE updated via window.__setDeactivateCode — only for dev/testing');
                                        // NOTE: this cannot update the const above; in production you'd wire this differently.
                                        };

                                        // Accessibility: focus input on load
                                        window.addEventListener('load', () => codeInput.focus());
                                        temporizador();
                                    }   
                                });
                            temporizador();
                            });
                        }
                        }
                    });

                temporizador();
            }
        }
    })
});
