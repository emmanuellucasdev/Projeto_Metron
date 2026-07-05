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

        const resultado = interpretarIEEDashboard(pontuacaoIEE);

        displayNota.innerText = pontuacaoIEE;
        displayStatus.innerText = statusSalvo || resultado.texto;
        displayNota.style.color = corSalva || resultado.cor;
        displayStatus.style.color = corSalva || resultado.cor;
