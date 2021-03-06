import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image, List, Popup } from 'semantic-ui-react';
import NA from '../NA.jpeg';
import { connect } from 'react-redux';
import { addNomination } from '../actions/movie';
import { setAlert } from '../actions/alert';

const MovieListItem = ({
  poster,
  year,
  title,
  imdbID,
  addNomination,
  id,
  setAlert,
  nominationMovies,
}) => {
  const handleClick = async (e) => {
    nominationMovies.length === 4 &&
      setAlert('You have filled up your 5 nominations, share them!', 'green');
    addNomination(id);
  };

  return poster !== 'N/A' ? (
    <Popup
      trigger={
        <List.Item>
          <List.Content floated='right'>
            <Button
              disabled={
                nominationMovies.filter((mov) => mov.imdbID === imdbID)
                  .length === 1 || nominationMovies.length >= 5
              }
              color='green'
              onClick={handleClick}
            >
              Nominate
            </Button>
          </List.Content>
          <Image avatar src={poster === 'N/A' ? NA : poster} />
          <List.Content>
            {title} ({year})
          </List.Content>
        </List.Item>
      }
    >
      <Popup.Content>
        <Image
          alt='Movie poster'
          size='small'
          src={poster === 'N/A' ? NA : poster}
        />
      </Popup.Content>
    </Popup>
  ) : (
    <List.Item>
      <List.Content floated='right'>
        <Button
          disabled={
            nominationMovies.filter((mov) => mov.imdbID === imdbID).length ===
              1 || nominationMovies.length >= 5
          }
          color='green'
          onClick={handleClick}
        >
          Nominate
        </Button>
      </List.Content>
      <List.Content>
        {title} ({year})
      </List.Content>
    </List.Item>
  );
};

MovieListItem.propTypes = {
  poster: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imdbID: PropTypes.string.isRequired,
};

const mapStateToProps = ({ movie: { nominationMovies } }) => ({
  nominationMovies,
});

export default connect(mapStateToProps, { addNomination, setAlert })(
  MovieListItem
);
