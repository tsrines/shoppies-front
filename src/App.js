import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import SearchBar from './Containers/SearchBar';
import NominationContainer from './Containers/NominationContainer';
import MovieContainer from './Containers/MovieContainer';
import { Message, Grid, Pagination, Button } from 'semantic-ui-react';
import { OMDB_URL, API_URL } from './config';

import {
  deleteNomination,
  createNomination,
  findOrCreateMovie,
} from './database/dbFunctions';
import axios from 'axios';
import { withRouter, Route, Switch } from 'react-router';
import ShareShow from './Components/ShareShow';

const App = ({ history }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [visible, setVisible] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [nominationMovies, setNominationMovies] = useState([]);
  const [shareMovies, setShareMovies] = useState([]);

  const memoMovies = useCallback(() => {
    const getMovies = async () => {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      fetch(`${OMDB_URL}${query}&page=${page}`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.Search);
          setTotalPages(Math.ceil(data.totalResults / 10));
        })
        .catch((err) => console.log('OUTPUT: getMovies -> error', err));
    };
    getMovies();
  }, [page, query]);

  const getShareMovies = async (id) => {
    let movies;
    try {
      let res = await axios.get(`${API_URL}/shares/${id}`);
      movies = res.data;
      setShareMovies(movies);
    } catch (err) {
      console.log('OUTPUT: getShare -> err', err);
    }
    return movies;
  };

  const removeNomination = async (e, imdbID) => {
    const { nominationId } = JSON.parse(localStorage.getItem(imdbID));
    localStorage.removeItem(imdbID);
    const nomMovies = nominationMovies.filter((mov) => mov.imdbID !== imdbID);
    await deleteNomination(nominationId);
    setNominationMovies([...nomMovies]);
    setVisible(true);
  };

  const addNomination = async (e, imdbID) => {
    const mov = movies.find((movie) => movie.imdbID === imdbID);
    JSON.stringify(mov);

    const backEndMovie = await findOrCreateMovie(mov);

    const nomination = await createNomination(backEndMovie);
    mov.nominationId = nomination.id;
    mov.id = backEndMovie.id;
    localStorage.setItem(`${mov.imdbID}`, JSON.stringify(mov));

    if (nominationMovies.length < 5) {
      if (nominationMovies.includes(mov)) {
        alert('You cannot nominate a movie more than once!');
      } else {
        setNominationMovies([...nominationMovies, mov]);
      }
    } else {
      alert('You can only nominate 5 movies');
    }
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

  const handleDismiss = () => {
    setVisible(false);
  };

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
    history.push(`/shares/${share.id}`);
  };

  return (
    <>
      <Switch>
        <Route exact path='/'>
          <SearchBar
            className='search'
            movies={movies}
            setQuery={setQuery}
            query={query}
          />{' '}
          {nominationMovies.length >= 5 && visible && (
            <Message success onDismiss={handleDismiss}>
              You have filled up your 5 nominees
            </Message>
          )}
          <Grid padded columns={2} divided>
            <Grid.Row>
              {!!movies && movies.length > 0 && page && totalPages && (
                <Pagination
                  activePage={page}
                  onPageChange={onChange}
                  totalPages={totalPages}
                  // ellipsisItem={null}
                />
              )}
            </Grid.Row>
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
              getShareMovies={getShareMovies}
              shareMovies={shareMovies}
              {...routerProps}
            />
          )}
        />
      </Switch>
    </>
  );
};

export default withRouter(App);
