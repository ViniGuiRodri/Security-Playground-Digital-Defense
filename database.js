const gameDatabase = {
    levels: {
        'email': ['fase-email-1'],
        'wpp': ['fase-wpp-1'],
        'sms': ['fase-sms-1'],
        'social': ['fase-social-1']
    },

    explanations: {
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
        'flag-social-promise': { title: 'A Promessa Milagrosa', text: 'Ninguém dá celulares de graça na internet! Se pedem para pagar "só o frete", é golpe.' }
    }
};
