const suits = [
  { code: 1, value: 'hearts' },
  { code: 2, value: 'diams' },
  { code: 3, value: 'clubs' },
  { code: 4, value: 'spades' }
];
const ranks = [
  { code: 2, value: 2 }, { code: 3, value: 3 }, { code: 4, value: 4 }, { code: 5, value: 5 },
  { code: 6, value: 6 }, { code: 7, value: 7 }, { code: 8, value: 8 }, { code: 9, value: 9 },
  { code: 10, value: 10 }, { code: 11, value: 'J' }, { code: 12, value: 'Q' },
  { code: 13, value: 'K' }, { code: 14, value: 'A' }
];

const getCardCss = (num, suit) => (
  "rank-" + num.toString().toLowerCase() + " " + suit
);

const getSuitSymbol = (suit) => {
  switch (suit) {
    case 'spades': return '♠';
    case 'hearts': return '♥';
    case 'clubs': return '♣';
    case 'diams': return '♦';
    default: return '';
  }
};

const getCardLiteralsFromCardCode = (cardCode) => {
  const matchToRank = ranks.find(rank => rank.code === Math.floor(cardCode / 10));
  const matchToSuit = suits.find(suit => suit.code === Number(cardCode.toString().split('').pop()));
  return {
    NumberL: matchToRank.value,
    SuitL: matchToSuit.value
  }
}

export {
  getCardCss,
  getSuitSymbol,
  getCardLiteralsFromCardCode,
  suits,
  ranks,
}