import { state } from './state.js';
import { avatarsData, niveisPorCategoria, nomesCategorias } from './database.js';

export const UI = {
    updateDashboard() {
        document.getElementById('ui-global-score').innerText = state.data.score;
        
        const currAva = avatarsData.find(a => a.id === state.data.currentAvatar);
        if(currAva) document.getElementById('ui-avatar').innerText = currAva.emoji;
        
        state.data.completedLevels.forEach(lvl => {
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
                if (state.data.completedLevels.includes(lvl)) concluidosNaCategoria++;
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

        let porcentagem = Math.round((state.data.completedLevels.length / Math.max(totalDeNiveisNoJogo, 1)) * 100);
        if(porcentagem > 100) porcentagem = 100; 
        
        document.getElementById('progress-percent').innerText = porcentagem + '%';
        document.getElementById('progress-fill').style.width = porcentagem + '%';
    },

    showModal(title, textOrHTML, icon, buttonsHTML) {
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-text').innerHTML = textOrHTML; 
        document.getElementById('modal-icon').innerText = icon;
        document.getElementById('modal-actions').innerHTML = buttonsHTML;
        document.getElementById('info-modal').classList.add('active'); 
    },

    closeModal() {
        document.getElementById('info-modal').classList.remove('active');
    },

    openCategory(categoriaId) {
        document.getElementById('view-categories').classList.add('hidden');
        document.getElementById('view-levels').classList.remove('hidden');
        document.getElementById('current-category-title').innerText = nomesCategorias[categoriaId] || "Níveis";
        
        document.querySelectorAll('.level-btn').forEach(btn => {
            if(btn.dataset.category === categoriaId) {
                btn.classList.remove('hidden');
            } else {
                btn.classList.add('hidden');
            }
        });
    },

    backToCategories() {
        document.getElementById('view-levels').classList.add('hidden');
        document.getElementById('view-categories').classList.remove('hidden');
    },

    renderStore(buyOrEquipCallback) {
        const grid = document.getElementById('avatar-grid');
        grid.innerHTML = '';
        avatarsData.forEach(ava => {
            const isUnlocked = state.data.unlockedAvatars.includes(ava.id);
            const isEquipped = state.data.currentAvatar === ava.id;
            
            let btnText = isEquipped ? 'Usando' : (isUnlocked ? 'Equipar' : `${ava.price} pts`);
            let statusClass = isEquipped ? 'equipped' : (isUnlocked ? 'unlocked' : 'locked');
            
            const div = document.createElement('div');
            div.className = `avatar-item ${statusClass}`;
            div.onclick = () => buyOrEquipCallback(ava.id);
            div.innerHTML = `
                <div class="avatar-emoji">${ava.emoji}</div>
                <div class="avatar-price">${btnText}</div>
            `;
            grid.appendChild(div);
        });
    },

    openStore(buyOrEquipCallback) {
        this.renderStore(buyOrEquipCallback);
        document.getElementById('store-modal').classList.add('active');
    },

    closeStore() {
        document.getElementById('store-modal').classList.remove('active');
    }
};