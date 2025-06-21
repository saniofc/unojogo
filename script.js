const salas = {};

function gerarCodigoSala() {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
}

function criarSala() {
    const nome = document.getElementById('nome').value.trim();
    if (!nome) return alert('Digite seu nome!');

    const codigo = gerarCodigoSala();
    salas[codigo] = {
        jogadores: [nome]
    };

    alert(`✅ Sala criada!\nCódigo: ${codigo}`);
    abrirSala(codigo, nome);
}

function entrarSala() {
    const nome = document.getElementById('nome').value.trim();
    const codigo = document.getElementById('codigoSala').value.trim().toUpperCase();

    if (!nome) return alert('Digite seu nome!');
    if (!codigo) return alert('Digite o código da sala!');

    if (!salas[codigo]) {
        return alert('❌ Sala não encontrada.');
    }

    salas[codigo].jogadores.push(nome);
    abrirSala(codigo, nome);
}

function abrirSala(codigo, nome) {
    const sala = salas[codigo];
    document.body.innerHTML = `
        <div class="container">
            <h1>🎨 Sala ${codigo}</h1>
            <p>👥 Jogadores na sala:</p>
            <ul>${sala.jogadores.map(j => `<li>🧍 ${j}</li>`).join('')}</ul>
            <p>Aguardando jogadores... (${sala.jogadores.length}/5)</p>
        </div>
    `;

    if (sala.jogadores.length >= 5) {
        document.body.innerHTML += `
            <div class="container">
                <h2>🔥 O jogo começou!</h2>
                <p>🚧 (Aqui entraria o jogo UNO funcionando...)</p>
            </div>
        `;
    }
}
