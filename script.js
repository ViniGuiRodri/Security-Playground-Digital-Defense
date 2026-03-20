let currentLevelId = '';
let flagsFound = 0;
let totalFlagsCurrentLevel = 0;
let isVictoryModalOpen = false; 

// Fetch the levels structure from database.js
const niveisPorCategoria = gameDatabase.levels;

// Load game state from localStorage or initialize
let gameState = JSON.parse(localStorage.getItem('defesaDigitalProgress')) || { score: 0, completedLevels:[] };

// Apply saved theme preference (Dark/Light)
if(localStorage.getItem('defesaDigitalTema') === 'dark') {
    document.body.classList.add('dark-mode');
}

// Function to toggle between Dark and Light mode
function alternarTema() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('defesaDigitalTema', isDark ? 'dark' : 'light');
}

// Update the main dashboard UI elements (scores, progress, badges)
function updateDashboardUI() {
    document.getElementById('ui-global-score').innerText = gameState.score;
    
    // Update completed badges visibility
    gameState.completedLevels.forEach(lvl => {
        const badge = document.getElementById(`badge-${lvl.replace('fase-', '')}`);
        if(badge) badge.classList.remove('hidden');
    });

    let totalDeNiveisNoJogo = 0;
    
    // Calculate progress for each category
    for (const cat in niveisPorCategoria) {
        const niveisDestaCategoria = niveisPorCategoria[cat];
        const totalNaCategoria = niveisDestaCategoria.length;
        let concluidosNaCategoria = 0;
        totalDeNiveisNoJogo += totalNaCategoria;

        niveisDestaCategoria.forEach(lvl => {
            if (gameState.completedLevels.includes(lvl)) concluidosNaCategoria++;
        });

        // Update category box text
        const boxMeta = document.getElementById(`prog-cat-${cat}`);
        if (boxMeta) {
            if (concluidosNaCategoria === totalNaCategoria && totalNaCategoria > 0) {
                boxMeta.innerHTML = `<span style="color: #059669; font-weight: bold;">${concluidosNaCategoria}/${totalNaCategoria} Concluídos ✔️</span>`;
            } else {
                boxMeta.innerText = `${concluidosNaCategoria}/${totalNaCategoria} Níveis Concluídos`;
            }
        }
    }

    // Update global progress bar
    let porcentagem = Math.round((gameState.completedLevels.length / Math.max(totalDeNiveisNoJogo, 1)) * 100);
    if(porcentagem > 100) porcentagem = 100; 
    
    document.getElementById('progress-percent').innerText = porcentagem + '%';
    document.getElementById('progress-fill').style.width = porcentagem + '%';
}

// Save progress to localStorage
function salvarProgresso() {
    localStorage.setItem('defesaDigitalProgress', JSON.stringify(gameState));
    updateDashboardUI();
}

// Open a specific category view
function abrirCategoria(categoriaId) {
    document.getElementById('view-categories').classList.add('hidden');
    document.getElementById('view-levels').classList.remove('hidden');
    
    // Filter and display levels belonging to the selected category
    document.querySelectorAll('.level-btn').forEach(btn => {
        if(btn.dataset.category === categoriaId) {
            btn.classList.remove('hidden');
        } else {
            btn.classList.add('hidden');
        }
    });
}

// Return to the categories view from the levels list
function voltarParaCategorias() {
    document.getElementById('view-levels').classList.add('hidden');
    document.getElementById('view-categories').classList.remove('hidden');
}

// Open the main tutorial modal
function abrirTutorialGlobal() {
    const tutorialHTML = `
        <div class="tutorial-step"><div class="tutorial-number">🕵️</div><div class="tutorial-desc">Você é um <strong>Detetive Cibernético</strong>. Seu trabalho é ler conversas e mensagens suspeitas.</div></div>
        <div class="tutorial-step"><div class="tutorial-number">🔍</div><div class="tutorial-desc">Fique atento! Desconfie de erros, tom de urgência ou pedidos de dinheiro.</div></div>
        <div class="tutorial-step"><div class="tutorial-number">🚨</div><div class="tutorial-desc">Ao encontrar algo suspeito, <strong>toque nele</strong> para marcar o <strong>Sinal de Golpe</strong>.</div></div>
    `;
    let botoes = `<button class="modal-btn success" onclick="fecharModalSemAcao()">Entendi, vamos jogar!</button>
                  <button class="modal-btn secondary" style="margin-top: 10px; border-color: #ef4444; color: #ef4444;" onclick="resetarJogo()">Zerar meu Progresso (Resetar)</button>`;
    showModal('Como Jogar:', tutorialHTML, '🛡️', botoes);
}

