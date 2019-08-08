
/**
 * These are only suggestion that you are able to argue with! These are not rules but some better practices, or NOT.
 * Waiting for your news!
 */
(function pokerEvaluationLibrary() {
  const { getSimplifiedCardCodesFromHand, } = require('./handEvaluation.helper');

  // handEvaluation filename in camel case maybe?

  // CheckForDescendingSequence, as long you return somthing you could use getSomethingBySomthing and add a JDoc maybe
  function checkForDescendingSequence(hand, difference) {
    const simplifiedCardCodes = getSimplifiedCardCodesFromHand(hand);
    hand.sort((a, b) => b - a)
    const newarray = [14, 5, 4, 3, 2];
    if (JSON.stringify(newarray) === JSON.stringify(simplifiedCardCodes)) simplifiedCardCodes[0] = 1
    return simplifiedCardCodes
      .sort((a, b) => b - a)
      .slice(1)
      .map((card, i) => simplifiedCardCodes[i] - card)
      .every(diff => diff === difference);
  }

  // renamed checkIfthereIsAce --> hasAce, also this can be arrow too
  const hasAce = (hand) => (hand.map(card => Math.floor(card / 10)).includes(14));

  // Pascal case in a function indicates that this can be instantiated with new keyword
  // renamed CheckForSameSuit -> hasSameSuitInEveryCard
  function hasSameSuitInEveryCard(hand) {
    const handSuitCodes = hand.map(suitCode => Number(suitCode.toString().split('').pop()));
    return handSuitCodes.every((code, i, array) => code === array[0])
  }

  // renamed CheckForCardOccurencies --> hasCardOccurenciesTimes
  function hasCardOccurenciesTimes(hand, times) {
    const simplifiedCardCodes = getSimplifiedCardCodesFromHand(hand);
    return simplifiedCardCodes
      .map(item => simplifiedCardCodes
        .filter(other => item === other))
      .filter(content => content.length === times).length === times ? true : false
  }

  // renamed CheckForTwoPairs --> hasTwoPairs
  function hasTwoPairs(hand) {
    return hand.map(card => Math.floor(card / 10))
      .reduce((acc, curr) => {
        acc[curr] === undefined ? acc[curr] = 1 : acc[curr] += 1;
        return acc;
      }, [])
      .filter(entry => entry === 2)
      .length === 2
  }

  // Renamed in camel case
  function returnHighCard(hand) {
    hand.sort((a, b) => (b - a))
    return hand[0]
  }

  // renamed CheckTheHand --> getEvaluationResult
  function getEvaluationResult(hand) {
    if (checkForDescendingSequence(hand, 1) &&
      hasSameSuitInEveryCard(hand) &&
      hasAce(hand)) {
      console.log("FLUSH ROYAL!!!")
      return 1000;
    } else if (checkForDescendingSequence(hand, 1) &&
      hasSameSuitInEveryCard(hand)) {
      console.log('STRAIGHT FLUSH!')
      return 900;
    } else if (hasCardOccurenciesTimes(hand, 4)) {
      console.log('4 OF A KIND!')
      return 800
    } else if (hasCardOccurenciesTimes(hand, 3) &&
      hasCardOccurenciesTimes(hand, 2)) {
      console.log('FULL HOUSE')
      return 700
    } else if (hasSameSuitInEveryCard(hand)) {
      console.log('FLUSH')
      return 600
    } else if (checkForDescendingSequence(hand, 1)) {
      console.log('SIMPLE STRAIGHT')
      return 500;
    } else if (hasCardOccurenciesTimes(hand, 3)) {
      console.log('3 OF A KIND!')
      return 400
    } else if (hasTwoPairs(hand)) {
      console.log('2 PAIRS!!!')
      return 300
    } else if (hasCardOccurenciesTimes(hand, 2)) {
      console.log('ONE PAIR')
      return 200
    } else {
      console.log('Your high card is ' + returnHighCard(hand))
      return 100
    }
  }

  module.exports = {
    getEvaluationResult,
  }
}());