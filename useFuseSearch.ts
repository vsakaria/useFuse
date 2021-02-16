import Fuse from "fuse.js/dist/fuse.min.js" // Explicit import to support IE11
import { useEffect, useState } from "react"
import { FuseApi, FuseOptions, FuseState } from "./Fuse"

let fuse: any

const useFuseSearch = (collection: Array<any>, options: FuseOptions): [FuseState, FuseApi] => {

  const [searchCriteria, setSearchCriteria] = useState<string>("")
  const [searchResults, setSearchResults] = useState<Array<Fuse.FuseResult<any>> | []>([])

  const setUpFuse = (): void => {
    fuse = new Fuse(collection, options)
  }
  useEffect(setUpFuse, [collection, options]) // Or useMemo need to research

  const performSearch = (): void => {
    if (searchCriteria) {
      setSearchResults(fuse.search(searchCriteria.trim()))
    }
  }
  useEffect(performSearch, [searchCriteria])

  const mapSearchResults = (fuseSearchResult: Array<any>): Array<any> => {
    return options.mapper ? options.mapper(fuseSearchResult) : fuseSearchResult
  }

  const state: FuseState = {
    searchCriteria,
    searchResults: searchCriteria ? mapSearchResults(searchResults) : collection
  }

  const api: FuseApi = {
    setSearchCriteria
  }

  return [state, api]
}

export const defaultOptions: FuseOptions = {
  isCaseSensitive: false,
  minMatchCharLength: 1,
  includeMatches: true,
  findAllMatches: true,
  keys: [],
  threshold: 0.1,
  ignoreLocation: true,
  // includeScore: false,
  // shouldSort: false,
  // location: 1,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreFieldNorm: false,
  mapper: (fuseResults: any[]): any[] => {
    return fuseResults.map((fuseResult: any) => {
      return fuseResult.item
    })
  }
};

export default useFuseSearch