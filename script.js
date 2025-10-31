// Lógica do Quiz revisada para 6 perguntas
    (function(){
      // Armazena o índice (0-based) da opção correta para cada pergunta (6 no total).
      // Q1: Aquecimento (1) | Q2: Sacos plásticos (1) | Q3: Chelonia mydas (1)
      // Q4: Fragmentação de plásticos maiores (2) | Q5: Colapso de populações (2) | Q6: Carbono (3)
      const correctAnswers = [1, 1, 1, 2, 2, 3];

      const qEls = document.querySelectorAll('.question');
      const totalQuestions = qEls.length; // Agora é 6
      
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

      // Lógica das Promessas
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
    })();