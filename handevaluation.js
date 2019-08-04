const randomHand = [122, 123, 121, 92, 93]

const suits = [
    { code: 1, value: 'Hearts' },
    { code: 2, value: 'Diamonds' },
    { code: 3, value: 'Clubs' },
    { code: 4, value: 'Spades' }
];
const ranks = [
    { code: 2, value: 2 }, { code: 3, value: 3 }, { code: 4, value: 4 }, { code: 5, value: 5 },
    { code: 6, value: 6 }, { code: 7, value: 7 }, { code: 8, value: 8 }, { code: 9, value: 9 },
    { code: 10, value: 10 }, { code: 11, value: 'Jack' }, { code: 12, value: 'Queen' },
    { code: 13, value: 'King' }, { code: 14, value: 'Ace' }
];


function getCardLiteralsFromCardCode(cardCode) {
    const matchToRank = ranks.filter(rank => rank.code === Math.floor(cardCode / 10))
    const matchToSuit = suits.filter(suit => suit.code === Number(cardCode.toString().split('').pop()))
    return { NumberL: matchToRank[0].value, SuitL: matchToSuit[0].value }
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
    const handSuitCodes = hand.map(suitCode => Number(suitCode.toString().split('').pop()));
    return handSuitCodes.every((code, i, array) => code === array[0])
}

function CheckForCardOccurencies(hand, times) {
    const simplifiedCardCodes = hand.map(card => Math.floor(card / 10))
    return simplifiedCardCodes
        .map(item => simplifiedCardCodes
            .filter(other => item === other))
        .filter(content => content.length === times).length === times ? true : false
}

function CheckForTwoPairs(hand) {
    const simplifiedCardCodes = hand.map(card => Math.floor(card / 10))
    const OccurenciesToObject = simplifiedCardCodes.reduce((acc, curr) => {
        acc[curr] === undefined ? acc[curr] = 1 : acc[curr] += 1;
        return acc;
    }, {});
    const occurencies = Object.values(OccurenciesToObject);
    const occOf2 = occurencies.reduce((acc, curr) => {
        acc[curr] === undefined ? acc[curr] = 1 : acc[curr] += 1;
        return acc;
    }, {});
    return Object.values(occOf2).includes(2) ? true : false
}

function ReturnHighCard(hand) {
    hand.sort((a, b) => (b - a))
    return hand[0]
}

function CheckTheHand(hand){
if(checkForDescendingSequenceAndSameSuit(hand,10)
&&checkIfthereIsAce(hand)){
  console.log("FLUSH ROYAL!!!")
  return 1000;
} else if(checkForDescendingSequenceAndSameSuit(hand,10)){
  console.log('STRAIGHT FLUSH!')
  return 900;
} else if(CheckForCardOccurencies(hand, 4)){
  console.log('4 OF A KIND!')
  return 800
} else if (CheckForCardOccurencies(hand, 3)
&&CheckForCardOccurencies(hand, 2)){
  console.log('FULL HOUSE')
  return 700
} else if(CheckForSameSuit(hand)){
  console.log('FLUSH')
  return 600
} else if(checkForDescendingSequence(hand,1)){
  console.log('SIMPLE STRAIGHT')
  return 500;
} else if(CheckForCardOccurencies(hand, 3)){
  console.log('3 OF A KIND!')
  return 400
} else if(CheckForTwoPairs(hand)){
  console.log('2 PAIRS!!!')
  return 300
} else if(CheckForCardOccurencies(hand, 2)){
  console.log('ONE PAIR')
  return 200
} else {
  console.log('Your high card is '+ ReturnHighCard(hand))
  return ReturnHighCard(hand)
}
}
console.log(CheckTheHand(randomHand))
