// sani domina
let codigoSala = '';
let jogadores = [];

function criarSala() {
    const nome = document.getElementById('nome').value.trim();
    if (!nome) return alert('Digite seu nome!');
    codigoSala = gerarCodigo();
    jogadores = [nome];
    mostrarSala();
}

function entrarSala() {
    const nome = document.getElementById('nome').value.trim();
    const codigo = document.getElementById('codigoSala').value.trim().toUpperCase();
    if (!nome || !codigo) return alert('Preencha todos os campos!');
    codigoSala = codigo;
    jogadores.push(nome);
    mostrarSala();
}

function mostrarSala() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('sala').style.display = 'block';
    document.getElementById('codigo').innerText = codigoSala;
    atualizarJogadores();
}

function atualizarJogadores() {
    const div = document.getElementById('jogadores');
    div.innerHTML = jogadores.map(j => `<div class="player">${j}</div>`).join('');
    document.getElementById('status').innerText = `${jogadores.length}/5 jogadores`;
}

function iniciarJogo() {
    if (jogadores.length < 2) {
        alert('É necessário no mínimo 2 jogadores para começar!');
        return;
    }
    document.getElementById('sala').style.display = 'none';
    document.getElementById('jogo').style.display = 'block';
}

function gerarCodigo() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 4; i++) {
        codigo += chars[Math.floor(Math.random() * chars.length)];
    }
    return codigo;
}
