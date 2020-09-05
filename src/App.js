import React, { useEffect, useState, useCallback } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { connect, useDispatch } from 'react-redux';

import './App.css';

import { Grid, Pagination } from 'semantic-ui-react';
import SearchBar from './Containers/SearchBar';
import NominationContainer from './Containers/NominationContainer';
import MovieContainer from './Containers/MovieContainer';
import { OMDB_URL } from './config';
import PropTypes from 'prop-types';
import ShareShow from './Components/ShareShow';
import Alert from './Components/Alert';

import { createShare } from './actions/movie';

import { GET_MOVIES, LOAD_NOMS_FROM_STORAGE } from './actions/types';

import  ShareButtons  from './Components/ShareButtons';

const App = ({ nominationMovies, movies }) => {
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const memoMovies = useCallback(() => {
    const getMovies = async () => {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      fetch(`${OMDB_URL}${query}&page=${page}`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: GET_MOVIES, payload: data.search });
          setTotalPages(Math.ceil(data.totalResults / 10));
        })
        .catch((err) => console.log('OUTPUT: getMovies -> error', err));
    };
    const loadFromStorage = async () => {
      const nominationMovs = Object.values(localStorage).map((mov) =>
        JSON.parse(mov)
      );
      dispatch({ type: LOAD_NOMS_FROM_STORAGE, payload: nominationMovs });
    };
    getMovies();
    loadFromStorage();
  }, [page, query, dispatch]);

  useEffect(() => {
    memoMovies();
  }, [query, page, memoMovies]);

  const onChange = (_, { activePage }) => {
    setPage(activePage);
  };

  return (
    <>
      <SearchBar
        className='search'
        movies={movies}
        setQuery={setQuery}
        query={query}
      />{' '}
      <Alert />
      <Switch>
        <Route exact path='/'>
          <Grid padded columns={2} divided>
            {!!movies && movies.length > 0 && page && totalPages && (
              <Grid.Row>
                <Pagination
                  defaultActivePage={page}
                  onPageChange={onChange}
                  totalPages={totalPages}
                />
              </Grid.Row>
            )}
            <Grid.Column>
              <MovieContainer query={query} movies={movies} />
            </Grid.Column>

            <Grid.Column>
              <NominationContainer />
              {nominationMovies.length === 5 && <ShareButtons />}
            </Grid.Column>
          </Grid>
        </Route>
        <Route exact path='/shares/:id' component={ShareShow} />
      </Switch>
    </>
  );
};

const mapStateToProps = ({ movie: { movies, nominationMovies, shares } }) => ({
  movies,
  nominationMovies,
  shares,
});

App.propTypes = {
  movies: PropTypes.array,
  nominationMovies: PropTypes.array,
  createShare: PropTypes.func.isRequired,
};
const appWithRouter = withRouter(App);
export default connect(mapStateToProps, {
  createShare,
})(appWithRouter);
