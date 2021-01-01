import React, { Component } from "react";
import Input from "../components/Input";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: {
        username: "",
        password: "",
      },
      errors: {},
    };
  }

  validate = () => {
    const errors = {};
    const { account } = this.state;
    if (account.username.length === 0) errors.username = "Username is required";

    if (account.password.length === 0) errors.password = "Password is required";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.length === 0) return "Username is required";
    }
    if (name === "password") {
      if (value.length === 0) return "Password is required";
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log("submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({
      account,
      errors,
    });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            type="text"
            autoFocus="autoFocus"
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            type="password"
            error={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}
