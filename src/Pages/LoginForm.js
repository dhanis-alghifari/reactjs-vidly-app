import React from "react";
import Joi from "joi-browser";
import Form from "../components/Form";

export default class LoginForm extends Form {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        username: "",
        password: "",
      },
      errors: {},
    };
  }

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "autoFocus")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}
