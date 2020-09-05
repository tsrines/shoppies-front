import React from 'react';
import { List, Image } from 'semantic-ui-react';
import NA from '../NA.jpeg';

const ShareListItem = ({ title, year, poster}) => {
  return (
    <List.Item >
      <List.Content>
        <Image floated='left' size='tiny' src={poster === 'N/A' ? NA : poster} />
      </List.Content>
      <List.Content>
        {title} ({year})
      </List.Content>
    </List.Item>
  );
};

export default ShareListItem;
