// Lógica do Quiz revisada para 6 perguntas
(function(){
    // Armazena o índice (0-based) da opção correta para cada pergunta (6 no total).
    const correctAnswers = [1, 1, 1, 2, 2, 3];

    const qEls = document.querySelectorAll('.question');
    const totalQuestions = qEls.length; // Agora é 6

    // --- FUNÇÃO PARA RESETAR APENAS O QUIZ ---
    function resetQuiz() {
        // 1. Resetar as Perguntas e Opções
        qEls.forEach((q) => {
            q.removeAttribute('data-answered-correctly'); // Remove o status de correto/incorreto
            
            const opts = q.querySelectorAll('.opt');
            opts.forEach(x => {
                x.disabled = false; // Reabilita todas as opções
                // Remove todas as classes de feedback visual
                x.classList.remove('chosen-correct', 'chosen-wrong', 'is-correct');
            });
        });

        // 2. Limpar o Placar/Resultado Final
        const res = document.getElementById('resultText');
        if (res) {
            res.textContent = ''; // Limpa o texto de resultado
        }

        // 3. REMOÇÃO DA LÓGICA DO PAINEL DE PROMESSAS
        // **Estas linhas foram removidas ou comentadas para preservar o painel:**
        /*
        const ip = document.getElementById('promiseInput');
        if (ip) {
             ip.value = ''; // Limpa o que foi digitado
        }
        
        const promisesList = document.getElementById('promisesList');
        if (promisesList) {
             promisesList.innerHTML = ''; // Remove todos os <li>'s (as promessas)
        }
        */
    }
    // --- FIM DA FUNÇÃO DE RESET ---

    // Lógica de clique e feedback visual
    qEls.forEach((q, qIndex) => {
        const opts = q.querySelectorAll('.opt');
        
        opts.forEach((btn, i) => {
          btn.addEventListener('click', () => {
            
            // 1. Limpa o estado anterior e desabilita outras opções
            opts.forEach(x => {
              x.disabled = true; 
              x.classList.remove('chosen-correct', 'chosen-wrong', 'is-correct');
            });
            
            // 2. Define o índice correto para esta pergunta
            const correctIndex = correctAnswers[qIndex];
            
            // 3. Verifica se a opção clicada é a correta e aplica a classe de animação/cor
            if (i === correctIndex) {
              btn.classList.add('chosen-correct');
              q.setAttribute('data-answered-correctly', 'true'); // Marca a pergunta como correta
            } else {
              btn.classList.add('chosen-wrong');
              // Mostra a resposta correta com uma cor diferente
              opts[correctIndex].classList.add('is-correct');
              q.setAttribute('data-answered-correctly', 'false'); // Marca a pergunta como incorreta
            }
          });
        });
    });

    // Lógica do botão "Finalizar Quiz"
    document.getElementById('finishBtn').addEventListener('click', () => {
        let score = 0;
        let answeredCount = 0;
        
        // Contabiliza o score e o número de respostas
        qEls.forEach((q) => {
          const isAnswered = q.getAttribute('data-answered-correctly');
          if (isAnswered) {
              answeredCount++;
              if (isAnswered === 'true') {
                score++;
              }
          }
        });
        
        const res = document.getElementById('resultText');

        if(answeredCount < totalQuestions) {
            res.textContent = `Atenção: Responda todas as ${totalQuestions} perguntas antes de finalizar.`;
            return;
        }
        
        // Lógica de Mensagens de Score ajustada para 6 perguntas
        let percentage = Math.round((score / totalQuestions) * 100);

        if (score === totalQuestions) {
          res.textContent = `Parabéns! Você é um Guardião Lendário! Acertou ${score}/${totalQuestions}. 100% do oceano salvo! 🐳`;
        } else if (score >= 4) { // 4 ou 5 acertos (66% a 83%)
          res.textContent = `Muito bem! Você é um Defensor do Mar! Acertou ${score}/${totalQuestions} (${percentage}%). Quase lá! 🐬`;
        } else if (score >= 2) { // 2 ou 3 acertos (33% a 50%)
          res.textContent = `Você é um Aprendiz de Oceano! Acertou ${score}/${totalQuestions} (${percentage}%). Continue aprendendo! 🐢`;
        } else { // 0 ou 1 acerto
          res.textContent = `Tente novamente! Você acertou ${score}/${totalQuestions}. Aprender é o primeiro passo. 🌊`;
        }
    });

    // Lógica das Promessas (Não precisa de alteração)
    const addBtn = document.getElementById('addPromise');
    addBtn.addEventListener('click', () => {
        const ip = document.getElementById('promiseInput');
        const v = ip.value.trim();
        if (!v) return;
        const li = document.createElement('li');
        li.textContent = v;
        document.getElementById('promisesList').appendChild(li);
        ip.value = '';
    });

    // --- LIGAR A FUNÇÃO DE RESET AO BOTÃO "Refazer Quiz" ---
    // Assumindo que o botão tem o ID 'resetBtn' conforme o código que você forneceu implicitamente.
    // Pelo vídeo, parece que é o segundo botão com o texto 'Refazer Quiz'.
    const resetBtn = document.getElementById('resetBtn'); 
    // OBS: O HTML no vídeo parece usar um botão 'Refazer Quiz' que deve ter o ID 'resetBtn' ou uma classe,
    // garantindo que ele chame a função resetQuiz().
    if (resetBtn) {
        resetBtn.addEventListener('click', resetQuiz);
    }
    
})();