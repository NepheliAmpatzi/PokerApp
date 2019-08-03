// const deck = [21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44, 51, 52, 53, 
//       54, 61, 62, 63, 64, 71, 72, 73, 74, 81, 82, 83, 84, 91, 92, 93, 94, 101, 
//       102, 103, 104, 111, 112, 113, 114, 121, 122, 123, 124, 131, 132, 133, 134, 
//       141, 142, 143, 144];

const randomHand = [142, 32, 122, 102, 112]

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

CheckTheHand(randomHand)
