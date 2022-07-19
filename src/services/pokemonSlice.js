import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPokemonByName = createAsyncThunk(
  'pokemon/fetchByName',
  async (name, { rejectWithValue }) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = await response.json()
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data)
    }
    return data
  }
);

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    dataByName: {},
    statusByName: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    // When our request is pending:
    // - store the 'pending' state as the status for the corresponding pokemon name
    builder.addCase(fetchPokemonByName.pending, (state, action) => {
      state.statusByName[action.meta.arg] = 'pending'
    })
    // When our request is fulfilled:
    // - store the 'fulfilled' state as the status for the corresponding pokemon name
    // - and store the received payload as the data for the corresponding pokemon name
    builder.addCase(fetchPokemonByName.fulfilled, (state, action) => {
      state.statusByName[action.meta.arg] = 'fulfilled'
      state.dataByName[action.meta.arg] = action.payload
    })
    // When our request is rejected:
    // - store the 'rejected' state as the status for the corresponding pokemon name
    builder.addCase(fetchPokemonByName.rejected, (state, action) => {
      state.statusByName[action.meta.arg] = 'rejected'
    })
  },
})

export const selectStatusByName = (state, name) =>
  state.pokemon.statusByName[name]
export const selectDataByName = (state, name) =>
  state.pokemon.dataByName[name]