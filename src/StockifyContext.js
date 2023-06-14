import React, { createContext, useState } from 'react';

// Create the context
export const StockifyContext = createContext();

// Create a provider component
export const StockifyProvider = ({ children }) => {
  // Define the state and any necessary functions
  const [searchResults, setSearchResults] = useState([]);

  // Update the search results
  const updateSearchResults = (results) => {
    setSearchResults(results);
  };

  // Define the context value
  const contextValue = {
    searchResults,
    updateSearchResults,
  };

  // Provide the context value to the children components
  return (
    <StockifyContext.Provider value={contextValue}>
      {children}
    </StockifyContext.Provider>
  );
};
