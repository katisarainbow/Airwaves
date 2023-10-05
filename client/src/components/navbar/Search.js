import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const searchPost = () => {
    if (search) {
      const searchCleaned = search.split(/\s+/).join(',');
      navigate(`/search?searchQuery=${searchCleaned}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <InputGroup size="sm">
      <InputLeftElement color="text" pointerEvents="none" align="center">
        <Icon as={AiOutlineSearch} boxSize={3} />
      </InputLeftElement>
      <Input
        variant="primary"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </InputGroup>
  );
};

export default Search;
