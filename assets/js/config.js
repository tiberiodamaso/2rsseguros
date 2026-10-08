/*
 * Configuração central do site — edite aqui número, mensagens e horário.
 *
 * Os links de WhatsApp no HTML já trazem um href pronto (funciona sem JS),
 * mas o site.js reescreve todos eles a partir deste arquivo ao carregar a
 * página. Ao trocar o número, troque também o href de fallback nos HTML
 * (procure por "wa.me/" — ver README).
 */
window.SITE_CONFIG = {
  // Número no formato internacional, só dígitos (WhatsApp Business da Rita)
  whatsapp: '5511983414948',
  whatsappDisplay: '(11) 98341-4948',

  // Mensagem pré-preenchida por produto (atributo data-wa-product do link)
  messages: {
    'saude-geral': 'Olá! Vim pelo site da 2RS e quero uma cotação de plano de saúde.',
    'saude-empresarial': 'Olá! Vim pelo site e quero uma cotação de plano de saúde empresarial (CNPJ/MEI).',
    'saude-pf': 'Olá! Vim pelo site e quero uma cotação de plano de saúde individual/familiar.',
    'viagem': 'Olá! Vim pelo site e quero informações sobre seguro viagem',
    'auto': 'Olá! Vim pelo site e quero informações sobre seguro auto',
    'residencial': 'Olá! Vim pelo site e quero informações sobre seguro residencial'
  },

  // Horário de atendimento no fuso de São Paulo.
  // Chave = dia da semana (0 = domingo … 6 = sábado); valor = [abre, fecha] em "HH:MM".
  // Dias ausentes = fechado. Feriados não são tratados.
  timezone: 'America/Sao_Paulo',
  hours: {
    1: ['09:00', '17:00'],
    2: ['09:00', '17:00'],
    3: ['09:00', '17:00'],
    4: ['09:00', '17:00'],
    5: ['09:00', '12:00']
  },

  statusText: {
    open: 'Respondemos em instantes',
    closed: 'Deixe sua mensagem — respondemos no próximo horário de atendimento'
  }
};
