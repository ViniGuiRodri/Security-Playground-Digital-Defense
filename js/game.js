import { state } from './state.js';
import { explanations } from './database.js';
import { UI } from './ui.js';

export const Game = {
    currentLevelId: '',
    flagsFound: 0,
    totalFlagsCurrentLevel: 0,
    isVictoryModalOpen: false,

    start() {
        state.data.hasStarted = true;
        state.save();
        document.getElementById('screen-start').classList.add('hidden');
        document.getElementById('screen-start').classList.remove('active-screen');
        document.getElementById('screen-menu').classList.remove('hidden');
        UI.updateDashboard();
    },

    openLevel(idDaFase, totalDeFlags) {
        this.currentLevelId = idDaFase;
        this.flagsFound = 0;
        this.totalFlagsCurrentLevel = totalDeFlags;
        this.isVictoryModalOpen = false;
        
        document.getElementById('counter-' + this.currentLevelId).innerText = 0;
        document.getElementById('screen-' + this.currentLevelId).querySelectorAll('.flag-found').forEach(item => {
            item.classList.add('flag-target');
            item.classList.remove('flag-found');
        });

        document.getElementById('screen-menu').classList.add('hidden');
        document.getElementById('screen-' + this.currentLevelId).classList.remove('hidden');
    },

    exitLevel() {
        document.getElementById('screen-' + this.currentLevelId).classList.add('hidden');
        document.getElementById('screen-menu').classList.remove('hidden');
        this.currentLevelId = '';
    },

    handleFlagClick(element) {
        if(element.classList.contains('flag-found')) return;
        
        const flagId = element.id; 
        element.classList.add('flag-found');
        element.classList.remove('flag-target');
        
        this.flagsFound++;
        state.data.score += 20;
        state.save();

        document.getElementById('counter-' + this.currentLevelId).innerText = this.flagsFound;
        
        if(navigator.vibrate) navigator.vibrate(100);
        
        let info = explanations[flagId] || { title: "Atenção!", text: "Sempre desconfie de mensagens com esse formato." };
        let btnHtml = `<button class="modal-btn" onclick="fecharModalNormal()">Entendi (+20 pts)</button>`;
        
        UI.showModal(info.title, info.text, '🚨', btnHtml);
    },

    checkWinCondition() {
        UI.closeModal(); 

        if (this.flagsFound === this.totalFlagsCurrentLevel && !this.isVictoryModalOpen) {
            this.isVictoryModalOpen = true; 
            
            if (!state.data.completedLevels.includes(this.currentLevelId)) {
                state.data.completedLevels.push(this.currentLevelId);
                state.data.score += 100;
                state.save();
                UI.updateDashboard();
            }
            
            setTimeout(() => {
                if(state.data.completedLevels.length === 11) {
                    let btnCertificado = `<button class="modal-btn success" onclick="voltarAoMenuDaVitoria()">Finalizar e Voltar</button>`;
                    UI.showModal('Parabéns, Detetive! 🎓', 'Você completou TODAS as missões! Vá até a Loja e veja se consegue comprar o Avatar Final.', '🏆', btnCertificado);
                } else {
                    let botoesVitoria = `<button class="modal-btn success" onclick="voltarAoMenuDaVitoria()">🏠 Voltar aos Níveis</button>`;
                    UI.showModal('Fase Concluída! 🏆', 'Você identificou todos os Sinais de Golpe e ganhou um <strong>Bônus de 100 Pontos</strong>!', '🛡️', botoesVitoria);
                }
            }, 400); 
        }
    }
};