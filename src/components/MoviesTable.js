import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import LikeButton from "./LikeButton";
import Table from "./Table";

export default class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
    },
    {
      path: "genre.name",
      label: "Genre",
    },
    {
      path: "numberInStock",
      label: "Stock",
    },
    {
      path: "dailyRentalRate",
      label: "Rate",
    },
    {
      label: "Like",
      key: "like",
      content: (movie) => (
        <LikeButton
          liked={movie.liked}
          onClick={() => this.props.onLike(movie)}
        />
      ),
    },
    {
      label: "Action",
      key: "action",
      content: (movie) => (
        <>
          <button
            onClick={() => this.props.onDelete(movie._id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>

          <NavLink to={`/movies/${movie._id}`}>
            <button className="btn btn-icon btn-sm btn-warning ml-2">
              Edit
            </button>
          </NavLink>
        </>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}
