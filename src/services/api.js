import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  reducerPath: 'pokemonApi',
  endpoints: (build) => ({
    getPokemonByName: build.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

export const { useGetPokemonByNameQuery } = api