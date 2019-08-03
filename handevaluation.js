// const deck = [21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44, 51, 52, 53, 
//       54, 61, 62, 63, 64, 71, 72, 73, 74, 81, 82, 83, 84, 91, 92, 93, 94, 101, 
//       102, 103, 104, 111, 112, 113, 114, 121, 122, 123, 124, 131, 132, 133, 134, 
//       141, 142, 143, 144];

const suits = [
  {code: 1, value: 'Hearts'}, 
  {code: 2, value: 'Diamonds'}, 
  {code: 3, value: 'Clubs'}, 
  {code: 4, value: 'Spades'}
];
const ranks = [
  {code: 2, value: 2}, {code: 3, value: 3}, {code: 4, value: 4},{code: 5, value: 5},
  {code: 6, value: 6}, {code: 7, value: 7}, {code: 8, value: 8}, {code: 9, value: 9}, 
  {code: 10, value: 10}, {code: 11, value: 'Jack'}, {code: 12, value: 'Queen'},
  {code: 13, value: 'King'}, {code: 14, value: 'Ace'}
];

const randomHand = [142, 32, 122, 102, 112]

function getCardLiteralsFromCardCode(cardCode){
  const matchToRank = ranks.filter(rank => rank.code === Math.floor(cardCode/10))
  const matchToSuit = suits.filter(suit => suit.code === Number(cardCode.toString().split('').pop()))
  return {NumberL: matchToRank[0].value, SuitL: matchToSuit[0].value}
}

function checkForDescendingSequence(hand, difference) {
    const simplifiedCardCodes = hand
        .map(card => Math.floor(card / 10));
    const differences = simplifiedCardCodes
        .slice(1)
        .map((card, i) => simplifiedCardCodes[i] - card)

    return differences.every(diff => diff === difference);
}

function checkForDescendingSequenceAndSameSuit(hand, difference) {
    return hand
        .sort((a, b) => (b - a))
        .slice(1)
        .map((card, i) => hand[i] - card)
        .every(diff => diff === difference)
}

function checkIfthereIsAce(hand) {
    return hand.includes(141) ? true :
        hand.includes(142) ? true :
        hand.includes(143) ? true :
        hand.includes(144) ? true :
        false;
}

function CheckForSameSuit(hand) {
    let handSuitCodes = hand.map(suitCode => Number(suitCode.toString().split('').pop()));
    return handSuitCodes.every((code, i, array) => code === array[0])
}

function CheckTheHand(hand) {
    if (checkForDescendingSequenceAndSameSuit(hand, 10) &&
        checkIfthereIsAce(hand)) {
        console.log("FLUSH ROYAL!!!")
        return true;
    } else if (checkForDescendingSequenceAndSameSuit(hand, 10)) {
        console.log('STRAIGHT FLUSH!')
        return true;
    } else if (checkForDescendingSequence(hand, 1)) {
        console.log('SIMPLE STRAIGHT')
        return true;
    } else if (CheckForSameSuit(hand)) {
        console.log('FLUSH')
        return true
    }
}

CheckTheHand(randomHand);
getCardLiteralsFromCardCode(142);
