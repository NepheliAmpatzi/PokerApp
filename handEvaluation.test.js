const { 
  CheckTheHand, 
  getCardLiteralsFromCardCode
} = require('./handevaluation.js');

const {
  Card,
  Suit,
} = require('./handEvaluation.testHelper');


console.log(getCardLiteralsFromCardCode(122));

// CheckTheHand([122,122,122,122,122]);