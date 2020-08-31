import React from 'react';
import PropTypes from 'prop-types';
import { Input, Header } from 'semantic-ui-react';

const SearchBar = ({ query, setQuery }) => {
  const handleQuery = (e) => {
    setQuery(e.target.value);
    // setQuery(e.target.value)
  };

  return (
    <>
      <Header as='h1' block>
        The Shoppies
      </Header>
      <Input
        fluid
        className='search'
        icon='search'
        placeholder='Thor, Harry Potter, etc...'
        type='text'
        value={query}
        name='search'
        onChange={handleQuery}
      />
    </>
  );
};

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default SearchBar;
