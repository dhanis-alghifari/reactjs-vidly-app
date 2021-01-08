import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Customers from "./Pages/Customers";
import LoginForm from "./Pages/LoginForm";
import Logout from "./Pages/Logout";
import MovieForm from "./Pages/MovieForm";
import Movies from "./Pages/Movies";
import NotFound from "./Pages/NotFound";
import Register from "./Pages/Register";
import Rentals from "./Pages/Rentals";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <ToastContainer />
        <Navbar user={user} />
        <div className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            />
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
