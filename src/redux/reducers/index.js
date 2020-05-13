import { combineReducers } from 'redux';
import users from './reducer_users';
import auth from './reducer_auth';
import states from './reducer_states';
import alerts from './reducer_alerts';
import likes from './reducer_likes';
import personality from './reducer_personality';
import conversations from './reducer_conversations';
import messages from './reducer_messages';
import currentUser from './reducer_current_user';
import settings from './reducer_settings';
import blocked_users from './reducer_blocked_users';

const rootReducer = combineReducers({
  auth,
  alerts,
  users,
  states,
  likes,
  personality,
  conversations,
  messages,
  currentUser,
  settings,
  blocked_users
});

export default rootReducer;
