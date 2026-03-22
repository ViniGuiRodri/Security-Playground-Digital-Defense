export const niveisPorCategoria = {
    'email':['fase-email-1', 'fase-email-2'],
    'wpp':['fase-wpp-1', 'fase-wpp-2'],
    'sms':['fase-sms-1', 'fase-sms-2'],
    'social':['fase-social-1', 'fase-social-2'],
    'dating': ['fase-dating-1'],
    'apps':['fase-apps-1'],
    'voice': ['fase-voice-1']
};

export const nomesCategorias = {
    'email': 'E-mails Falsos', 'wpp': 'Golpes no WhatsApp',
    'sms': 'Ligações e SMS', 'social': 'Redes Sociais',
    'dating': 'Relacionamentos', 'apps': 'Lojas de Apps',
    'voice': 'Chamadas de Voz'
};

export const avatarsData =[
    { id: 'default', emoji: '🕵️', price: 0, name: 'Iniciante' },
    { id: 'police', emoji: '👮', price: 150, name: 'Policial' },
    { id: 'ninja', emoji: '🥷', price: 400, name: 'Ninja' },
    { id: 'hero', emoji: '🦸', price: 800, name: 'Herói' },
    { id: 'wizard', emoji: '🧙‍♂️', price: 1200, name: 'Mago' },
    { id: 'king', emoji: '👑', price: 1600, name: 'Realeza' }
];

export const explanations = {
    'flag-urgency': { title: 'Cuidado com a pressa!', text: 'Golpistas usam palavras como "URGENTE" para te assustar.' },
    'flag-domain': { title: 'Olhe bem o remetente!', text: 'Repare no endereço: está escrito "netfiix" com dois "i".' },
    'flag-greeting': { title: 'Não usaram seu nome?', text: 'Mensagens que começam com "Olá Cliente" costumam ser genéricas.' },
    'flag-link': { title: 'Cuidado onde clica!', text: 'Nunca clique no botão direto! É mais seguro abrir o app oficial.' },
    'flag-wpp-photo': { title: 'Não confie só na foto!', text: 'É muito fácil copiar a foto de alguém para um perfil falso.' },
    'flag-wpp-header-number': { title: 'Cadê o nome na agenda?', text: 'Se fosse seu familiar, o nome dele apareceria lá em cima.' },
    'flag-wpp-text': { title: 'Desculpa do celular novo', text: 'Eles fingem que o celular quebrou para justificar o número novo.' },
    'flag-wpp-urgency': { title: 'A história triste', text: 'O golpista inventa que o banco bloqueou para pedir ajuda.' },
    'flag-wpp-pix': { title: 'Pediu dinheiro por mensagem?', text: 'Nunca envie dinheiro! Ligue para o número ANTIGO da pessoa.' },
    'flag-wpp-thirdparty': { title: 'Nome de um desconhecido!', text: 'Se o dinheiro é para o seu familiar, por que o PIX é de um estranho?' },
    'flag-sms-sender': { title: 'Número de celular comum?', text: 'Empresas grandes usam números curtos (5 ou 6 dígitos) para SMS.' },
    'flag-sms-urgency': { title: 'Ameaça de devolução!', text: 'Os golpistas dizem que você vai perder o pacote para causar pânico.' },
    'flag-sms-link': { title: 'O Link Falso', text: 'O site oficial é "correios.com.br". Desconfie de links com hifens.' },
    'flag-social-sponsored': { title: 'É apenas um Anúncio!', text: '"Patrocinado" significa que alguém PAGOU para isso aparecer.' },
    'flag-social-deepfake': { title: 'Vídeo Falso (Deepfake)!', text: 'Golpistas usam IA para copiar o rosto e voz de famosos.' },
    'flag-social-link': { title: 'Para onde isso leva?', text: 'Nunca clique em "Saiba Mais" de promoções absurdas.' },
    'flag-social-promise': { title: 'A Promessa Milagrosa', text: 'Ninguém dá celulares de graça! Se pedem "só o frete", é golpe.' },
    'flag-email2-domain': { title: 'E-mail Falso do Banco!', text: 'Bancos usam domínios curtos (como @bb.com.br) e não e-mails estranhos.' },
    'flag-email2-urgency': { title: 'Ameaça de Bloqueio!', text: 'Dizer que sua conta será bloqueada hoje é tática para causar pânico.' },
    'flag-email2-link': { title: 'O Botão Perigoso', text: 'Nunca clique em botões para "Sincronizar Token" por e-mail.' },
    'flag-wpp2-number': { title: 'Código de Outro País!', text: 'Reparou no "+62"? Empresas do Brasil não usam códigos estrangeiros.' },
    'flag-wpp2-salary': { title: 'Dinheiro Fácil Demais', text: 'Ganhar R$ 1.500 por dia curtindo produtos? É golpe!' },
    'flag-wpp2-fee': { title: 'Pagar para Trabalhar?', text: 'Nenhuma empresa séria cobra uma "taxa" para você começar a trabalhar.' },
    'flag-sms2-value': { title: 'O Susto do Valor Alto', text: 'Eles inventam uma compra de valor alto para você ficar desesperado.' },
    'flag-sms2-0800': { title: 'O Falso 0800', text: 'Golpistas compram números 0800 falsos! Se ligar, vai falar com um bandido.' },
    'flag-social2-price': { title: 'Preço Impossível', text: 'Roubam fotos de marcas famosas e colocam preços absurdos.' },
    'flag-social2-url': { title: 'Site Estranho', text: 'Lojas verdadeiras usam apenas o próprio nome no site.' },
    'flag-social2-comments': { title: 'Ocultando a Verdade', text: 'Eles desativam os comentários para ninguém avisar que é golpe!' },
    'flag-dating-love': { title: 'Amor rápido demais?', text: 'Golpistas declaram amor muito rápido para criar conexão falsa.' },
    'flag-dating-excuse': { title: 'Sempre há um problema!', text: 'Sempre inventam uma tragédia: conta bloqueada ou acidente.' },
    'flag-dating-money': { title: 'Pedindo dinheiro?', text: 'NUNCA envie dinheiro para alguém que conheceu apenas pela internet.' },
    'flag-app-dev': { title: 'Nome do Desenvolvedor', text: 'O desenvolvedor do app do seu banco deve ser o próprio banco.' },
    'flag-app-reviews': { title: 'Poucas avaliações?', text: 'Apps de bancos reais têm milhões de downloads e avaliações.' },
    'flag-app-downloads': { title: 'Poucos Downloads?', text: 'Um app com apenas "50+" instalações foi criado por golpistas.' },
    'flag-app-name': { title: 'Nome não oficial', text: 'Usam nomes como "Atualizado 2026" para te enganar.' },
    'flag-voice-threat': { title: 'Ameaça de prejuízo!', text: 'Inventam um PIX altíssimo para o medo te fazer agir por impulso.' },
    'flag-voice-password': { title: 'A Regra de Ouro!', text: 'NENHUM banco pedirá que você digite ou fale a senha por telefone.' }
};