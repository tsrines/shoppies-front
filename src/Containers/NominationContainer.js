import React from 'react';
import PropTypes from 'prop-types';
import MovieList from '../Components/MovieListItem';
import { List, Divider } from 'semantic-ui-react';

const NominationContainer = ({ nominationMovies, removeNomination }) =>
  nominationMovies ? (
    <>
      <List animated as='h1'>
        <List.Header>Nominations</List.Header>
        <Divider />
        {nominationMovies.map((movie) => (
          <MovieList
            key={movie.imdbID}
            removeNomination={removeNomination}
            {...movie}
          />
        ))}
      </List>
    </>
  ) : (
    <h1>
      You haven't nominated any movie yet, type in your favorite movie to
      search!
    </h1>
  );

NominationContainer.propTypes = {
  removeNomination: PropTypes.func.isRequired,
  nominationMovies: PropTypes.array.isRequired,
};

export default NominationContainer;
