// #region Actions
export const CHANGE_PLAYER_BALANCE = 'CHANGE_PLAYER_BALANCE';
export const RAISE = 'RAISE';
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

/**
 * @param {number} payload is the amount of raise
 */
export const onRaise = (payload) => ({
  type: RAISE,
  payload,
});

// #endregion Action Creators