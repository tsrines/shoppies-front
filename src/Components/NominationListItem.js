import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image, List, Popup } from 'semantic-ui-react';
import NA from '../NA.jpeg';
import { connect } from 'react-redux';
import { removeNomination } from '../actions/movie';

const NominationListItem = ({
  poster,
  year,
  title,
  imdbID,
  removeNomination,
  id,
  nominationMovies,
}) => {
  // debugger;
  // const nominationId = Object.entries(localStorage).find(mov = mov.)
  const getNominationId = () => {
    for (const eyeDee of Object.keys(localStorage)) {
      // debugger;
      if (JSON.parse(localStorage[eyeDee]).id === id) {
        return parseInt(eyeDee);
      }
    }
  };
  return poster !== 'N/A' ? (
    <Popup
      trigger={
        <List.Item>
          <List.Content floated='right'>
            <Button
              color='red'
              onClick={(e) => removeNomination(e, getNominationId())}
            >
              Remove
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
          color='red'
          onClick={(e) => removeNomination(e, getNominationId())}
        >
          Remove
        </Button>
      </List.Content>
      <List.Content>
        {title} ({year})
      </List.Content>
    </List.Item>
  );
};

NominationListItem.propTypes = {
  poster: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imdbID: PropTypes.string.isRequired,
};

const mapStateToProps = ({ movie: { nominationMovies } }) => ({
  nominationMovies,
});

export default connect(mapStateToProps, { removeNomination })(
  NominationListItem
);
