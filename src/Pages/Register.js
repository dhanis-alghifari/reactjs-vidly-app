import React from "react";
import Joi from "joi-browser";
import Form from "../components/Form";

export default class Register extends Form {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: "",
        username: "",
        password: "",
      },
      errors: {},
    };
  }

  schema = {
    username: Joi.string().required().label("Username"),
    email: Joi.string().required().email({ minDomainAtoms: 2 }).label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  doSubmit = () => {
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "autoFocus", "email")}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}
