
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
    if (horas < 0 || horas > 24) {
        alert("Erro! Informe novamente seu tempo de sono.");
        return NaN;
    }

    if (horas >= 7 && horas <= 8) return 100;
    if (horas > 8 && horas <= 9) return 95;
    if (horas >= 6 && horas < 7) return 90;
    if (horas > 9 && horas < 10) return 80;
    if (horas >= 5 && horas < 6) return 75;
    if (horas >= 4 && horas < 5) return 50;

    return 20;
}


function pontuarEstudos(horas) {
    if (horas < 0 || horas > 24) {
        alert("Erro! Informe novamente seu tempo diário de estudos.");
        return NaN;
    }

    if (horas >= 0 && horas < 1) return 0;
    if (horas >= 1 && horas < 2) return 60;
    if (horas >= 2 && horas <= 4) return 100;
    if (horas > 4 && horas < 5) return 90;
    if (horas >= 5 && horas < 6) return 70;
    return 50;
}

function pontuarFisica(dias) {
    if (dias < 0 || dias > 7) {
        alert("Erro! Informe um número de 0 a 7 para atividade física.");
        return NaN;
    }

    if (dias === 0) return 0;
    if (dias === 1) return 25;
    if (dias === 2) return 50;
    if (dias === 3) return 75;
    if (dias === 4) return 90;
    if (dias === 5) return 100;
    if (dias === 6) return 100;
    if (dias === 7) return 95;
}

function penalizarUsoRecreativo(horas) {
    if (horas < 0 || horas > 24) {
        alert("Erro! Informe novamente seu tempo de uso recreativo.");
        return NaN;
    }

    if (horas >= 0 && horas < 3) return 0;
    if (horas >= 3 && horas < 4) return 5;
    if (horas >= 4 && horas < 5) return 10;
    if (horas >= 5 && horas < 6) return 20;
    
    return 30;
}

function pontuarTecnologia(horasRecreativas, usoAntesDormir, interrupcaoEstudos) {
    const penalizacaoRecreativo = penalizarUsoRecreativo(horasRecreativas);
    const penalizacaoDormir = usoAntesDormir;
    const penalizacaoInterrupcao = interrupcaoEstudos;

    const notaTecnologia = 100 - (
        penalizacaoRecreativo +
        penalizacaoDormir +
        penalizacaoInterrupcao
    );

    return limitar(notaTecnologia, 0, 100);
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
    const pontosFisica = pontuarFisica(fisica);
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
    (
        pontosSono +
        pontosTecnologia +
        pontosOrganizacao +
        pontosEstudos +
        pontosFisica +
        pontosBemEstar
    ) / 6
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