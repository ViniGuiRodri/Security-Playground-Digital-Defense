let currentLevelId = '';
let flagsFound = 0;
let totalFlagsCurrentLevel = 0;
let isVictoryModalOpen = false; 

// Puxa a estrutura de níveis do database.js
const niveisPorCategoria = gameDatabase.levels;

let gameState = JSON.parse(localStorage.getItem('defesaDigitalProgress')) || {
    score: 0,
    completedLevels: []
};

function updateDashboardUI() {
    document.getElementById('ui-global-score').innerText = gameState.score;
    
    // Atualiza badges de concluído na lista
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
        <div class="tutorial-step"><div class="tutorial-number">🔍</div><div class="tutorial-desc">Fique atento! Desconfie de erros, tom de urgência ou pedidos de dinheiro.</div></div>
        <div class="tutorial-step"><div class="tutorial-number">🚩</div><div class="tutorial-desc">Ao encontrar um erro, <strong>toque nele</strong> para marcar a 'Red Flag'.</div></div>
    `;
    showModal('Como Jogar:', tutorialHTML, '🛡️', `<button class="modal-btn success" onclick="fecharModalSemAcao()">Entendi, vamos jogar!</button>`);
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

// LOGICA DE CLIQUE NAS FLAGS (Usando o database.js)
document.querySelectorAll('.flag-target').forEach(item => {
    item.addEventListener('click', function() {
        const flagId = this.id; 
        this.classList.add('flag-found');
        this.classList.remove('flag-target'); 
        flagsFound++;
        document.getElementById('counter-' + currentLevelId).innerText = flagsFound;
        
        // Busca a explicação diretamente no database
        const info = gameDatabase.explanations[flagId];
        
        let btnHtml = `<button class="modal-btn" onclick="fecharModalNormal()">Entendi!</button>`;
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

function fecharModalSemAcao() {
    modal.classList.remove('active');
}

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
            gameState.score += 100;
            salvarProgresso();
        }
        
        setTimeout(() => {
            let botoesVitoria = `
                <button class="modal-btn success" onclick="voltarAoMenuDaVitoria()">🏠 Voltar aos Níveis</button>
                <button class="modal-btn secondary" onclick="fecharModalSemAcao()">🔍 Rever Sinais na Fase</button>
            `;
            showModal('Muito Bem! 🏆', 'Você identificou todos os sinais e não caiu no golpe!', '🛡️', botoesVitoria);
        }, 400); 
    }
}

updateDashboardUI();
