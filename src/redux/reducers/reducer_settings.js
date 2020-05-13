import { EDITING_SETTINGS, EDITED_SETTINGS } from '../actions/settings';

const initialState = { isEditingSettings: false };

export default (state = initialState, action) => {
  switch (action.type) {

  case EDITING_SETTINGS:
    return Object.assign({}, state, { isEditingSettings: true });

  case EDITED_SETTINGS:
    return Object.assign({}, state, { isEditingSettings: false });

  default:
    return state;
  }
}
