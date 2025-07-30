// Espera o documento HTML carregar completamente antes de executar o código
document.addEventListener('DOMContentLoaded', () => {

    // 1. Encontra os elementos HTML com os quais vamos interagir
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // =================================================================
    // <<< PASSO 3: A URL DA SUA TWILIO FUNCTION VIRÁ AQUI DENTRO >>>
    const TWILIO_FUNCTION_URL = 'https://chatbot-backend-6131.twil.io/responder';
    // =================================================================

    // 2. Função para adicionar uma nova mensagem na tela do chat
    function adicionarMensagem(texto, classe) {
        const div = document.createElement('div');
        div.className = `message ${classe}`;
        div.textContent = texto;
        chatMessages.appendChild(div);
        // Rola a conversa para a última mensagem
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 3. Função principal para enviar a pergunta para a Twilio
    async function enviarPergunta() {
        const mensagem = userInput.value.trim();
        if (!mensagem) return; // Não faz nada se a mensagem estiver vazia

        // Mostra a pergunta do usuário na tela
        adicionarMensagem(mensagem, 'user');
        userInput.value = ''; // Limpa o campo de digitação
        userInput.disabled = true; // Desabilita o campo enquanto espera a resposta

        try {
            // Envia a pergunta para a nossa função na nuvem da Twilio
            const response = await fetch(TWILIO_FUNCTION_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pergunta: mensagem })
            });

            const data = await response.json();
            // Mostra a resposta do bot na tela
            adicionarMensagem(data.resposta, 'bot');

        } catch (error) {
            console.error('Erro ao conectar com a Twilio:', error);
            adicionarMensagem('Não foi possível conectar ao assistente. Tente novamente.', 'bot');
        } finally {
            userInput.disabled = false; // Habilita o campo novamente
            userInput.focus(); // Coloca o cursor de volta no campo
        }
    }

    // 4. Define as ações do usuário
    // Clicar no botão de enviar
    sendBtn.addEventListener('click', enviarPergunta);
    // Apertar "Enter" no campo de digitação
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            enviarPergunta();
        }
    });

    // Adiciona uma mensagem de boas-vindas do bot
    adicionarMensagem("Olá! Como posso ajudar?", "bot");
});