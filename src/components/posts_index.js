// component that displays the all the posts (index page)
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; // creates link (button) to another route
import { fetchPosts } from '../actions';  // action creator

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      );
    })
  }

  render () {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a New Post
          </Link>
        </div>

        <h3>Posts (index)</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

// whenever you want to consume some from application level state,
// you must define the mapStateToProps function
function mapStateToProps(state) {
  return { posts: state.posts };
}


// hook up mapStateToProps as the first arg to the connect fxn
export default connect (mapStateToProps, { fetchPosts })(PostsIndex);
