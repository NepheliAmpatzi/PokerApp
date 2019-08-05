const Suit = {
  _Hearts = 1,
  _Diamonds = 2,
  _Clubs = 3,
  _Spades = 4,
}

const Card = {
  _Ace = 14,
  _Two = 2,
  _Three = 3,
  _Four = 4,
  _Five = 5,
  _Six = 6,
  _Seven = 7,
  _Eight = 8,
  _Nine = 9,
  _Ten = 10,
  _Jack = 11,
  _Queen = 12,
  _King = 13,
}

/**
 * Returns card code from Card, Suit combination
 * @param {Card} Card
 * @param {Suit} Suit
 * @returns {number}
 */
const getCodeFromCardSuitType = (card, suit) => (card.toString() + suit.toString());

/**
 * Gets Card Suit sets array and returns array of numbers that represent card codes
 * @param  {...{Card, Suit}} set
 * @returns {number[]}
 */
const getNumberCardArrayFromCardSuitSets = (...set) => (
  set.map(({card, suit}) => getCodeFromCardSuitType(card, suit))
)

module.exports = {
  Suit,
  Card,
  getNumberCardArrayFromCardSuitSets,
}