import { state } from './state.js';
import { UI } from './ui.js';
import { Game } from './game.js';
import { avatarsData } from './database.js';

// Inicia o Tema
state.initTheme();

// Checa se já passou da tela de splash
if(state.data.hasStarted) {
    document.getElementById('screen-start').classList.add('hidden');
    document.getElementById('screen-start').classList.remove('active-screen');
    document.getElementById('screen-menu').classList.remove('hidden');
    UI.updateDashboard();
}

// --------------------------------------------------------------------------
// 🚀 PONTE PARA O HTML (Global Window)
// Como módulos são isolados, precisamos expor as funções pro HTML enxergar
// --------------------------------------------------------------------------
window.iniciarJogo = () => Game.start();
window.alternarTema = () => state.toggleTheme();
window.resetarJogo = () => state.reset();

window.abrirCategoria = (id) => UI.openCategory(id);
window.voltarParaCategorias = () => UI.backToCategories();
window.abrirFase = (id, flags) => Game.openLevel(id, flags);
window.voltarAoMenu = () => Game.exitLevel();

window.fecharModalSemAcao = () => UI.closeModal();
window.fecharModalNormal = () => Game.checkWinCondition();
window.voltarAoMenuDaVitoria = () => { UI.closeModal(); Game.exitLevel(); };

window.abrirTutorialGlobal = () => {
    const tutorialHTML = `
        <div class="tutorial-step"><div class="tutorial-number">🕵️</div><div class="tutorial-desc">Você é um <strong>Detetive Cibernético</strong>. Leia conversas e mensagens suspeitas.</div></div>
        <div class="tutorial-step"><div class="tutorial-number">🔍</div><div class="tutorial-desc">Toque em erros para ganhar <strong>+20 pontos</strong>. Complete a fase para ganhar <strong>+100 pontos</strong>!</div></div>
        <div class="tutorial-step"><div class="tutorial-number">🛒</div><div class="tutorial-desc">Use seus pontos na Loja clicando na sua foto de perfil na tela inicial!</div></div>
    `;
    let botoes = `<button class="modal-btn success" onclick="fecharModalSemAcao()">Entendi, vamos jogar!</button>
                  <button class="modal-btn secondary" style="margin-top: 10px; border-color: #ef4444; color: #ef4444;" onclick="resetarJogo()">Zerar meu Progresso</button>`;
    UI.showModal('Como Jogar:', tutorialHTML, '🛡️', botoes);
};

// Loja
window.abrirLoja = () => UI.openStore(comprarOuEquipar);
window.fecharLoja = () => UI.closeStore();

function comprarOuEquipar(avaId) {
    const ava = avatarsData.find(a => a.id === avaId);
    const isUnlocked = state.data.unlockedAvatars.includes(ava.id);
    
    if (isUnlocked) {
        state.data.currentAvatar = ava.id;
        state.save();
        UI.renderStore(comprarOuEquipar);
        UI.updateDashboard();
    } else {
        if (state.data.score >= ava.price) {
            state.data.score -= ava.price;
            state.data.unlockedAvatars.push(ava.id);
            state.data.currentAvatar = ava.id;
            state.save();
            UI.renderStore(comprarOuEquipar);
            UI.updateDashboard();
        } else {
            alert('Pontos insuficientes! Encontre mais golpes para juntar pontos.');
        }
    }
}

// --------------------------------------------------------------------------
// 🎯 EVENT LISTENERS DAS FASES
// Conecta a lógica de clique nos elementos marcados como "flag-target"
// --------------------------------------------------------------------------
document.querySelectorAll('.flag-target').forEach(item => {
    item.addEventListener('click', function() {
        Game.handleFlagClick(this);
    });
});