// Reset all game data
function resetarJogo() {
    if(confirm("Tem certeza que deseja apagar todo o seu progresso e recomeçar do zero?")) {
        localStorage.removeItem('defesaDigitalProgress');
        location.reload();
    }
}

// Open a specific game level
function abrirFase(idDaFase, totalDeFlags) {
    currentLevelId = idDaFase;
    flagsFound = 0;
    totalFlagsCurrentLevel = totalDeFlags;
    isVictoryModalOpen = false;
    
    // Reset counters and targets
    document.getElementById('counter-' + currentLevelId).innerText = 0;
    document.getElementById('screen-' + currentLevelId).querySelectorAll('.flag-found').forEach(item => {
        item.classList.add('flag-target');
        item.classList.remove('flag-found');
    });

    document.getElementById('screen-menu').classList.add('hidden');
    document.getElementById('screen-' + currentLevelId).classList.remove('hidden');
}

// Return to the main menu from a game level
function voltarAoMenu() {
    document.getElementById('screen-' + currentLevelId).classList.add('hidden');
    document.getElementById('screen-menu').classList.remove('hidden');
    currentLevelId = '';
}

// Hint Mechanics: Highlights an unfound flag
let hintTimeout;
function usarDica() {
    const flagsDisponiveis = document.getElementById('screen-' + currentLevelId).querySelectorAll('.flag-target:not(.flag-found)');
    if (flagsDisponiveis.length > 0) {
        const flagSorteada = flagsDisponiveis[0]; 
        
        // Scroll slightly to make sure it's in view
        flagSorteada.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        flagSorteada.classList.add('hint-active');
        
        if (hintTimeout) clearTimeout(hintTimeout);
        // Remove the hint highlight after 3 seconds
        hintTimeout = setTimeout(() => { flagSorteada.classList.remove('hint-active'); }, 3000);
    }
}

// Target click event logic
document.querySelectorAll('.flag-target').forEach(item => {
    item.addEventListener('click', function() {
        // Prevent clicking already found items
        if(this.classList.contains('flag-found')) return;
        
        const flagId = this.id; 
        this.classList.add('flag-found');
        this.classList.remove('flag-target');
        this.classList.remove('hint-active'); 
        flagsFound++;
        document.getElementById('counter-' + currentLevelId).innerText = flagsFound;
        
        // Vibrate slightly if supported on mobile
        if(navigator.vibrate) navigator.vibrate(100);
        
        // Fetch explanation from database
        let info = gameDatabase.explanations[flagId];
        
        // Fallback robusto para evitar que o modal deixe de aparecer (caso de erro de cache)
        if (!info) {
            info = { 
                title: "Atenção!", 
                text: "Você encontrou um sinal suspeito muito importante. Sempre desconfie de mensagens assim." 
            };
        }
        
        let btnHtml = `<button class="modal-btn" onclick="fecharModalNormal()">Entendi!</button>`;
        showModal(info.title, info.text, '🚨', btnHtml);
    });
});

// Modal Logic
const modal = document.getElementById('info-modal');

function showModal(title, textOrHTML, icon, buttonsHTML) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerHTML = textOrHTML; 
    document.getElementById('modal-icon').innerText = icon;
    document.getElementById('modal-actions').innerHTML = buttonsHTML;
    modal.classList.add('active'); 
}

function fecharModalSemAcao() { modal.classList.remove('active'); }

function voltarAoMenuDaVitoria() {
    fecharModalSemAcao();
    voltarAoMenu();
}

function fecharModalNormal() {
    modal.classList.remove('active'); 

    // Check win condition
    if (flagsFound === totalFlagsCurrentLevel && !isVictoryModalOpen) {
        isVictoryModalOpen = true; 
        
        if (!gameState.completedLevels.includes(currentLevelId)) {
            gameState.completedLevels.push(currentLevelId);
            gameState.score += 100;
            salvarProgresso();
        }
        
        setTimeout(() => {
            // Check if all 11 levels are completed (8 old + 3 new)
            if(gameState.completedLevels.length === 11) {
                let btnCertificado = `<button class="modal-btn success" onclick="voltarAoMenuDaVitoria()">Finalizar e Voltar</button>`;
                showModal('Parabéns, Detetive! 🎓', 'Você completou TODAS as missões e identificou todos os golpes! Mostre para seus amigos e ajude a proteger a sua família.', '🏆', btnCertificado);
            } else {
                let botoesVitoria = `<button class="modal-btn success" onclick="voltarAoMenuDaVitoria()">🏠 Voltar aos Níveis</button>`;
                showModal('Muito Bem! 🏆', 'Você identificou todos os Sinais de Golpe e se protegeu com sucesso!', '🛡️', botoesVitoria);
            }
        }, 400); 
    }
}

// Initialize the dashboard UI on load
updateDashboardUI();
