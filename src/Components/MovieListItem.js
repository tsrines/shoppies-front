import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image, List, Popup } from 'semantic-ui-react';
import NA from '../NA.jpeg';

const MovieListItem = ({
  poster,
  year,
  title,
  imdbID,
  nominationId,
  id,
  addNomination,
  removeNomination,
  nominationMovies,
}) => {
  return poster !== 'N/A' ? (
    <Popup
      trigger={
        <List.Item>
          <List.Content floated='right'>
            {addNomination ? (
              <Button
                disabled={
                  nominationMovies.filter((mov) => mov.imdbID === imdbID)
                    .length === 1 || nominationMovies.length >= 5
                }
                color='green'
                onClick={(e) => addNomination(e, imdbID)}
              >
                Nominate
              </Button>
            ) : (
              <Button color='red' onClick={(e) => removeNomination(e, imdbID)}>
                Remove
              </Button>
            )}
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
        {addNomination ? (
          <Button
            disabled={
              nominationMovies.filter((mov) => mov.imdbID === imdbID).length ===
                1 || nominationMovies.length >= 5
            }
            color='green'
            onClick={(e) => addNomination(e, imdbID)}
          >
            Nominate
          </Button>
        ) : (
          <Button color='red' onClick={(e) => removeNomination(e, imdbID)}>
            Remove
          </Button>
        )}
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

export default MovieListItem;
