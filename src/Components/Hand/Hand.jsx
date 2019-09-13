import React, {useState} from 'react';
import Card from '../Card/Card';
import Placeholder from '../Placeholder';

const canBeClicked = () => true;

function Hand({
  cards,
  npc,
  value,
  CSSclass,
  labelStyle,
  label,
  readOnly
}) {
  const [hand, setHand] = useState(cards);

  return (
    <div className={CSSclass}>
      <div>
        <div className={labelStyle}>{label}</div>
        <Placeholder
          class={npc ? "npc-placeholder" : "player-placeholder"}
          value={value}
          readOnly={readOnly}
        />
      </div>
      {cards.map((card, i) => (
        <Card
          key={i}
          cardCode={card}
          turned={npc}
          selected={card.selected}
          onCardClicked={() => setHand([
            ...hand,
            hand[i].selected = !hand[i].selected
          ])}
        />
        )
      )}
    </div>
  )
}


export default Hand;