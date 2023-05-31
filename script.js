// Shuffle function to randomize the order of elements in an array
function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  // Variables to track game state
  var images = ['ghost1.jpg', 'ghost2.jpg', 'ghost3.jpg', 'ghost4.jpg', 'ghost5.jpg', 'ghost6.jpg', 'ghost7.jpg', 'ghost8.jpg'];
  var gameStarted = false;
  var cardsFlipped = 0;
  var firstCard, secondCard;
  var canFlip = true;
  var score = 0;
  
  // Function to create the game board
  function createGameBoard() {
    var shuffledImages = shuffle(images.concat(images));
    var gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
  
    for (var i = 0; i < shuffledImages.length; i++) {
      var card = document.createElement('div');
      card.className = 'card';
  
      var cardFront = document.createElement('div');
      cardFront.className = 'card-front';
      cardFront.style.backgroundImage = 'url(' + shuffledImages[i] + ')';
  
      var cardBack = document.createElement('div');
      cardBack.className = 'card-back';
  
      card.appendChild(cardFront);
      card.appendChild(cardBack);
  
      card.addEventListener('click', flipCard);
      gameBoard.appendChild(card);
    }
  }
  
  // Function to handle card flips
  function flipCard() {
    if (!canFlip || this === firstCard) return;
  
    this.classList.add('flipped');
  
    var cardFront = this.querySelector('.card-front');
    cardFront.style.display = 'block';
  
    if (!firstCard) {
      firstCard = this;
    } else {
      secondCard = this;
      canFlip = false;
      checkForMatch();
    }
  }
  
  // Function to check if two flipped cards match
  function checkForMatch() {
    var isMatch = firstCard.querySelector('.card-front').style.backgroundImage === secondCard.querySelector('.card-front').style.backgroundImage;
    isMatch ? disableCards() : unflipCards();
  }
  
  // Function to disable matched cards
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetCards();
    score++;
  
    if (score === images.length) {
      endGame();
    }
  }
  
  // Function to unflip unmatched cards after a delay
  function unflipCards() {
    setTimeout(function() {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      var firstCardFront = firstCard.querySelector('.card-front');
      var secondCardFront = secondCard.querySelector('.card-front');
      firstCardFront.style.display = 'none';
      secondCardFront.style.display = 'none';
      resetCards();
    }, 1000);
  }
  
  // Function to reset card-related variables
  function resetCards() {
    firstCard = null;
    secondCard = null;
    canFlip = true;
  }
  
  // Function to start the game
  function startGame() {
    if (!gameStarted) {
      gameStarted = true;
      score = 0;
      createGameBoard();
      document.getElementById('startButton').style.display = 'none';
      document.getElementById('restartButton').style.display = 'inline-block';
    }
  }
  
  // Function to restart the game
  function restartGame() {
    gameStarted = false;
    cardsFlipped = 0;
    firstCard = null;
    secondCard = null;
    canFlip = true;
    score = 0;
    createGameBoard();
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('startButton').style.display = 'inline-block';
  }
  
  // Function to end the game
  function endGame() {
    alert('Congratulations! You have completed the game.');
    restartGame();
  }
  
  // Event listeners for the start and restart buttons
  document.getElementById('startButton').addEventListener('click', startGame);
  document.getElementById('restartButton').addEventListener('click', restartGame);
  