const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '925491183043d455ae6efbd6833f46c6';

class MoviesApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalResults = null;
    this.currentRequest = null;
  }

  async fetchTrendingMovies() {
    this.currentRequest = 'trending';
    const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${this.page}&language=ru`;

    try {
      const response = await fetch(url);
      const movies = await response.json();
      this.totalResults = movies.total_results;
      this.currentRequest = 'trending';
      return movies;
    } catch (error) {
      console.log(error);
    }
  }

  //---genres---
  async fetchGenres() {
    // const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ru`;
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ru`;

    try {
      const response = await fetch(url);
      const genres = response.json();
      return genres;
    } catch (error) {
      console.log(error);
    }
  }
  //------------

  async fetchMoviesByQuery(query) {
    this.currentRequest = 'search';
    this.searchQuery = query;
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ru&page=${this.page}&include_adult=false&query=${this.searchQuery}`;

    try {
      const response = await fetch(url);
      const movies = await response.json();
      this.totalResults = movies.total_results;
      this.currentRequest = 'search';
      return movies;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchMovieById(id) {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ru&external_source=imdb_id`;

    try {
      const response = await fetch(url);
      const movie = response.json();
      return movie;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchMovieCast(id) {
    const url = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=ru`;

    try {
      const response = await fetch(url);
      const info = await response.json();
      const cast = info.cast;
      return cast;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchMovieReviews(id) {
    const url = `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en`;

    try {
      const response = await fetch(url);
      const info = await response.json();
      const reviews = info.results;
      return reviews;
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

const moviesApi = new MoviesApi();

export default moviesApi;
