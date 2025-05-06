let game = {
    lockMode: false, // Bloqueia cliques durante verificação
    firstCard: null, // Primeira carta virada
    secondCard: null, // Segunda carta virada
    techs: [ // Tecnologias usadas no jogo
        'bootstrap', 'css', 'electron', 'firebase', 'html',
        'javascript', 'jquery', 'mongo', 'node', 'react'
    ],
    cards: null, // Array de cartas do jogo

    // Seleciona uma carta para virar
    setCard: function(id) {
        let card = this.cards.filter(card => card.id === id)[0];
        
        if (card.flipped || this.lockMode) return false;
        
        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    // Verifica se as cartas são iguais
    checkMatch: function() {
        return this.firstCard.icon == this.secondCard.icon;
    },

    // Reseta as cartas selecionadas
    clearCards: function() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    // Desvira cartas que não combinam
    unflipCards: function() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    // Verifica se todas as cartas foram viradas
    checkGameOver: function() {
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    // Cria pares de cartas a partir das tecnologias
    createCardsFromTechs: function() {
        this.cards = this.techs
            .map(tech => this.createPairFromTech(tech))
            .flat();
        this.shuffleCards();
        return this.cards;
    },
    
    // Cria um par de cartas com mesma tecnologia
    createPairFromTech: function(tech) {
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }];
    },
    
    // Gera ID único para cada carta
    createIdWithTech: function(tech) {
        return tech + parseInt(Math.random() * 1000);
    },

    // Embaralha as cartas 
    shuffleCards: function() {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = 
            [this.cards[currentIndex], this.cards[randomIndex]];
        }
    }
};