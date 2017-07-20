import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  // state object is an object where the keys are the ids and
  // the values are the post body
  switch (action.type) {
    case DELETE_POST:
      // use _.omit to remove the deleted post from the state
      // pass the object (state) and id (action.payload) to remove k/v pair of that post
      return _.omit(state, action.payload);

    case FETCH_POST:
      // const post = action.payload.data;
      // const newState = { ...state };  // ...state --> current state obj
      // newState[post.id] = post;  // add a new k/v to state obj
      // return newState;

      // ES6 equivilant to the above comments
      return { ...state, [action.payload.data.id]: action.payload.data }; // add exisiting state obj with  the new k/v pair

    case FETCH_POSTS:
      // mapkeys turns the array into an object whose keys
      // are (in this case) are the ids of the array elements
      // [{id: 33, name: john}, {id:99, name: Bob}]  ---->
      // {
      //   33: {id: 33, name: jonn},
      //   99: {id:99, name: Bob}
      // }
      return _.mapKeys(action.payload.data, 'id');

    default:
      return state;
  }
}
