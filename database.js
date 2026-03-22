const gameDatabase = {
    // Structure of game levels
    levels: {
        'email': ['fase-email-1', 'fase-email-2'],
        'wpp':['fase-wpp-1', 'fase-wpp-2'],
        'sms':['fase-sms-1', 'fase-sms-2'],
        'social':['fase-social-1', 'fase-social-2'],
        'dating':['fase-dating-1'],
        'apps':['fase-apps-1'],
        'voice':['fase-voice-1']
    },

    // Explanations for each specific flag
    explanations: {
        // ORIGINAL PHASES
        'flag-urgency': { title: 'Cuidado com a pressa!', text: 'Golpistas usam palavras como "URGENTE" para te assustar. Eles querem que você aja rápido, sem pensar direito.' },
        'flag-domain': { title: 'Olhe bem o remetente!', text: 'Repare no endereço: está escrito "netfiix" com dois "i". Empresas grandes não cometem esses erros.' },
        'flag-greeting': { title: 'Não usaram seu nome?', text: 'Mensagens que começam com "Olá Cliente" costumam ser enviadas para milhares de pessoas.' },
        'flag-link': { title: 'Cuidado onde clica!', text: 'Nunca clique no botão direto! É mais seguro abrir o aplicativo oficial da empresa no seu celular.' },
        
        'flag-wpp-photo': { title: 'Não confie só na foto!', text: 'É muito fácil copiar a foto de alguém. O golpista pega a foto e coloca no perfil falso.' },
        'flag-wpp-header-number': { title: 'Cadê o nome na agenda?', text: 'Se fosse o seu familiar mesmo, o nome dele apareceria lá em cima, e não apenas um número.' },
        'flag-wpp-text': { title: 'A desculpa do celular novo', text: 'Sempre começa assim! Eles fingem que o celular quebrou para justificar o uso de um número novo.' },
        'flag-wpp-urgency': { title: 'A história triste', text: 'O golpista inventa que o banco bloqueou para justificar por que precisa da sua ajuda.' },
        'flag-wpp-pix': { title: 'Pediu dinheiro por mensagem?', text: 'Nunca envie dinheiro! Ligue para a pessoa no número ANTIGO dela e converse por voz.' },
        'flag-wpp-thirdparty': { title: 'Nome de um desconhecido!', text: 'Se o dinheiro é para o seu familiar, por que o PIX está em nome de um estranho?' },
        
        'flag-sms-sender': { title: 'Número de celular comum?', text: 'Empresas grandes como os Correios usam números curtos (de 5 ou 6 dígitos) para enviar SMS.' },
        'flag-sms-urgency': { title: 'Ameaça de devolução!', text: 'Os golpistas dizem que você vai perder o pacote para causar pânico.' },
        'flag-sms-link': { title: 'O Link Falso', text: 'O site oficial é apenas "correios.com.br". Desconfie de links com hifens e nomes compridos.' },
        
        'flag-social-sponsored': { title: 'É apenas um Anúncio!', text: 'A palavra "Patrocinado" significa que alguém PAGOU para isso aparecer para você.' },
        'flag-social-deepfake': { title: 'Vídeo Falso (Deepfake)!', text: 'Hoje em dia, golpistas usam IA para copiar o rosto e a voz exata de famosos no computador.' },
        'flag-social-link': { title: 'Para onde isso leva?', text: 'Nunca clique no botão "Saiba Mais" de promoções absurdas. Ele vai te levar para um site falso.' },
        'flag-social-promise': { title: 'A Promessa Milagrosa', text: 'Ninguém dá celulares de graça na internet! Se pedem para pagar "só o frete", é golpe.' },

        // PHASE 2 ADDITIONS
        'flag-email2-domain': { title: 'E-mail Falso do Banco!', text: 'Bancos nunca usam e-mails estranhos como "@bb-atualizacao-info.net". Eles usam o domínio oficial e curto (como @bb.com.br).' },
        'flag-email2-urgency': { title: 'Ameaça de Bloqueio!', text: 'Dizer que sua conta será bloqueada hoje é a tática nº 1 para causar pânico e fazer você clicar por medo.' },
        'flag-email2-link': { title: 'O Botão Perigoso', text: 'Nunca clique em botões para "Sincronizar" ou "Atualizar Token" por e-mail. Faça isso apenas dentro do aplicativo oficial do seu banco.' },
        
        'flag-wpp2-number': { title: 'Código de Outro País!', text: 'Reparou no "+62"? É o código da Indonésia! Empresas do Brasil não entram em contato por números estrangeiros.' },
        'flag-wpp2-salary': { title: 'Dinheiro Fácil Demais', text: 'Ganhar R$ 1.500 por dia apenas avaliando produtos no celular? Quando a esmola é demais, o santo desconfia. É golpe!' },
        'flag-wpp2-fee': { title: 'Pagar para Trabalhar?', text: 'Nenhuma empresa séria cobra uma "taxa de ativação" ou pede para você depositar dinheiro (PIX) antes de começar a trabalhar.' },

        'flag-sms2-value': { title: 'O Susto do Valor Alto', text: 'Eles inventam uma compra de valor muito alto (R$ 3.850) de propósito, para você ficar desesperado e agir sem pensar.' },
        'flag-sms2-0800': { title: 'O Falso 0800', text: 'Os golpistas compram números 0800 falsos! Se você ligar para esse número, vai falar com um bandido fingindo ser o atendente do banco.' },

        'flag-social2-price': { title: 'Preço Impossível', text: 'Um conjunto de malas de luxo por R$ 89,90? Golpistas roubam fotos de marcas famosas e colocam preços absurdos para atrair vítimas.' },
        'flag-social2-url': { title: 'Site Estranho', text: 'A loja se diz famosa, mas o site tem palavras a mais como "lojas-oficiais-liquidacao.com". Lojas verdadeiras usam apenas o próprio nome.' },
        'flag-social2-comments': { title: 'Ocultando a Verdade', text: 'Eles desativam os comentários de propósito para que outras pessoas não possam avisar que aquilo é um golpe!' },

        // NEW CATEGORY: DATING SCAM
        'flag-dating-love': { title: 'Amor rápido demais?', text: 'Golpistas de romance (Love Scammers) declaram amor muito rápido para tentar criar uma conexão emocional falsa.' },
        'flag-dating-excuse': { title: 'Sempre há um problema!', text: 'Eles sempre inventam uma tragédia: conta bloqueada, acidente com parente ou problemas com a bagagem na alfândega.' },
        'flag-dating-money': { title: 'Pedindo dinheiro?', text: 'A regra é clara: NUNCA envie dinheiro ou criptomoedas para alguém que você conheceu apenas pela internet.' },

        // NEW CATEGORY: FAKE APPS SCAM
        'flag-app-dev': { title: 'Nome do Desenvolvedor', text: 'O desenvolvedor do app do seu banco deve ser o próprio banco verificado. Nomes estranhos ou "LLC" são golpistas.' },
        'flag-app-reviews': { title: 'Poucas avaliações?', text: 'Aplicativos de bancos reais têm milhões de downloads e avaliações. Um app com apenas 14 avaliações é falso.' },
        'flag-app-downloads': { title: 'Poucos Downloads?', text: 'O aplicativo verdadeiro do seu banco tem milhões de instalações! Um app com apenas "50+" downloads foi criado recentemente por golpistas.' },
        'flag-app-name': { title: 'Nome não oficial', text: 'Os golpistas usam nomes como "Atualizado 2026" ou "Nova Versão Oficial" para te enganar e fazer você baixar o app malicioso.' },

        // NEW CATEGORY: VOICE / CALL SCAM
        'flag-voice-threat': { title: 'Ameaça de prejuízo!', text: 'Eles inventam que um PIX altíssimo está sendo feito para te desesperar. O medo faz a pessoa agir por impulso.' },
        'flag-voice-password': { title: 'A Regra de Ouro!', text: 'Lembre-se: NENHUM banco, em hipótese alguma, pedirá que você digite ou fale a sua senha por telefone.' }
    }
};