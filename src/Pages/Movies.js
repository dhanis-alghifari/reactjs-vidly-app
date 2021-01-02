import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import ListGroup from "../components/ListGroup";
import MoviesTable from "../components/MoviesTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import _ from "lodash";

export default class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Allmovies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      searchQuery: "",
      selectedGenre: null,
      sortColumn: { path: "title", order: "asc" },
    };
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({
      Allmovies: getMovies(),
      genres,
    });
  }

  handleDelete = (_id) => {
    const { Allmovies } = this.state;
    const film = Allmovies.filter((newListMovie) => newListMovie._id !== _id);
    console.log(film);
    this.setState({
      Allmovies: film,
    });
  };

  handleLike = (movie) => {
    console.log("like clicked", movie);
    const { Allmovies } = this.state;
    const film = [...Allmovies];
    const index = film.indexOf(movie);
    film[index] = { ...film[index] };
    film[index].liked = !film[index].liked;
    this.setState({
      Allmovies: film,
    });
  };

  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      searchQuery: "",
    });
  };

  handleSearch = (query) => {
    this.setState({
      selectedGenre: null,
      currentPage: 1,
      searchQuery: query,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      Allmovies,
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = Allmovies;
    if (searchQuery)
      filtered = Allmovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = Allmovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    const { totalCount, data: movies } = this.getPagedData();

    const dataMovies = totalCount === 0 ? " 0 " : totalCount;

    return (
      <div className="row mt-5">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Add Movie
          </Link>
          <p>Showing {dataMovies} movies in the database.</p>
          <SearchBar value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
