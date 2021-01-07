import React from "react";
import Joi from "joi-browser";
import Form from "../components/Form";
import auth from "../services/authService";

export default class LoginForm extends Form {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: "",
        password: "",
      },
      errors: {},
    };
  }

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "autoFocus")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}
