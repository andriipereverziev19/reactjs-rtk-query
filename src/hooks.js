import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchPokemonByName,
  selectStatusByName,
  selectDataByName,
} from './services/pokemonSlice'

export function useGetPokemonByNameQuery(name) {
  const dispatch = useDispatch()
  // select the current status from the store state for the provided name
  const status = useSelector((state) => selectStatusByName(state, name))
  // select the current data from the store state for the provided name
  const data = useSelector((state) => selectDataByName(state, name))
  useEffect(() => {
    // upon mount or name change, if status is uninitialized, send a request
    // for the pokemon name
    if (status === undefined) {
      dispatch(fetchPokemonByName(name))
    }
  }, [status, name, dispatch])

  // derive status booleans for ease of use
  const isUninitialized = status === undefined
  const isLoading = status === 'pending' || status === undefined
  const isError = status === 'rejected'
  const isSuccess = status === 'fulfilled'

  // return the import data for the caller of the hook to use
  return { data, isUninitialized, isLoading, isError, isSuccess }
}