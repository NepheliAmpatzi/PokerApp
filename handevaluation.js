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

function CheckForFlushRoyal(hand) {
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

CheckForFlushRoyal(randomHand)