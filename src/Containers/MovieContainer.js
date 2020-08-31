import React from 'react';
import MovieListItem from '../Components/MovieListItem';
import { List, Divider } from 'semantic-ui-react';

const MovieContainer = ({ movies, nominationMovies, addNomination }) =>
  movies ? (
    <>
      <List animated as='h1'>
        <List.Header>Movies</List.Header>
        <Divider />
        {movies.map((movie) => (
          <MovieListItem
            key={movie.imdbID}
            addNomination={addNomination}
            nominationMovies={nominationMovies}
            {...movie}
          />
        ))}
      </List>
    </>
  ) : (
    <>
      <h4>Search and nominate your favorite movies!</h4>
    </>
  );

export default MovieContainer;
