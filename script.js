// Aguarda o documento HTML carregar antes de executar o script
document.addEventListener("DOMContentLoaded", () => {

    // --- Seleciona os elementos da página ---
    const stepCounter = document.getElementById("step-counter");
    const questionText = document.getElementById("question-text");
    const buttonContainer = document.getElementById("button-container");
    
    const formWrapper = document.getElementById("form-wrapper");
    const btnFormSim = document.getElementById("btn-form-sim");
    const btnFormNao = document.getElementById("btn-form-nao");
    const errorMessage = document.getElementById("error-message");

    const finalStep = document.getElementById("final-step");

    // --- Estado Inicial ---
    // Define a primeira pergunta ao carregar a página
    showStep(1);

    // --- Função Principal de Navegação ---
    function showStep(step) {
        // Reseta elementos antes de mostrar o próximo passo
        errorMessage.style.display = "none";
        formWrapper.style.display = "none";
        finalStep.style.display = "none";
        buttonContainer.style.display = "flex";
        stepCounter.style.display = "flex";

        switch (step) {
            case 1:
                // Pergunta 1
                stepCounter.textContent = "1/3";
                questionText.textContent = "Você é o titular da conta de energia?";
                
                // Limpa botões antigos e cria os novos
                buttonContainer.innerHTML = `
                    <button class="btn" id="btn-sim">Sim</button>
                    <button class="btn" id="btn-nao">Não</button>
                `;

                // Adiciona os eventos aos novos botões
                document.getElementById("btn-sim").onclick = () => showStep(2);
                document.getElementById("btn-nao").onclick = () => showFailure("titular");
                break;

            case 2:
                // Pergunta 2
                stepCounter.textContent = "2/3";
                questionText.textContent = "Sua fatura possui consumo acima de 150 reais?";
                
                buttonContainer.innerHTML = `
                    <button class="btn" id="btn-sim">Sim</button>
                    <button class="btn" id="btn-nao">Não</button>
                `;
                
                document.getElementById("btn-sim").onclick = () => showStep(3);
                document.getElementById("btn-nao").onclick = () => showFailure("consumo");
                break;

            case 3:
                // Pergunta 3
                stepCounter.textContent = "3/3";
                questionText.textContent = "Você possui algum benefício ativo (como baixa renda com NIS, bolsa família, etc.)?";
                
                buttonContainer.innerHTML = `
                    <button class="btn" id="btn-sim">Sim</button>
                    <button class="btn" id="btn-nao">Não</button>
                `;
                
                document.getElementById("btn-sim").onclick = () => showFailure("beneficio");
                document.getElementById("btn-nao").onclick = () => showStep(4); // Cliente Aprovado!
                break;

            case 4:
                // Tela do Formulário (Aprovado)
                stepCounter.textContent = "3/3"; // Continua na etapa 3
                questionText.textContent = "Parabéns! Você tem direito ao benefício da iGreen Energy e pode começar a economizar na sua fatura de energia. Preencha os campos do formulário para prosseguir.";
                
                // Esconde botões Sim/Não e mostra o formulário
                buttonContainer.style.display = "none";
                formWrapper.style.display = "block";
                break;

            case 5:
                // Tela Final (Pós-Formulário)
                stepCounter.style.display = "none"; // Esconde contador
                questionText.textContent = "Perfeito! Para finalizar, preencha os dados da sua instalação clicando em prosseguir. Caso seja necessário, um agente da equipe técnica poderá te contatar para resolver quaisquer demandas necessárias.";
                
                // Esconde tudo e mostra o botão final
                buttonContainer.style.display = "none";
                formWrapper.style.display = "none";
                finalStep.style.display = "block";
                break;
        }
    }

    // --- Função para Mensagens de Falha ---
    function showFailure(reason) {
        stepCounter.style.display = "flex"; // Mantém o contador visível

        switch (reason) {
            case "titular":
                questionText.textContent = "No momento o direito é concedido somente ao titular.";
                break;
            case "consumo":
                questionText.textContent = "No momento o benefício é somente para as fatura acima de 150 reais.";
                break;
            case "beneficio":
                questionText.textContent = "Sinto muito, você não pode ter mais de um benefício ativo na sua conta de energia.";
                break;
        }

        // Troca os botões Sim/Não pelo botão Reiniciar
        buttonContainer.innerHTML = `<button class="btn" id="btn-reiniciar">Reiniciar</button>`;
        document.getElementById("btn-reiniciar").onclick = () => showStep(1);
    }

    // --- Eventos dos botões do Formulário ---
    // (Eles são fixos no HTML, então podemos adicionar os eventos uma vez)

    btnFormNao.addEventListener("click", () => {
        // Mostra a mensagem de erro
        errorMessage.style.display = "block";
    });

    btnFormSim.addEventListener("click", () => {
        // Avança para a tela final
        showStep(5);
    });

});
