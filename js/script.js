// constants to store images for cards. 
// we used nine differents images, so we'll have eighteen cards 
const imagesPics = ["img/pokemons/001.png","img/pokemons/002.png","img/pokemons/003.png","img/pokemons/004.png","img/pokemons/005.png","img/pokemons/006.png","img/pokemons/007.png","img/pokemons/008.png","img/pokemons/009.png"];

// list of opened cards
let cardsOpen = new Array();
// list of images showed
let imgCardsOpen = new Array();
// These variables are used to compare two cards opened
// to know if they are the same or not

// count the number of cards found to check if all have been opened 
// to end the game
let nbCardsOpen = 0;

// for two players, we save the current player
let currentPlayer = 1;
// we store scores for each player
let scorePlayer1 = 0, scorePlayer2 = 0;

document.addEventListener("DOMContentLoaded", () => {

    // First, we load images in the cards back
    loadImages();

    // It's the player 1 to play at the start by default
    displayMessage("It's the turn of player "+currentPlayer+"...");

    // for each click on a card
    cards = document.querySelectorAll(".card");
    cards.forEach(function(card) {
        card.addEventListener("click", async function() {
            
            // we get his ID
            let cardID = card.getAttribute("id");
            // And his state (open or close)
            let state = card.getAttribute("state");

            // if the current card is closed during the click
            if(state == "close"){
                // we open it
                openCard(cardID);

                // next we save the card 
                cardsOpen.push(cardID); // with his ID
                // next his image with the attribut src of the image html element of the card-back
                imgCardsOpen.push(document.querySelector("#"+cardID+" > .inner-card > .card-back > img").getAttribute("src"));

                // we take a little break of 500ms to add a control effect on the game
                // it's an asynchronous function which pauses the game during 500ms (the reason of 'await')
                await sleep(500); 

                // if when we open a card, we see that it's the second one
                if(cardsOpen.length == 2){
                    // we compare the two cards
                    if(imgCardsOpen[0] != imgCardsOpen[1]){ // if they're differents, 
                        // we close the both of them
                        closeCard(cardsOpen[0]);
                        closeCard(cardsOpen[1]);
                    
                    }else{ // otherwise
                        // we save that two cards have been opened
                        nbCardsOpen += 2;
                        // and we update scores
                        updateScores();
                    }

                    // next, we reset the list of opened cards
                    // and the list of opened images to compare only two cards at the same time
                    cardsOpen = new Array();
                    imgCardsOpen = new Array();

                    // then we pass the game to the other player
                    switchPlayer();

                    // if all cards have been opened
                    if(nbCardsOpen == (imagesPics.length*2)){
                        // we show the winner by comparing the scores
                        if(scorePlayer1 > scorePlayer2)
                            displayMessage("Player 1 wins !!!");
                        else
                            displayMessage("Player 2 wins !!!");
                    }
                }

            }
        });
    });
});

/**
 * Function used to load images
 * in the back-cards
 */
function loadImages(){
    // we align images two times
    let allImages = imagesPics.concat(imagesPics);
    // and we shuffle the new array to have new array with mixed content
    mixedImages = shuffle(allImages);
    
    let cpt = 0;
    // for each card
    var cards = document.getElementsByClassName("revealed-img");
    for (var i = 0; i < cards.length; i++) {
        // we set a random image from our mixed array
        cards[i].setAttribute("src", mixedImages[cpt]);
        cpt++;
    }
}

/**
 * Function used to shuffle images randomly in an array
 * 
 * @param {Array} arrayToShuffle the array to shuffle
 */
function shuffle(arrayToShuffle){
    let len = arrayToShuffle.length, index;

    for(index = len - 1; index > 0; index--){
        random = Math.floor(Math.random() * (index + 1));
        temp = arrayToShuffle[index];
        arrayToShuffle[index] = arrayToShuffle[random];
        arrayToShuffle[random] = temp;
    }

    return arrayToShuffle;
}

/**
 * Function used to make a break in the game
 * 
 * @param {Integer} ms the time of the break (in milliseconds)
 */
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Function used to open a card
 * 
 * @param {String} cardID the ID of the card to open
 */
function openCard(cardID){
    // First, we set the card opened
    document.getElementById(cardID).setAttribute("state", "open"); 
    // and next we slide the card in 180 degree to open it
    document.querySelector("#"+cardID+" > .inner-card").style.transform = "rotateY(180deg)";
}

/**
 * Function used to close a card
 * 
 * @param {String} cardID the ID of the card to close
 */
function closeCard(cardID){
    // First, we set the card closed
    document.getElementById(cardID).setAttribute("state", "close");
    // and next we slide the card in 0 or 360 degree to close it
    document.querySelector("#"+cardID+" > .inner-card").style.transform = "rotateY(0deg)";
}

/**
 * Function used to switch between our players and set
 * which one can play or not
 */
function switchPlayer(){
    if(currentPlayer == 1){
        currentPlayer = 2;
    }else{
        currentPlayer = 1;
    }

    displayMessage("It's the turn of player "+currentPlayer+"...");
}

/**
 * Function used to update scores and display the winner
 */
function updateScores(){
    // according to the current player, we update the score
    if(currentPlayer == 1)
        scorePlayer1++;
    else
        scorePlayer2++;

    // and we display it
    document.getElementById("score1").innerHTML = scorePlayer1;
    document.getElementById("score2").innerHTML = scorePlayer2;
}

/**
 * Function used to display a message on the game
 */
function displayMessage(message){
    document.getElementById("message").innerHTML = message;
}
