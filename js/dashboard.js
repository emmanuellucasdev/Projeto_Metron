 // Busca a pontuação salva pelo questionário.
        // Se ainda não tiver nenhuma pontuação salva, usa 75 como exemplo.
        const pontuacaoSalva = localStorage.getItem("pontuacaoIEE");
        const pontuacaoIEE = pontuacaoSalva ? Number(pontuacaoSalva) : 75;

        const statusSalvo = localStorage.getItem("statusIEE");
        const corSalva = localStorage.getItem("corIEE");

        // Configuração das fatias do velocímetro
        const dadosGauge = [30, 30, 20, 20]; 
        const coresGauge = ["#ff4d4d", "#ffcc00", "#4da3ff", "#00cc66"];

        const ctx = document.getElementById("velocimetroChart").getContext("2d");

        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: [
                    "Desequilíbrio Acentuado",
                    "Atenção",
                    "Equilíbrio Moderado",
                    "Equilíbrio Saudável"
                ],
                datasets: [{
                    data: dadosGauge,
                    backgroundColor: coresGauge,
                    borderWidth: 0,
                    circumference: 180,
                    rotation: 270
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "75%",
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label;
                            }
                        }
                    }
                }
            }
        });

        const displayNota = document.getElementById("valor-iee-display");
        const displayStatus = document.getElementById("status-texto");

        function interpretarIEEDashboard(valor) {
            if (valor <= 30) {
                return {
                    texto: "Desequilíbrio Acentuado",
                    cor: "#ff4d4d"
                };
            }

            if (valor <= 60) {
                return {
                    texto: "Atenção",
                    cor: "#ffcc00"
                };
            }

            if (valor <= 80) {
                return {
                    texto: "Equilíbrio Moderado",
                    cor: "#4da3ff"
                };
            }

            return {
                texto: "Equilíbrio Saudável",
                cor: "#00cc66"
            };
        }
        function gerarMensagemIEE(valor) {
            const horasSonoSalvas = localStorage.getItem("horasSono");
            const horasSono = horasSonoSalvas ? Number(horasSonoSalvas) : null;

          if (horasSono !== null && horasSono > 8) {
              return "<strong>Atenção:</strong> Você informou que dorme mais de <em>8 horas por noite</em>. Dormir bem é importante, mas dormir demais com frequência pode indicar cansaço excessivo ou falta de rotina. Observe seus hábitos e tente manter horários regulares.";
          }

          if (valor <= 30) {
             return "<strong>Atenção:</strong> Seu resultado indica <em>desequilíbrio acentuado</em>. É importante observar sua rotina com cuidado, principalmente sono, uso de telas, organização e bem-estar.";
          }

          if (valor <= 60) {
             return "<strong>Dica:</strong> Seu resultado está na faixa de <em>atenção</em>. Alguns hábitos podem estar prejudicando seu equilíbrio, como excesso de telas, poucas horas de sono ou falta de organização.";
          }

          if (valor <= 80) {
             return "<strong>Dica:</strong> Seu resultado mostra <em>equilíbrio moderado</em>. Você está no caminho certo, mas ainda pode melhorar alguns hábitos, como manter uma rotina organizada, dormir melhor e reduzir distrações.";
          }

          return "<strong>Parabéns:</strong> Seu resultado indica <em>equilíbrio saudável</em>. Continue mantendo bons hábitos de sono, estudo, organização, atividade física e uso consciente da tecnologia.";
       }

        const resultado = interpretarIEEDashboard(pontuacaoIEE);

        displayNota.innerText = pontuacaoIEE;
        displayStatus.innerText = statusSalvo || resultado.texto;
        displayNota.style.color = corSalva || resultado.cor;
        displayStatus.style.color = corSalva || resultado.cor;

        const mensagemIEE = document.getElementById("mensagem-iee");

        if (mensagemIEE) {
           mensagemIEE.innerHTML = gerarMensagemIEE(pontuacaoIEE);
        }
