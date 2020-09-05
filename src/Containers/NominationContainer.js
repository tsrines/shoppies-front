import React from 'react';
import PropTypes from 'prop-types';
import { List, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import NominationListItem from '../Components/NominationListItem';

const NominationContainer = ({ nominationMovies }) =>
  nominationMovies ? (
    <>
      <List animated as='h1'>
        <List.Header>Nominations</List.Header>
        <Divider />
        {nominationMovies.length === 0 && (
          <List.Content>
            {' '}
            <i>
              You haven't nominated any movies yet, type in your favorite movie
              to search!
            </i>
          </List.Content>
        )}
        {nominationMovies.map((movie) => (
          <NominationListItem key={movie.id} {...movie} />
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
  nominationMovies: PropTypes.array.isRequired,
};

const mapStateToProps = ({ movie: { nominationMovies } }) => ({
  nominationMovies,
});

export default connect(mapStateToProps)(NominationContainer);
