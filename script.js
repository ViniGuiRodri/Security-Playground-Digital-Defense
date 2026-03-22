let currentLevelId = '';
let flagsFound = 0;
let totalFlagsCurrentLevel = 0;
let isVictoryModalOpen = false; 

const niveisPorCategoria = gameDatabase.levels;

const nomesCategorias = {
    'email': 'E-mails Falsos',
    'wpp': 'Golpes no WhatsApp',
    'sms': 'Ligações e SMS',
    'social': 'Redes Sociais',
    'dating': 'Relacionamentos',
    'apps': 'Lojas de Apps',
    'voice': 'Chamadas de Voz'
};

// Avatars Database
const avatarsData = [
    { id: 'default', emoji: '🕵️', price: 0, name: 'Iniciante' },
    { id: 'police', emoji: '👮', price: 150, name: 'Policial' },
    { id: 'ninja', emoji: '🥷', price: 400, name: 'Ninja' },
    { id: 'hero', emoji: '🦸', price: 800, name: 'Herói' },
    { id: 'wizard', emoji: '🧙‍♂️', price: 1200, name: 'Mago' },
    { id: 'king', emoji: '👑', price: 1600, name: 'Realeza' }
];

// Load game state
let gameState = JSON.parse(localStorage.getItem('defesaDigitalProgress')) || { 
    score: 0, 
    completedLevels: [],
    unlockedAvatars: ['default'],
    currentAvatar: 'default',
    hasStarted: false // Tracks if user has seen splash screen
};

// Handle old saves without new properties
if (!gameState.unlockedAvatars) {
    gameState.unlockedAvatars = ['default'];
    gameState.currentAvatar = 'default';
    gameState.hasStarted = false;
}

if(localStorage.getItem('defesaDigitalTema') === 'dark') {
    document.body.classList.add('dark-mode');
}

function alternarTema() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('defesaDigitalTema', isDark ? 'dark' : 'light');
}

function iniciarJogo() {
    gameState.hasStarted = true;
    salvarProgresso();
    document.getElementById('screen-start').classList.add('hidden');
    document.getElementById('screen-start').classList.remove('active-screen');
    document.getElementById('screen-menu').classList.remove('hidden');
    updateDashboardUI();
}

// Boot check
if(gameState.hasStarted) {
    document.getElementById('screen-start').classList.add('hidden');
    document.getElementById('screen-start').classList.remove('active-screen');
    document.getElementById('screen-menu').classList.remove('hidden');
}

function updateDashboardUI() {
    document.getElementById('ui-global-score').innerText = gameState.score;
    
    // Update Avatar Icon
    const currAva = avatarsData.find(a => a.id === gameState.currentAvatar);
    if(currAva) document.getElementById('ui-avatar').innerText = currAva.emoji;
    
    gameState.completedLevels.forEach(lvl => {
        const badge = document.getElementById(`badge-${lvl.replace('fase-', '')}`);
        if(badge) badge.classList.remove('hidden');
    });

    let totalDeNiveisNoJogo = 0;
    
    for (const cat in niveisPorCategoria) {
        const niveisDestaCategoria = niveisPorCategoria[cat];
        const totalNaCategoria = niveisDestaCategoria.length;
        let concluidosNaCategoria = 0;
        totalDeNiveisNoJogo += totalNaCategoria;

        niveisDestaCategoria.forEach(lvl => {
            if (gameState.completedLevels.includes(lvl)) concluidosNaCategoria++;
        });

        const boxMeta = document.getElementById(`prog-cat-${cat}`);
        if (boxMeta) {
            if (concluidosNaCategoria === totalNaCategoria && totalNaCategoria > 0) {
                boxMeta.innerHTML = `<span style="color: #059669; font-weight: bold;">${concluidosNaCategoria}/${totalNaCategoria} Concluídos ✔️</span>`;
            } else {
                boxMeta.innerText = `${concluidosNaCategoria}/${totalNaCategoria} Níveis Concluídos`;
            }
        }
    }

    let porcentagem = Math.round((gameState.completedLevels.length / Math.max(totalDeNiveisNoJogo, 1)) * 100);
    if(porcentagem > 100) porcentagem = 100; 
    
    document.getElementById('progress-percent').innerText = porcentagem + '%';
    document.getElementById('progress-fill').style.width = porcentagem + '%';
}

function salvarProgresso() {
    localStorage.setItem('defesaDigitalProgress', JSON.stringify(gameState));
    updateDashboardUI();
}

function abrirCategoria(categoriaId) {
    document.getElementById('view-categories').classList.add('hidden');
    document.getElementById('view-levels').classList.remove('hidden');
    
    // Update Dynamic Category Title
    document.getElementById('current-category-title').innerText = nomesCategorias[categoriaId] || "Níveis";
    
    document.querySelectorAll('.level-btn').forEach(btn => {
        if(btn.dataset.category === categoriaId) {
            btn.classList.remove('hidden');
        } else {
            btn.classList.add('hidden');
        }
    });
}

function voltarParaCategorias() {
    document.getElementById('view-levels').classList.add('hidden');
    document.getElementById('view-categories').classList.remove('hidden');
}

