
function pegarNumero(id) {
    const campo = document.getElementById(id);

    if (!campo) {
        console.error("Campo não encontrado: " + id);
        return NaN;
    }

    return Number(campo.value);
}

function limitar(valor, minimo, maximo) {
    return Math.max(minimo, Math.min(maximo, valor));
}

function pontuarSono(horas) {
    if (horas >= 7 && horas <= 9) return 100;
    if (horas >= 6 && horas < 7) return 80;
    if (horas > 9 && horas <= 10) return 80;
    if (horas >= 5 && horas < 6) return 60;
    if (horas > 10 && horas <= 11) return 60;
    if (horas >= 4 && horas < 5) return 40;
    if (horas > 11 && horas <= 12) return 40;
    return 20;
}

function pontuarEstudos(horas) {
    if (horas >= 2 && horas <= 4) return 100;
    if (horas >= 1 && horas < 2) return 80;
    if (horas > 4 && horas <= 6) return 85;
    if (horas > 6 && horas <= 8) return 70;
    if (horas > 0 && horas < 1) return 50;
    if (horas === 0) return 30;
    return 50;
}

function pontuarTecnologia(horasRecreativas, usoAntesDormir, interrupcaoEstudos) {
    const pontosHoras = limitar(100 - (horasRecreativas * 10), 0, 100);
    const pontosDormir = limitar(100 - (usoAntesDormir * 5), 0, 100);
    const pontosInterrupcao = limitar(100 - (interrupcaoEstudos * 2), 0, 100);

    return (pontosHoras + pontosDormir + pontosInterrupcao) / 3;
}

function pontuarEscalaLikert(ids) {
    let soma = 0;

    ids.forEach(function(id) {
        soma += pegarNumero(id);
    });

    const media = soma / ids.length;

    return ((media - 1) / 4) * 100;
}

function interpretarIEE(valor) {
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

function calcularIEE() {
    const formulario = document.getElementById("form-iee");

    if (formulario && !formulario.checkValidity()) {
        formulario.reportValidity();
        return;
    }

    const sono = pegarNumero("sono");
    const estudos = pegarNumero("estudos");
    const fisica = pegarNumero("fisica");
    const tecRec = pegarNumero("tec_rec");
    const tecDormir = pegarNumero("tec_dormir");
    const tecInterrupcao = pegarNumero("tec_interrupcao");

    const valores = [
        sono,
        estudos,
        fisica,
        tecRec,
        tecDormir,
        tecInterrupcao
    ];

    if (valores.some(Number.isNaN)) {
        alert("Preencha todos os campos antes de calcular o IEE.");
        return;
    }

    const pontosSono = pontuarSono(sono);
    const pontosEstudos = pontuarEstudos(estudos);
    const pontosFisica = limitar((fisica / 7) * 100, 0, 100);
    const pontosTecnologia = pontuarTecnologia(tecRec, tecDormir, tecInterrupcao);

    const pontosOrganizacao = pontuarEscalaLikert([
        "org1",
        "org2",
        "org3",
        "org4"
    ]);

    const pontosBemEstar = pontuarEscalaLikert([
        "bem1",
        "bem2",
        "bem3",
        "bem4"
    ]);

    const iee = Math.round(
        (pontosSono * 0.20) +
        (pontosEstudos * 0.15) +
        (pontosFisica * 0.15) +
        (pontosTecnologia * 0.20) +
        (pontosOrganizacao * 0.15) +
        (pontosBemEstar * 0.15)
    );

    const resultado = interpretarIEE(iee);

    const caixaResultado = document.getElementById("resultado-iee");
    const valorIEE = document.getElementById("valor-iee");
    const textoInterpretacao = document.getElementById("texto-interpretacao");

    if (caixaResultado && valorIEE && textoInterpretacao) {
        caixaResultado.style.display = "block";

        valorIEE.textContent = iee;
        valorIEE.style.color = resultado.cor;

        textoInterpretacao.textContent = resultado.texto;
        textoInterpretacao.style.color = resultado.cor;

        caixaResultado.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    localStorage.setItem("pontuacaoIEE", iee);
    localStorage.setItem("statusIEE", resultado.texto);
    localStorage.setItem("corIEE", resultado.cor);
    localStorage.setItem("horasSono", sono);
}