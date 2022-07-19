import React from 'react';

import { useGetPokemonByNameQuery } from './hooks'

function App() {
  const { data, isError, isLoading } = useGetPokemonByNameQuery('bulbasaur')

  return (
    <div className="App">
      {isError ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  );
}

export default App;
