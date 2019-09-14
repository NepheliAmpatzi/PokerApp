// #region Actions
export const CHANGE_PLAYER_BALANCE = 'CHANGE_PLAYER_BALANCE';
export const PLAYER_BALANCE_CHANGED_SUCCESSFULLY = 'PLAYER_BALANCE_CHANGED_SUCCESSFULLY';

// #endregion Actions

// #region Action Creators

/**
 * @param {number} payload is the amount difference that will be applied to the payload
 */
export const changePlayerBalance = (payload) => ({
  type: CHANGE_PLAYER_BALANCE,
  payload,
});

// #endregion Action Creators