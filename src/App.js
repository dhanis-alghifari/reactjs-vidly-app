import jwtDecode from "jwt-decode";
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Customers from "./Pages/Customers";
import LoginForm from "./Pages/LoginForm";
import MovieForm from "./Pages/MovieForm";
import Movies from "./Pages/Movies";
import NotFound from "./Pages/NotFound";
import Register from "./Pages/Register";
import Rentals from "./Pages/Rentals";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      console.log(user);
      this.setState({ user });
    } catch (error) {
      
    }
  }

  render() {
    return (
      <>
        <ToastContainer />
        <Navbar user={this.state.user} />
        <div className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
