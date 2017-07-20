import { combineReducers } from 'redux';

// NOTE: import reducer from redux-form
// but use alias 'formReducer' to avoid name collisions with the keyword reducer
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer //form piece of state is controlled by formReducer
});

export default rootReducer;
