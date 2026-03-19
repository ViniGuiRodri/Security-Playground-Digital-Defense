// BANCO DE EXPLICAÇÕES
const explanations = {
    'flag-urgency': { title: 'Cuidado com a pressa!', text: 'Golpistas usam palavras como "URGENTE" para te assustar. Eles querem que você aja rápido, sem pensar direito.' },
    'flag-domain': { title: 'Olhe bem o remetente!', text: 'Repare no endereço: está escrito "netfiix" com dois "i". Empresas grandes não cometem esses erros de digitação.' },
    'flag-greeting': { title: 'Não usaram seu nome?', text: 'Mensagens que começam com "Olá Cliente" costumam ser enviadas para milhares de pessoas para ver quem cai.' },
    'flag-link': { title: 'Cuidado onde clica!', text: 'Nunca clique no botão direto! Em e-mails suspeitos, é mais seguro abrir o aplicativo oficial da empresa no seu celular.' },
    
    'flag-wpp-photo': { title: 'Não confie só na foto!', text: 'É muito fácil copiar a foto de alguém no Facebook ou Instagram. O golpista pega a foto do seu familiar e coloca no perfil falso.' },
    'flag-wpp-header-number': { title: 'Cadê o nome na agenda?', text: 'Se fosse o seu familiar mesmo, o nome dele apareceria lá em cima, e não apenas um número de telefone estranho!' },
    'flag-wpp-text': { title: 'A desculpa do celular novo', text: 'Sempre começa assim! Eles fingem que o celular quebrou ou caiu na água para justificar o uso de um número que você não conhece.' },
    'flag-wpp-urgency': { title: 'A história triste', text: 'O golpista inventa que o banco bloqueou para justificar por que ele não pode usar a própria conta e precisa da sua ajuda.' },
    'flag-wpp-pix': { title: 'Pediu dinheiro por mensagem?', text: 'Nunca envie dinheiro! Se alguém pedir PIX por mensagem, ligue para a pessoa no número ANTIGO dela (o que você já tem salvo) e converse por voz.' },
    'flag-wpp-thirdparty': { title: 'Nome de um desconhecido!', text: 'Se o dinheiro é para o seu familiar, por que o PIX está em nome de um tal de "Marcos"? Eles usam contas de estranhos (laranjas) para receber o roubo.' },

    'flag-sms-sender': { title: 'Número de celular comum?', text: 'Empresas grandes como os Correios ou Bancos usam números curtos (de 5 ou 6 dígitos) para enviar SMS, não um número de celular normal.' },
    'flag-sms-urgency': { title: 'Ameaça de devolução!', text: 'Os golpistas dizem que você vai perder o pacote ou pagar multa. O objetivo é causar pânico para você clicar no link sem verificar se a mensagem é real.' },
    'flag-sms-link': { title: 'O Link Falso', text: 'O site oficial é apenas "correios.com.br". Os golpistas criam sites falsos com nomes compridos como "correios-taxa-br" para roubar os dados do seu cartão.' },

    'flag-social-sponsored': { title: 'É apenas um Anúncio!', text: 'A palavra "Patrocinado" significa que alguém PAGOU para isso aparecer para você. As redes sociais não verificam se a oferta é verdadeira antes de aceitar o dinheiro do anúncio.' },
    'flag-social-deepfake': { title: 'Vídeo Falso (Deepfake)!', text: 'Hoje em dia, golpistas usam Inteligência Artificial para copiar o rosto e a voz exata de famosos no computador. Desconfie de vídeos maravilhosos.' },
    'flag-social-link': { title: 'Para onde isso leva?', text: 'Nunca clique no botão "Saiba Mais" de promoções absurdas. Ele vai te levar para um site falso pedindo seus dados e seu cartão de crédito.' },
    'flag-social-promise': { title: 'A Promessa Milagrosa', text: 'Ninguém dá celulares ou aparelhos de graça na internet! Se pedem para você pagar apenas o "frete" de um produto gratuito, é golpe na certa.' }
};

let currentLevelId = '';
let flagsFound = 0;
let totalFlagsCurrentLevel = 0;
let isVictoryModalOpen = false; 

// MAPEAMENTO DOS NÍVEIS POR CATEGORIA
const niveisPorCategoria = {
    'email': ['fase-email-1'],
    'wpp': ['fase-wpp-1'],
    'sms': ['fase-sms-1'],
    'social': ['fase-social-1']
};

let gameState = JSON.parse(localStorage.getItem('defesaDigitalProgress')) || {
    score: 0,
    completedLevels: []
};

