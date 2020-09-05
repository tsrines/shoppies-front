import React from 'react';
import MovieListItem from '../Components/MovieListItem';
import { List, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNomination } from '../actions/movie';


const MovieContainer = ({ movies }) =>
  movies ? (
    <>
      <List animated as='h1'>
        <List.Header>Movies</List.Header>
        <Divider />
        {movies.map((movie) => (
          <MovieListItem key={movie.imdbID} addNomination={addNomination} {...movie} />
        ))}
      </List>
    </>
  ) : (
    <>
      <i>Search and nominate your favorite movies!</i>
    </>
  );



MovieContainer.propTypes = {
  movies: PropTypes.array.isRequired,
  addNomination: PropTypes.func.isRequired,
}

const mapStateToProps = ({movie:{movies}}) => ({
  movies
})



export default connect(mapStateToProps, {addNomination})(MovieContainer)

