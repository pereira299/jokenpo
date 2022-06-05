let readyToKeyPress = false;
const players = [
    { option: 'rock'},
    { option: 'rock'},
]
let isAlone = true;
const tradutor = {
    rock: 'pedra',
    paper: 'papel',
    scissor: 'tesoura'
}
const startGame = async (alone = true) => {
    isAlone = alone;
    players[0].option = 'rock';
    players[1].option = 'rock';
    const hands = document.querySelectorAll('.player-image');
    const handsImg = document.querySelectorAll('.player-image img');
    const gameControl = document.querySelector('#game-control');
    handsImg[0].src = `/assets/imgs/${players[0].option}-left.svg`;
    handsImg[1].src = `/assets/imgs/${players[1].option}-right.svg`;
    readyToKeyPress = true;
    if (alone) {
        //generate number between 0 and 2
        const random = Math.floor(Math.random() * 3);
        switch (random) {
            case 0:
                players[1].option = 'rock';
                break;
            case 1:
                players[1].option = 'paper';
                break;
            case 2:
                players[1].option = 'scissor';
                break;
        }
    }
    hands[0].style.transform = "rotate(45deg)";
    hands[1].style.transform = "rotate(-45deg)";
    gameControl.innerHTML = `<p class="text-5xl font-bold text-center">Preparado?</p>`;
    await delay(2000);
    hands.forEach(hand => {
        hand.classList.add("ready");
    });
    setTimeout(() => {
        hands.forEach(hand => {
            hand.classList.add("go");
        });
    }, 2000);
    gameControl.innerHTML = `<p class="text-5xl font-bold text-center">JO</p>`;

    await delay(600);
    gameControl.innerHTML = `<p class="text-5xl font-bold text-center">KEN</p>`;

    await delay(600);
    gameControl.innerHTML = `<p class="text-5xl font-bold text-center">PO</p>`;

    readyToKeyPress = false;
    await delay(600);
    hands[0].style.transform = "rotate(0deg)";
    hands[1].style.transform = "rotate(0deg)";
    await delay(300);
    handsImg[0].src = `/assets/imgs/${players[0].option}-left.svg`;
    handsImg[1].src = `/assets/imgs/${players[1].option}-right.svg`;

    const winner = hasWinner(players);
    if (isNaN(winner)) {
        gameControl.innerHTML = `<p class="text-5xl font-bold text-center">${winner}</p>
        <button onclick="window.location.reload()" class="rounded bg-red-500 text-lg py-5 mb-10 font-bold text-white">
                    <p>Jogar novamente</p>
                </button>`;
    }else {
        hands[winner - 1].classList.add("winner");
        gameControl.innerHTML = `<p class="text-5xl font-bold text-center mb-10">${tradutor[players[winner - 1].option]} venceu!</p>
        <button onclick="window.location.reload()" class="rounded bg-red-500 text-lg py-5 mb-10 font-bold text-white">
                    <p>Jogar novamente</p>
                </button>`;
    }
    
setTimeout(() => {
    hands.forEach(hand => {
        hand.classList.remove("go");
        hand.classList.remove("ready");
    });
}, 1000);

}

const hasWinner = (players) => {
    if (players[0].option === players[1].option) {
        return 'Empate';
    }

    if (players[0].option === 'rock') {
        if (players[1].option === 'paper') {
            return 2;
        }
        return 1;
    } else if (players[0].option === 'paper') {
        if (players[1].option === 'scissor') {
            return 2;
        }
        return 1;
    } else if (players[0].option === 'scissor') {
        if (players[1].option === 'rock') {
            return 2;
        }
        return 1;
    }
}

document.addEventListener("keydown", (e) => {
    if (!readyToKeyPress) return;

    switch (e.key.toLowerCase()) {
        case "a":
            players[0].option = "rock";
            break;
        case "s":
            players[0].option = "paper";
            break;
        case "d":
            players[0].option = "scissor";
            break;
        case "j":
            if(isAlone)
                players[1].option = "rock";
            break;
        case "k":
            if(isAlone)
                players[1].option = "paper";
            break;
        case "l":
            if(isAlone)
                players[1].option = "scissor";
            break;
    }
});
const delay = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}