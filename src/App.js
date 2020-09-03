import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import SearchBar from './Containers/SearchBar';
import NominationContainer from './Containers/NominationContainer';
import MovieContainer from './Containers/MovieContainer';
import { Grid, Pagination, Button } from 'semantic-ui-react';
import { OMDB_URL, API_URL } from './config';
import { setAlert } from './actions/alert';
import PropTypes from 'prop-types';


import {
  deleteNomination,

  findOrCreateMovie,
} from './database/dbFunctions';
import axios from 'axios';
import { Route, Switch, withRouter } from 'react-router';
import ShareShow from './Components/ShareShow';
import { connect } from 'react-redux';
import Alert from './Components/Alert';
import { createNomination } from './actions/movie';

const App = ({ setAlert, createNomination }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [nominationMovies, setNominationMovies] = useState([]);

  const memoMovies = useCallback(() => {
    const getMovies = async () => {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      fetch(`${OMDB_URL}${query}&page=${page}`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.search);
          setTotalPages(Math.ceil(data.totalResults / 10));
        })
        .catch((err) => console.log('OUTPUT: getMovies -> error', err));
    };
    getMovies();
  }, [page, query]);

  const removeNomination = async (e, imdbID) => {
    const { nominationId } = JSON.parse(localStorage.getItem(imdbID));
    localStorage.removeItem(imdbID);
    const nomMovies = nominationMovies.filter((mov) => mov.imdbID !== imdbID);
    await deleteNomination(nominationId);
    setNominationMovies([...nomMovies]);
  };

  const addNomination = async (e, imdbID) => {
    if (nominationMovies.length === 4)
      setAlert('You have filled up your 5 nominees', 'green');
    const mov = movies.find((movie) => movie.imdbID === imdbID);
    JSON.stringify(mov);
    // const backEndMovie = await findOrCreateMovie(mov);
    // const nomination = await createNomination(backEndMovie);

    // mov.nominationId = nomination.id;
    // mov.id = backEndMovie.id;
    localStorage.setItem(`${mov.imdbID}`, JSON.stringify(mov));
    if (nominationMovies.length < 5)
      setNominationMovies([...nominationMovies, mov]);
  };

  const loadFromStorage = async () => {
    const nominationMovs = Object.values(localStorage).map((mov) =>
      JSON.parse(mov)
    );
    setNominationMovies(nominationMovs);
  };

  useEffect(() => {
    memoMovies();
    loadFromStorage();
  }, [query, page, memoMovies]);

  const onChange = (_, { activePage }) => {
    setPage(activePage);
  };

  const handleShare = async () => {
    const movieArray = [];
    let share;
    nominationMovies.forEach((mov) => {
      movieArray.push(mov.id);
    });
    const body = { csv: movieArray.join(',') };
    try {
      let res = await axios.post(`${API_URL}/shares`, body);
      share = res.data;
    } catch (err) {
      console.log('OUTPUT: handleShare -> err', err);
    }
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
                  activePage={page}
                  onPageChange={onChange}
                  totalPages={totalPages}
                  // ellipsisItem={null}
                />
              </Grid.Row>
            )}
            <Grid.Column>
              <MovieContainer
                query={query}
                nominationMovies={nominationMovies}
                addNomination={addNomination}
                movies={movies}
              />
            </Grid.Column>

            <Grid.Column>
              <NominationContainer
                nominationMovies={nominationMovies}
                removeNomination={removeNomination}
              />
              {nominationMovies.length === 5 && (
                <Grid.Row>
                  <Button onClick={handleShare} primary>
                    Share!
                  </Button>
                </Grid.Row>
              )}
            </Grid.Column>
          </Grid>
        </Route>
        <Route
          exact
          path='/shares/:id'
          render={(routerProps) => (
            <ShareShow
              // getShareMovies={getShareMovies}
              // shareMovies={shareMovies}
              {...routerProps}
            />
          )}
        />
      </Switch>
    </>
  );
};

App.propTypes = {
  setAlert: PropTypes.func.isRequired,
  createNomination: PropTypes.func.isRequired,
};
const appWithRouter = withRouter(App);
export default connect(null, { setAlert, createNomination })(appWithRouter);
