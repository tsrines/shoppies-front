import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Segment, Grid, Button} from 'semantic-ui-react';

import {
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
} from 'react-share';
import { FRONT_END_URL } from '../config';
import { createShare } from '../actions/movie';

const ShareButtons = ({ nominationMovies, createShare }) => {
  const [url, setUrl] = useState('');

  const handleShare = async (e) => {
    const { id } = await createShare(nominationMovies);
    setUrl(`/shares/${id}`);
    // history.push(`/shares/${id}`);
  };

  return (
    <Grid.Row>
      {url !== '' && nominationMovies && nominationMovies.length === 5 ? (
        <Segment >
          <FacebookShareButton
            onClick={() => setUrl('')}
            url={`${FRONT_END_URL}${url}`}
          >
            <FacebookIcon round size={40}></FacebookIcon>
          </FacebookShareButton>
          <TwitterShareButton
            onClick={() => setUrl('')}
            url={`${FRONT_END_URL}${url}`}
          >
            <TwitterIcon round size={40}></TwitterIcon>
          </TwitterShareButton>
          <RedditShareButton
            onClick={() => setUrl('')}
            url={`${FRONT_END_URL}${url}`}
          >
            <RedditIcon round size={40}></RedditIcon>
          </RedditShareButton>
          <LinkedinShareButton
            onClick={() => setUrl('')}
            url={`${FRONT_END_URL}${url}`}
          >
            <LinkedinIcon round size={40}></LinkedinIcon>
          </LinkedinShareButton>
          <Button
            floated='right'
            secondary
            icon='undo'
            onClick={() => setUrl('')}
          />
        </Segment>
      ) : (
        <Button onClick={handleShare} primary>
          Share!
        </Button>
      )}
    </Grid.Row>
  );
};

const mapStateToProps = ({ movie: { nominationMovies } }) => ({
  nominationMovies,
});

export default connect(mapStateToProps, { createShare })(ShareButtons);
