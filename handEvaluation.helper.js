// New function getSimplifiedCardCodesFromHand (you used that more than once)
const getSimplifiedCardCodesFromHand = (hand) => (hand.map(card => Math.floor(card / 10)));

// I would export this to handEvaluation.helper.js
function getCardLiteralsFromCardCode(cardCode) {
  const matchToRank = ranks.filter(rank => rank.code === Math.floor(cardCode / 10))
  const matchToSuit = suits.filter(suit => suit.code === Number(cardCode.toString().split('').pop()))
  return { NumberL: matchToRank[0].value, SuitL: matchToSuit[0].value }
}

module.exports = {
  getSimplifiedCardCodesFromHand,
  getCardLiteralsFromCardCode,
}