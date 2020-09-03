import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Placeholder } from 'semantic-ui-react';
import ShareListItem from './ShareListItem';
import { getShareMovies } from '../actions/movie';

const ShareShow = ({
  getShareMovies,
  match: {
    params: { id },
  },
  shareMovies,
  loading,
}) => {
  useEffect(() => {
    getShareMovies(id);
  }, [getShareMovies, id]);

  return loading ? (
    <Placeholder />
  ) : (
    <List>
      {shareMovies &&
        shareMovies.map((mov) => <ShareListItem key={mov.id} {...mov} />)}
    </List>
  );
};

ShareShow.propTypes = {
  getShareMovies: PropTypes.func.isRequired,
  shareMovies: PropTypes.array.isRequired,
  id: PropTypes.string,
};

const mapStateToProps = ({ movie: { shareMovies, loading } }) => ({
  loading,
  shareMovies,
});

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps, { getShareMovies })(ShareShow);
