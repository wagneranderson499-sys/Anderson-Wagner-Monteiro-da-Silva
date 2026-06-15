var servicoSelecionado = "";
var valorSelecionado = 0;
var barbeiroSelecionado = "";
var horarioSelecionado = "";
var dataSelecionada = "";
var dataValor = "";

// horários disponíveis (alguns marcados como ocupados para visual)
var horarios = [
    { h: "09:00", ocupado: true },
    { h: "09:30", ocupado: true },
    { h: "10:00", ocupado: false },
    { h: "10:30", ocupado: false },
    { h: "11:00", ocupado: false },
    { h: "11:30", ocupado: true },
    { h: "13:00", ocupado: false },
    { h: "13:30", ocupado: false },
    { h: "14:00", ocupado: false },
    { h: "14:30", ocupado: true },
    { h: "15:00", ocupado: false },
    { h: "15:30", ocupado: false },
    { h: "16:00", ocupado: false },
    { h: "16:30", ocupado: false },
    { h: "17:00", ocupado: false },
    { h: "17:30", ocupado: false }
];

var diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
var meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

// gera os próximos 7 dias (chips)
function gerarDatas() {
    var container = document.getElementById("listaData");
    var html = "";
    var hoje = new Date();

    for (var i = 0; i < 7; i++) {
        var d = new Date(hoje);
        d.setDate(hoje.getDate() + i);

        var diaSemana = diasSemana[d.getDay()];
        var diaNum = d.getDate();
        var mesAbr = meses[d.getMonth()];
        var valorData = d.toISOString().split("T")[0];
        var exibicao = diaSemana + ", " + diaNum + " " + mesAbr;

        html += "<div class='data-chip' onclick=\"selecionarData(this, '" + valorData + "', '" + exibicao + "')\">";
        html += "<span class='dia-semana'>" + diaSemana + "</span>";
        html += "<span class='dia-num'>" + diaNum + "/" + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + "</span>";
        html += "</div>";
    }

    container.innerHTML = html;
}

// gera botões de horário
function gerarHorarios() {
    var container = document.getElementById("listaHorarios");
    var html = "";

    for (var i = 0; i < horarios.length; i++) {
        var cls = "horario-btn";
        if (horarios[i].ocupado) cls += " ocupado";

        if (horarios[i].ocupado) {
            html += "<button type='button' class='" + cls + "' disabled>" + horarios[i].h + "</button>";
        } else {
            html += "<button type='button' class='" + cls + "' onclick=\"selecionarHorario(this, '" + horarios[i].h + "')\">" + horarios[i].h + "</button>";
        }
    }

    container.innerHTML = html;
}

window.onload = function() {
    gerarDatas();
    gerarHorarios();
};

// seleciona serviço
function selecionarServico(card, nome, valor) {
    var cards = document.querySelectorAll(".servico-card");
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove("ativo");
    }
    card.classList.add("ativo");
    servicoSelecionado = nome;
    valorSelecionado = valor;
    atualizarResumo();
}

// seleciona barbeiro
function selecionarBarbeiro(card, nome) {
    var cards = document.querySelectorAll(".barbeiro-card");
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove("ativo");
    }
    card.classList.add("ativo");
    barbeiroSelecionado = nome;
    atualizarResumo();
}

// seleciona data
function selecionarData(chip, valor, exibicao) {
    var chips = document.querySelectorAll(".data-chip");
    for (var i = 0; i < chips.length; i++) {
        chips[i].classList.remove("ativo");
    }
    chip.classList.add("ativo");
    dataValor = valor;
    dataSelecionada = exibicao;
    atualizarResumo();
}

// seleciona horário
function selecionarHorario(btn, horario) {
    var btns = document.querySelectorAll(".horario-btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].classList.remove("ativo");
    }
    btn.classList.add("ativo");
    horarioSelecionado = horario;
    atualizarResumo();
}

// atualiza resumo
function atualizarResumo() {
    var resumo = document.getElementById("resumo");

    if (servicoSelecionado && barbeiroSelecionado && horarioSelecionado && dataSelecionada) {
        resumo.classList.remove("hidden");
        document.getElementById("resumoBarbeiro").textContent = barbeiroSelecionado;
        document.getElementById("resumoServico").textContent = servicoSelecionado;
        document.getElementById("resumoDataHorario").textContent = dataSelecionada + " · " + horarioSelecionado;
        document.getElementById("resumoValor").textContent = "R$ " + valorSelecionado;
    }
}

// confirma agendamento
function confirmarAgendamento() {
    var nome = document.getElementById("nomeCliente").value.trim();
    var telefone = document.getElementById("telefone").value.trim();

    if (nome == "") { alert("Digite seu nome!"); return; }
    if (telefone == "") { alert("Digite seu telefone!"); return; }
    if (barbeiroSelecionado == "") { alert("Selecione um barbeiro!"); return; }
    if (servicoSelecionado == "") { alert("Selecione um serviço!"); return; }
    if (dataSelecionada == "") { alert("Selecione uma data!"); return; }
    if (horarioSelecionado == "") { alert("Selecione um horário!"); return; }

    document.getElementById("modalNome").textContent = nome;
    document.getElementById("modalServico").textContent = servicoSelecionado;
    document.getElementById("modalBarbeiro").textContent = barbeiroSelecionado;
    document.getElementById("modalDataHora").textContent = dataSelecionada + " · " + horarioSelecionado;
    document.getElementById("modalValor").textContent = "R$ " + valorSelecionado;

    var modal = document.getElementById("modalConfirmacao");
    modal.classList.add("aberto");
}

// fecha modal
function fecharConfirmacao() {
    var modal = document.getElementById("modalConfirmacao");
    modal.classList.remove("aberto");
}
