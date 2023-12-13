import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = event => {
    event.preventDefault();
    // Chame a função de pesquisa passada como prop
    onSearch(searchTerm);
  };

  return (
    <AppBar
      position="static"
      style={{ borderRadius: '4px', marginBottom: '100px', background: '#6E1324' }}
    >
      <Toolbar>
        {/* ... outros elementos ... */}
        <div
          style={{
            position: 'relative',
            borderRadius: '4px',
            background: 'rgba(255, 255, 255, 0.15)',
            width: '100%'
          }}
        >
          <form onSubmit={handleSearchSubmit}>
            <InputBase
              placeholder="Pesquisar..."
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              startAdornment={<SearchIcon sx={{ color: 'inherit', ml: 1 }} />}
            />
          </form>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default SearchBar;
