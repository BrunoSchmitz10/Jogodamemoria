// Constantes para classes CSS
const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

// Inicia o jogo
startGame();

function startGame() {
    initializeCards(game.createCardsFromTechs());
}

// Cria e exibe as cartas no tabuleiro
function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';
    
    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Cria os lados (frente/verso) de cada carta
function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

// Cria um lado específico da carta
function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    
    if (face == FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    
    element.appendChild(cardElementFace);
}

// Manipula o clique e virar das cartas
function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add("flip");
        
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000);
            }
        }
    }
}

// Reinicia o jogo
function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
}