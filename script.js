// sani domina 🗽
// Cartas do UNO: cores + números + especiais
const colors = ['red', 'green', 'blue', 'yellow'];
const numbers = [...Array(10).keys()]; // 0 a 9
const specials = ['skip', 'reverse', 'draw2']; // cartas especiais

// Cria o baralho básico
function createDeck() {
    const deck = [];

    // Para cada cor
    colors.forEach(color => {
        // 1 zero por cor
        deck.push({ color, value: 0 });

        // 2 cartas de 1 a 9
        numbers.slice(1).forEach(num => {
            deck.push({ color, value: num });
            deck.push({ color, value: num });
        });

        // 2 cartas especiais por cor
        specials.forEach(sp => {
            deck.push({ color, value: sp });
            deck.push({ color, value: sp });
        });
    });

    // 4 cartas wild e 4 wild draw4
    for(let i=0; i<4; i++) {
        deck.push({ color: 'wild', value: 'wild' });
        deck.push({ color: 'wild', value: 'wilddraw4' });
    }

    return shuffle(deck);
}

// Embaralha o array usando Fisher-Yates
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while(currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

// Variáveis de estado do jogo
let deck = [];
let discardPile = [];
let playerHand = [];

const playerHandDiv = document.getElementById('player-hand');
const topCardDiv = document.getElementById('top-card');
const drawButton = document.getElementById('draw-button');
const passButton = document.getElementById('pass-button');
const messageDiv = document.getElementById('message');

function startGame() {
    deck = createDeck();
    discardPile = [];
    playerHand = [];

    // Comprar 7 cartas iniciais
    for(let i=0; i<7; i++) {
        playerHand.push(drawCard());
    }

    // Colocar a primeira carta da pilha de descarte
    let firstCard = drawCard();
    // Se for wild draw4, sorteia outra
    while(firstCard.color === 'wild' && firstCard.value === 'wilddraw4') {
        deck.push(firstCard);
        deck = shuffle(deck);
        firstCard = drawCard();
    }
    discardPile.push(firstCard);

    updateUI();
    messageDiv.textContent = 'Sua vez! Clique em uma carta para jogar.';
}

function drawCard() {
    if(deck.length === 0) {
        // Se o deck acabar, recicla as cartas da pilha de descarte (menos a última)
        const lastCard = discardPile.pop();
        deck = shuffle(discardPile);
        discardPile = [lastCard];
        messageDiv.textContent = 'Deck embaralhado.';
    }
    return deck.pop();
}

function canPlay(card, topCard) {
    return card.color === topCard.color || card.value === topCard.value || card.color === 'wild';
}

function playCard(index) {
    const card = playerHand[index];
    const topCard = discardPile[discardPile.length - 1];

    if(canPlay(card, topCard)) {
        discardPile.push(card);
        playerHand.splice(index,1);
        messageDiv.textContent = `Você jogou ${formatCard(card)}.`;

        if(playerHand.length === 0) {
            messageDiv.textContent = '🎉 Parabéns, você ganhou!';
            drawButton.disabled = true;
            passButton.disabled = true;
        }

        updateUI();
    } else {
        messageDiv.textContent = 'Carta inválida para jogar nessa vez.';
    }
}

function formatCard(card) {
    let val = '';
    if(typeof card.value === 'number') val = card.value;
    else if(card.value === 'skip') val = '⏭️';
    else if(card.value === 'reverse') val = '🔄';
    else if(card.value === 'draw2') val = '+2';
    else if(card.value === 'wild') val = '🃏';
    else if(card.value === 'wilddraw4') val = '+4';

    return val + (card.color !== 'wild' ? ' ' + card.color : '');
}

function updateUI() {
    // Atualiza a carta no topo da pilha
    const topCard = discardPile[discardPile.length -1];
    topCardDiv.textContent = formatCard(topCard);
    topCardDiv.className = 'card ' + topCard.color;

    // Atualiza a mão do jogador
    playerHandDiv.innerHTML = '';
    playerHand.forEach((card, i) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card ' + card.color;
        cardDiv.textContent = formatCard(card);
        cardDiv.onclick = () => playCard(i);
        playerHandDiv.appendChild(cardDiv);
    });
}

drawButton.onclick = () => {
    const card = drawCard();
    playerHand.push(card);
    messageDiv.textContent = 'Você comprou uma carta.';
    updateUI();
};

passButton.onclick = () => {
    messageDiv.textContent = 'Você passou a vez.';
};

startGame();