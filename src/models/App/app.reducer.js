import {
  CHANGE_PLAYER_BALANCE
} from './app.actions.creator';

import {
  getPlayerBalance
} from './app.stateSelectors';

export const initialState = {
  app: {
    playerHand: [],
    npcHand: [],
    deck: [],
    indexOccurencies: {},
    uniqueselectedCards: [],
    raiseAmount: '',
    npcBet: '',
    playerBet: '',
    totalBet: '',
    disableBtn: true,
    currentNpcBalance: 1000,
    currentPlayerBalance: 1000,
    playerWins: false,
    npcWins: false,
    tie: false,
    cardInfo: {
      cardCode: null,
      selected: false
    }
  }
};

/**
 * A function that receives an action and changed the state
 * @param {*} state the state that will be transformed byt the reducer
 * @param {*} action the action that is responsible for the state change
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case (CHANGE_PLAYER_BALANCE): {
      const playerBalance = getPlayerBalance(state);
      const currentPlayerBalance = playerBalance + action.payload;
      return {
        ...state,
        currentPlayerBalance,
      };
    }
    default: {
      return state;
    }
  }
}