function abrirTutorialGlobal() {
    const tutorialHTML = `
        <div class="tutorial-step"><div class="tutorial-number">🕵️</div><div class="tutorial-desc">Você é um <strong>Detetive Cibernético</strong>. Seu trabalho é ler conversas e mensagens suspeitas.</div></div>
        <div class="tutorial-step"><div class="tutorial-number">🔍</div><div class="tutorial-desc">Toque em erros para ganhar <strong>+20 pontos</strong>. Complete a fase para ganhar <strong>+100 pontos</strong>!</div></div>
        <div class="tutorial-step"><div class="tutorial-number">🛒</div><div class="tutorial-desc">Use seus pontos na Loja clicando na sua foto de perfil na tela inicial!</div></div>
    `;
    let botoes = `<button class="modal-btn success" onclick="fecharModalSemAcao()">Entendi, vamos jogar!</button>
                  <button class="modal-btn secondary" style="margin-top: 10px; border-color: #ef4444; color: #ef4444;" onclick="resetarJogo()">Zerar meu Progresso</button>`;
    showModal('Como Jogar:', tutorialHTML, '🛡️', botoes);
}

function resetarJogo() {
    if(confirm("Tem certeza que deseja apagar todo o seu progresso e recomeçar do zero?")) {
        localStorage.removeItem('defesaDigitalProgress');
        location.reload();
    }
}

function abrirFase(idDaFase, totalDeFlags) {
    currentLevelId = idDaFase;
    flagsFound = 0;
    totalFlagsCurrentLevel = totalDeFlags;
    isVictoryModalOpen = false;
    
    document.getElementById('counter-' + currentLevelId).innerText = 0;
    document.getElementById('screen-' + currentLevelId).querySelectorAll('.flag-found').forEach(item => {
        item.classList.add('flag-target');
        item.classList.remove('flag-found');
    });

    document.getElementById('screen-menu').classList.add('hidden');
    document.getElementById('screen-' + currentLevelId).classList.remove('hidden');
}

function voltarAoMenu() {
    document.getElementById('screen-' + currentLevelId).classList.add('hidden');
    document.getElementById('screen-menu').classList.remove('hidden');
    currentLevelId = '';
}

// Store Mechanics
function abrirLoja() {
    renderizarLoja();
    document.getElementById('store-modal').classList.add('active');
}

function fecharLoja() {
    document.getElementById('store-modal').classList.remove('active');
}

function renderizarLoja() {
    const grid = document.getElementById('avatar-grid');
    grid.innerHTML = '';
    avatarsData.forEach(ava => {
        const isUnlocked = gameState.unlockedAvatars.includes(ava.id);
        const isEquipped = gameState.currentAvatar === ava.id;
        
        let btnText = isEquipped ? 'Usando' : (isUnlocked ? 'Equipar' : `${ava.price} pts`);
        let statusClass = isEquipped ? 'equipped' : (isUnlocked ? 'unlocked' : 'locked');
        
        grid.innerHTML += `
            <div class="avatar-item ${statusClass}" onclick="comprarOuEquipar('${ava.id}')">
                <div class="avatar-emoji">${ava.emoji}</div>
                <div class="avatar-price">${btnText}</div>
            </div>
        `;
    });
}

function comprarOuEquipar(avaId) {
    const ava = avatarsData.find(a => a.id === avaId);
    const isUnlocked = gameState.unlockedAvatars.includes(ava.id);
    
    if (isUnlocked) {
        gameState.currentAvatar = ava.id;
        salvarProgresso();
        renderizarLoja();
    } else {
        if (gameState.score >= ava.price) {
            gameState.score -= ava.price;
            gameState.unlockedAvatars.push(ava.id);
            gameState.currentAvatar = ava.id;
            salvarProgresso();
            renderizarLoja();
        } else {
            alert('Pontos insuficientes! Encontre mais golpes para juntar pontos.');
        }
    }
}

document.querySelectorAll('.flag-target').forEach(item => {
    item.addEventListener('click', function() {
        if(this.classList.contains('flag-found')) return;
        
        const flagId = this.id; 
        this.classList.add('flag-found');
        this.classList.remove('flag-target');
        flagsFound++;
        
        // Add points for finding a flag
        gameState.score += 20;
        salvarProgresso();

        document.getElementById('counter-' + currentLevelId).innerText = flagsFound;
        
        if(navigator.vibrate) navigator.vibrate(100);
        
        let info = gameDatabase.explanations[flagId];
        if (!info) {
            info = { title: "Atenção!", text: "Sempre desconfie de mensagens com esse formato." };
        }
        
        let btnHtml = `<button class="modal-btn" onclick="fecharModalNormal()">Entendi (+20 pts)</button>`;
        showModal(info.title, info.text, '🚨', btnHtml);
    });
});

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

    if (flagsFound === totalFlagsCurrentLevel && !isVictoryModalOpen) {
        isVictoryModalOpen = true; 
        
        if (!gameState.completedLevels.includes(currentLevelId)) {
            gameState.completedLevels.push(currentLevelId);
            // Level completion bonus
            gameState.score += 100;
            salvarProgresso();
        }
        
        setTimeout(() => {
            if(gameState.completedLevels.length === 11) {
                let btnCertificado = `<button class="modal-btn success" onclick="voltarAoMenuDaVitoria()">Finalizar e Voltar</button>`;
                showModal('Parabéns, Detetive! 🎓', 'Você completou TODAS as missões! Vá até a Loja e veja se consegue comprar o Avatar Final.', '🏆', btnCertificado);
            } else {
                let botoesVitoria = `<button class="modal-btn success" onclick="voltarAoMenuDaVitoria()">🏠 Voltar aos Níveis</button>`;
                showModal('Fase Concluída! 🏆', 'Você identificou todos os Sinais de Golpe e ganhou um <strong>Bônus de 100 Pontos</strong>!', '🛡️', botoesVitoria);
            }
        }, 400); 
    }
}

updateDashboardUI();