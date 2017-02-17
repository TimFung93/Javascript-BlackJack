
//const Shuffle = require('shuffle-array');


let ACE = 11;
let rank = [ACE, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
let suit = ["Clubs", "Diamonds", "Hearts", "Spades"]


let player_hand = [];
// player_hand.push(cardsInDeck.pop(),cardsInDeck.pop()) 
// console.log(player_hand)
let dealer_hand = [];




function shuffleArray(array) {
  // i-- iterating backwards through array
    for (let i = array.length - 1; i > 0; i--) {  //array.length - 1 = index of last position
        let j = Math.floor(Math.random() * (i + 1)); // let j === random number based on length of array, 
        let temp = array[i]; // let temp === to array at iteration i which in this 
        array[i] = array[j]; // let iteration of i assign to iteration of j, basically swapping
        array[j] = temp; // iteration j temp which was the old array at i
    }
    return array; // returns shuffled deck
}
// every iteration swaps 2 values then goes down by one


function Card(rank, suit) {

  this.rank = rank;
  this.suit = suit;

}




function Deck() {
    cardsInDeck = [];
   // console.log(cardsInDeck)
    for (let i = 0; i < suit.length; i++) {
      for(let j = 0; j < rank.length; j++) {
        cardsInDeck.push(new Card(rank[j], suit[i]))
      }
    }
   // console.log(cardsInDeck)

    this.dealHand = function(hand) {
      
      hand.push(cardsInDeck.pop()) 

     
    };
  
    // this.total = function(hand) {

    // }
    shuffleArray(cardsInDeck)
}












function total(hand) { // takes in hand as array 
 
  let total = hand.reduce(function(sum,hand) {
    return sum + hand.rank
  }, 0)
  

  for (let i = 0; i < hand.length; i++) {
      let ace = hand[i]
      if (ace.rank[ACE] > 0 && total > 21) {
        while(ace.rank[ACE] > 0 && total > 21) {
          total = total - 10
          ACE = ACE - 1
        }
      }
      
  }
  //console.log(ACE)
  return total
}





let deck = new Deck();



let playerWins = 0;
let dealerWins = 0;


//dealer_hand.push(cardsInDeck.pop(),cardsInDeck.pop()) 
//console.log(player_hand)
//console.log(dealer_hand)








//   $('#card').append('<span style="margin-right: 10px;">' + newCard.rank + ' '+ newCard.suit + '</span>')

//   let total_value = total(player_hand)

//    $('#value').html('<span style="margin-right: 10px;"> ' + 'The total value is ' +total_value + '</span>')

function Game(player_total, dealer_total) {
  //let  player_total = total(playerHand)
  //let dealer_total = total(dealerHand)
  let winner = '';


     if (player_total > 21 || dealer_total === 21) {
      winner = 'Player busts, dealer wins'
      //alert("i work")
      dealerWins++
      $("#losses").html(dealerWins);
      
      console.log(dealerWins)
     } 
     else if (dealer_total > 21 || player_total === 21 || player_total > dealer_total) {
      winner = "Player win"
      playerWins++
      $("#wins").html(playerWins);
       
     } 
     else if (dealer_total > player_total) {
      winner = "Dealer wins, player loses";
      dealerWins++
      $("#losses").html(dealerWins);
      
     } 
     else if (dealer_total === player_total) {
      winner = "Tie"
     

     }
     console.log(winner)
     
    

     return winner 
       
}



      let dealer_total = 0;
      let dealer = function() {
         do {
            deck.dealHand(dealer_hand)
            dealer_total = total(dealer_hand)
            //console.log(dealer_hand)
            //console.log(dealer_hand)
            total(dealer_hand)
            //console.log(dealer_total)
            let newCard = dealer_hand[dealer_hand.length - 1];
            //console.log(newCard)
            $('#dealercard').append('<span style="margin-right: 10px;"> ' + newCard.rank + ' ' + newCard.suit + '</span>')
            $('#dealervalue').html('<span style="margin-right: 10px;"> ' + "The total value of the dealer is " + dealer_total + '</span>')

      } while(dealer_total < 17)
  }







  let hitMe = function() {
       deck.dealHand(player_hand)
       let newCard = player_hand[player_hand.length - 1];
       $("#dealerHand").append('<span style="margin-right: 10px;"> ' + newCard.rank + ' ' + newCard.suit + '</span>')
       $("#value").html("The total value of the player is " + total(player_hand))

  }
    

  $("#hit").prop("disabled",true);
  $('#stay').prop("disabled",true);






    $('#deal').click(function() {

        $('#dealerHand').html(' ')
        $('#value').html(' ')
        $('#dealercard').html(' ')
        $('#dealervalue').html(' ')

        player_hand.push(cardsInDeck.pop(),cardsInDeck.pop()) 
       //dealer_hand.push(cardsInDeck.pop(),cardsInDeck.pop()) 


        $("#dealerHand").append(player_hand[0].rank + ' ' + player_hand[0].suit).append(' ' + player_hand[1].rank +' '+ player_hand[1].suit)
        $("#value").html("The total value for player is " + total(player_hand))
        //console.log(player_hand)


        $(this).prop("disabled",true);
        $("#hit").prop("disabled",false);
        $('#stay').prop("disabled",false);
    })

   

// maybe use some true and false values
    $("#hit").click(function() {
      hitMe()
        
       
       if (total(player_hand) >= 21) {
          console.log("Player Busts")
          $(this).prop("disabled", true);
          $('#stay').prop("disabled", true);
            $('#deal').prop("disabled",false);
              $('#winner').html(Game(total(player_hand),total(dealer_hand)))
          dealer()
        }
       


    })

    $('#stay').click(function() {
      
        dealer()
        $('#winner').html(Game(total(player_hand),total(dealer_hand)))
       
      
       
    })






 //do {
//     deck.dealHand(dealer_hand)
//     dealer_total = total(dealer_hand)

//     newCard = dealer_hand[dealer_hand.length - 1];
//     $('#dealercard').append('<span style="margin-right: 10px;"> ' + newCard.rank + ' ' + newCard.suit + '</span>')
//     $('#dealervalue').html('<span style="margin-right: 10px;"> ' + dealer_total + '</span>')
//     console.log(dealer_total);
//     $(this).prop("disabled",true);
//   } while (dealer_total < 17)





// $('#hit').click(function () { // change this to start
//   
//   console.log(player_hand)

//   //disable the button after it deals 2 cards
//   //start tagetting hit
//
//   //evaluate here
//   if (total_value === 21) {
//     $('#blackjack').html("blackjack")
//   }
//   else if (total_value > 21) {
//     $('#blackjack').html("Player bust")

//      $(this).prop("disabled",true);
//       let newCard;
//       let dealer_total = 0;
  
//   do {
//    
//     dealer_total = total(dealer_hand)

//     newCard = dealer_hand[dealer_hand.length - 1];
//     $('#dealercard').append('<span style="margin-right: 10px;"> ' + newCard.rank + ' ' + newCard.suit + '</span>')
//     $('#dealervalue').html('<span style="margin-right: 10px;"> ' + "The total value of the dealer is " + dealer_total + '</span>')
//     console.log(dealer_total);
//     $(this).prop("disabled",true);
//     $('#stay').prop("disabled",true);
//   } while (dealer_total < 17)

//   if (dealer_total > total_value) {
//     alert("Dealer wins, Player loses")
//   } else if (total_value > dealer_total) {
//     alert("Player wins, Dealer Loses")
//   }
//   }

// })


// // evaluating 



// $("#stay").click(function() {
//   console.log('Iwork')
//   let newCard;
//   let dealer_total = 0;
  
//   do {
//     deck.dealHand(dealer_hand)
//     dealer_total = total(dealer_hand)

//     newCard = dealer_hand[dealer_hand.length - 1];
//     $('#dealercard').append('<span style="margin-right: 10px;"> ' + newCard.rank + ' ' + newCard.suit + '</span>')
//     $('#dealervalue').html('<span style="margin-right: 10px;"> ' + dealer_total + '</span>')
//     console.log(dealer_total);
//     $(this).prop("disabled",true);
//   } while (dealer_total < 17)

//   if (dealer_total === 21) {
//     alert("Blackjack")
//   } else if (dealer_total > 21) {
//     alert("Player Wins")
//   }

// })
 























// let player_hand
 

//deck.startHand(player_hand)


















