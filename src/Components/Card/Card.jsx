import React from 'react';
import { getCardCss, getCardLiteralsFromCardCode, getSuitSymbol } from './card.helper';

const Card = ({ turned, selected, cardCode, onCardClicked }) => {
  const { NumberL, SuitL } = getCardLiteralsFromCardCode(cardCode);
  const CSSClasses = [
    'card',
    getCardCss(NumberL, SuitL),
    selected ? 'selected-card' : '',
  ];

  return (
    <div className="playingCards fourColours" >
      <a
        onClick={() => onCardClicked()}
        className={
          turned ? "card back" : CSSClasses.join(' ')
        }>
        <span className="rank">{NumberL}</span>
        <span className="suit">{getSuitSymbol(SuitL)}</span>
      </a>
    </div >
  )
};


export default Card;