// --- ATUALIZAÇÃO DA INTERFACE PRINCIPAL ---
function updateDashboardUI() {
    // Atualiza Pontos
    document.getElementById('ui-global-score').innerText = gameState.score;
    
    // Atualiza Selos de Concluído na lista de níveis
    if (gameState.completedLevels.includes('fase-email-1')) document.getElementById('badge-email-1')?.classList.remove('hidden');
    if (gameState.completedLevels.includes('fase-wpp-1')) document.getElementById('badge-wpp-1')?.classList.remove('hidden');
    if (gameState.completedLevels.includes('fase-sms-1')) document.getElementById('badge-sms-1')?.classList.remove('hidden');
    if (gameState.completedLevels.includes('fase-social-1')) document.getElementById('badge-social-1')?.classList.remove('hidden');

    // --- Atualiza a contagem individual de cada Categoria (Ex: 0/1) ---
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
            if (concluidosNaCategoria === totalNaCategoria) {
                boxMeta.innerHTML = `<span style="color: #059669; font-weight: bold;">${concluidosNaCategoria}/${totalNaCategoria} Concluídos ✔️</span>`;
            } else {
                boxMeta.innerText = `${concluidosNaCategoria}/${totalNaCategoria} Níveis Concluídos`;
            }
        }
    }

    // Calcula e Atualiza a Barra de Progresso Global
    let porcentagem = Math.round((gameState.completedLevels.length / totalDeNiveisNoJogo) * 100);
    if(porcentagem > 100) porcentagem = 100; 
    
    document.getElementById('progress-percent').innerText = porcentagem + '%';
    document.getElementById('progress-fill').style.width = porcentagem + '%';
}

function salvarProgresso() {
    localStorage.setItem('defesaDigitalProgress', JSON.stringify(gameState));
    updateDashboardUI();
}

// --- SISTEMA DE NAVEGAÇÃO POR CATEGORIAS ---
const titulosCategorias = {
    'email': '✉️ Casos de E-mail Falso',
    'wpp': '💬 Golpes no WhatsApp',
    'sms': '📞 Ligações e SMS Suspeitos',
    'social': '📱 Redes Sociais e IA'
};

function abrirCategoria(categoriaId) {
    document.getElementById('view-categories').classList.add('hidden');
    document.getElementById('view-levels').classList.remove('hidden');
    document.getElementById('current-category-title').innerText = titulosCategorias[categoriaId];
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

// --- FUNÇÃO DO TUTORIAL GLOBAL ---
function abrirTutorialGlobal() {
    const tutorialHTML = `
        <div class="tutorial-step">
            <div class="tutorial-number">🕵️</div>
            <div class="tutorial-desc">Você é um <strong>Detetive Cibernético</strong>. Seu trabalho é ler conversas e mensagens suspeitas.</div>
        </div>
        <div class="tutorial-step">
            <div class="tutorial-number">🔍</div>
            <div class="tutorial-desc">Fique atento! Desconfie de mensagens com erros de ortografia, tom de urgência, ameaças ou pedidos estranhos de dinheiro.</div>
        </div>
        <div class="tutorial-step">
            <div class="tutorial-number">🚩</div>
            <div class="tutorial-desc">Ao encontrar um erro, <strong>toque nele</strong> para marcar como uma 'Red Flag'.</div>
        </div>
        <div class="tutorial-step">
            <div class="tutorial-number">🏆</div>
            <div class="tutorial-desc">Encontre todos os erros da fase para ganhar pontos e seu distintivo!</div>
        </div>
    `;
    const botoesTutorial = `
        <button class="modal-btn success" onclick="fecharModalSemAcao()">Entendi, vamos jogar!</button>
    `;
    showModal('Como Jogar:', tutorialHTML, '🛡️', botoesTutorial);
}

updateDashboardUI(); // Inicializa a UI

// --- NAVEGAÇÃO DAS FASES ---
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

// --- CLIQUES E MODAL ---
document.querySelectorAll('.flag-target').forEach(item => {
    item.addEventListener('click', function() {
        const flagId = this.id; 
        this.classList.add('flag-found');
        this.classList.remove('flag-target'); 
        flagsFound++;
        document.getElementById('counter-' + currentLevelId).innerText = flagsFound;
        
        let btnHtml = `<button class="modal-btn" onclick="fecharModalNormal()">Entendi!</button>`;
        showModal(explanations[flagId].title, explanations[flagId].text, '🚨', btnHtml);
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
