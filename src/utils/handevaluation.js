const specialCase = [14, 5, 4, 3, 2];

function SimplifiedCardCodes(hand) {
    return hand
        .map(card => Math.floor(card / 10))
        .sort((a, b) => b - a);
}

function checkForDescendingSequence(hand, difference) {
    const SimplifiedCardCodes = hand
        .map(card => Math.floor(card / 10))
        .sort((a, b) => b - a);
    if (JSON.stringify(specialCase) === JSON.stringify(SimplifiedCardCodes)) SimplifiedCardCodes[0] = 1
    return SimplifiedCardCodes
        .sort((a, b) => b - a)
        .slice(1)
        .map((card, i) => SimplifiedCardCodes[i] - card)
        .every(diff => diff === difference);
}

function checkForAce(hand) {
    if (JSON.stringify(specialCase) === JSON.stringify(SimplifiedCardCodes(hand))) return false
    return hand.map(card => Math.floor(card / 10)).includes(14);
}

function checkForSameSuit(hand) {
    const handSuitCodes = hand.map(suitCode => Number(suitCode.toString().split('').pop()));
    return handSuitCodes.every((code, i, array) => code === array[0])
}

function checkForCardOccurencies(hand, times) {
    return SimplifiedCardCodes(hand)
        .map(item => SimplifiedCardCodes(hand)
            .filter(other => item === other))
        .filter(content => content.length === times).length === times ? true : false
}

function checkHandOccurencies(hand) {
    return function(times) {
        return checkForCardOccurencies(hand, times)
    }
}

function checkForTwoPairs(hand) {
    return hand.map(card => Math.floor(card / 10))
        .reduce((acc, curr) => {
            acc[curr] === undefined ? acc[curr] = 1 : acc[curr] += 1;
            return acc;
        }, [])
        .filter(entry => entry === 2)
        .length === 2
}

// function returnHighCard(hand) {
//     hand.sort((a, b) => (b - a))
//     console.log(hand[0])
//     return hand[0]
// }

function getEvaluationResult(hand) {
    const hasDescSeq = checkForDescendingSequence(hand, 1);
    const hasSameSuit = checkForSameSuit(hand);
    const hasAce = checkForAce(hand);
    const Occurencies = checkHandOccurencies(hand);

    if (hasDescSeq && hasSameSuit && hasAce) return 1000;
    if (hasDescSeq && hasSameSuit) return 900;
    if (Occurencies(4)) return 800;
    if (Occurencies(3) && Occurencies(2)) return 700;
    if (hasSameSuit) return 600
    if (hasDescSeq) return 500;
    if (Occurencies(3)) return 400
    if (checkForTwoPairs(hand)) return 300
    if (Occurencies(2)) return 200
    else return 100;
}

export default getEvaluationResult;