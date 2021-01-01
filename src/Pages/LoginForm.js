import React, { Component } from "react";
import Joi from "joi";
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

  schema = Joi.object().keys({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  });

  validate = () => {
    const { error } = this.schema.validate(this.state.account, {
      abortEarly: false,
    });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemas = { [name]: this.schema[name] };
    const {error} = this.schema.validate(obj, schemas);
    return error ? error.details[0].message : null;
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
          <button disabled={this.validate()} className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}
