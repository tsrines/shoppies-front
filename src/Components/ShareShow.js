import React, { useEffect } from 'react';
import { List } from 'semantic-ui-react';
import ShareListItem from './ShareListItem';

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

  return (
    <List>
      {shareMovies &&
        shareMovies.map((mov) => <ShareListItem key={mov.id} {...mov} />)}
    </List>
  );
};

export default ShareShow;
