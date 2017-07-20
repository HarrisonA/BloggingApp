import React, { Component } from 'react';
import { connect } from 'react-redux';
import{ fetchPost, deletePost } from '../actions';  // IMPORT action creators
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount(){
    // (the following is provided by react react-router)
    // it check URL params for :id value
    // const id = this.props.match.params.id;
    // es6 destructuring equivilant:
    const { id } = this.props.match.params;

    // now call the action creator (to fetch the post and add it
    // to the post piece of application level state)
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    // call the action creator 'deletePost' with id and callback function
    this.props.deletePost(id, () => {
      // navigate back to the index page
      this.props.history.push('/')
    });
  }

  render(){
    const  { post } = this.props;  // const post = this.props.post

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back to index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// mapStateToProps to take from app state and add to component state
// function mapStateToProps (state, ownProps){  // ownProps --> set of props going to the target component
function mapStateToProps ( { posts }, ownProps) {  //just want posts from app state
  // return just the post (of the id) from the lists of posts
  return { post: posts[ownProps.match.params.id]}
  // NOTE: follow up on ownProps purpose/functionality
  /* The first parameter of mapStateToProps is the state of the reducer
    that is being defined in reducers/index.js. React Router's
    "match" values are being passed using props,
    hence it would not be available at all in the
    first parameter, which is the reason they are
    passing the props as the second parameter
  */
}


// CONNECT the action creators 'fetchPost' & 'deletePost' to the component PostsShow
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
