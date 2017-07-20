// New post component
import React, { Component } from 'react';

// import helpers from redux-form
// 1. Field is for input Fiel
// 2. reduxForm function  (similar to connect helper from react-redux libarary)
import { Field, reduxForm } from 'redux-form';
// Note: reduxForm helper allows our component to talk tothe redux store

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//import createPost action crearor
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const { meta: {touched, error } } = field;   //ex: touched === field.meta.touched, error === field.meta.error
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        {/* Display the error */}
        <div className="text-help">
          {touched ? error: ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {

    // call the createPost action creator with the values and a callback
    // function that will be executed when the action completes
    this.props.createPost(values, () => {
      // navigate back to the index page
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;


    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        {/* NOTE: name="title" produces title piece of state for this component*/}
        {/* NOTE: component={some function} defines how the field will appear on the screen*/}
        <Field
          label="Title for post"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// validate function that will be called by reduxForm
function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.title){
    errors.title = "Enter a title!";
    // NOTE: Error prop must match name values
    // Ex: errors.title matches name="title" from the <Field> tag
  }
  if (!values.categories){
    errors.categories = "Enter some categories!";
  }
  if(!values.content){
    errors.content = "Enter some content!"
  }

  // if errors is empty, the form is fine to submit
  // if errors has any properties, redux assumes form is invalid
  return errors;
}

// use the reduxForm helper to wrap the PostsNew component
// by doing so, reduxForm can communicate directly from this
// component to reducer
export default reduxForm({
  // validate function will be called anytime user tries to submit the form
  validate, // equivilant to: validate: 'validate',
  form: 'PostsNewForm'  //string must be unique to avoid sharing state with other forms
})(
  connect(null, { createPost })(PostsNew)
);
