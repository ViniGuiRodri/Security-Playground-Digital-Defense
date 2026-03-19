const explanations = {
    'flag-urgency': { title: 'Cuidado com a pressa!', text: 'Golpistas usam o tom de urgência para te impedir de pensar.' },
    // ... Adicione o restante do banco de explicações aqui ...
};

let gameState = JSON.parse(localStorage.getItem('defesaDigitalProgress')) || { score: 0, completedLevels: [] };
const niveisPorCategoria = { 'email': ['fase-email-1'], 'wpp': ['fase-wpp-1'], 'sms': ['fase-sms-1'], 'social': ['fase-social-1'] };

function updateDashboardUI() {
    document.getElementById('ui-global-score').innerText = gameState.score;
    let totalNiveis = 0;
    for (const cat in niveisPorCategoria) {
        let concluidos = 0;
        niveisPorCategoria[cat].forEach(lvl => { if (gameState.completedLevels.includes(lvl)) concluidos++; });
        totalNiveis += niveisPorCategoria[cat].length;
        document.getElementById(`prog-cat-${cat}`).innerText = `${concluidos}/${niveisPorCategoria[cat].length} Concluídos`;
    }
    let porc = Math.round((gameState.completedLevels.length / totalNiveis) * 100) || 0;
    document.getElementById('progress-percent').innerText = porc + '%';
    document.getElementById('progress-fill').style.width = porc + '%';
}

function comecarJogo() {
    document.getElementById('intro-screen').classList.add('intro-hidden');
    sessionStorage.setItem('introVisualizada', 'true');
}

function abrirTutorialGlobal() {
    const html = `<div class="tutorial-step">🕵️ Detetive, seu trabalho é encontrar sinais de golpes.</div>
                  <div class="tutorial-step">🔍 Desconfie de erros, tom de urgência ou pedidos de dinheiro.</div>
                  <div class="tutorial-step">🚩 Toque nos erros para marcar as Red Flags!</div>`;
    showModal('Como Jogar', html, '🛡️', `<button class="modal-btn success" onclick="fecharModalSemAcao()">Entendi!</button>`);
}

function abrirCategoria(cat) {
    document.getElementById('view-categories').classList.add('hidden');
    document.getElementById('view-levels').classList.remove('hidden');
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.classList.toggle('hidden', btn.dataset.category !== cat);
    });
}

function voltarParaCategorias() {
    document.getElementById('view-levels').classList.add('hidden');
    document.getElementById('view-categories').classList.remove('hidden');
}

function showModal(title, content, icon, btns) {
    const m = document.getElementById('info-modal');
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerHTML = content;
    document.getElementById('modal-icon').innerText = icon;
    document.getElementById('modal-actions').innerHTML = btns;
    m.classList.add('active');
}

function fecharModalSemAcao() { document.getElementById('info-modal').classList.remove('active'); }

window.addEventListener('load', () => {
    if (sessionStorage.getItem('introVisualizada') === 'true') document.getElementById('intro-screen').style.display = 'none';
    updateDashboardUI();
});
