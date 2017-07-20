import axios from 'axios';
export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=PAPERCLIP999';

// FetchPosts action creator
export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  // return an action with the request as the payload
  return {
    type: FETCH_POSTS,
    payload: request
  };
}

// CreatePosts action creator
export function createPost(values, callback) {
  // post request format (Url, content)
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then( () => callback() );

  return {
    type: CREATE_POST,
    payload: request
  }
}

// FetchPost Action creator
export function fetchPost(id){
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  }
}

// deletePost action creator
export function deletePost(id, callback){
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then( () => callback() );

  return {
    type: DELETE_POST,
    payload: id
  }
}
