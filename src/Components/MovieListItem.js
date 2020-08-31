import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image, List, Popup } from 'semantic-ui-react';
import NA from '../NA.jpeg';

const MovieListItem = ({
  Poster,
  Year,
  Title,
  imdbID,
  nominationId,
  id,
  addNomination,
  removeNomination,
  nominationMovies,
}) => {
  return Poster !== 'N/A' ? (
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
          <Image avatar src={Poster === 'N/A' ? NA : Poster} />
          <List.Content>
            {Title} ({Year})
          </List.Content>
        </List.Item>
      }
    >
      <Popup.Content>
        <Image
          alt='Movie Poster'
          size='small'
          src={Poster === 'N/A' ? NA : Poster}
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
        {Title} ({Year})
      </List.Content>
    </List.Item>
  );
};

MovieListItem.propTypes = {
  Poster: PropTypes.string.isRequired,
  Year: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  imdbID: PropTypes.string.isRequired,
};

export default MovieListItem;
