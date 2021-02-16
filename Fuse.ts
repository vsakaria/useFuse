export interface FuseOptions {
  keys: string[],
  minMatchCharLength: number,
  threshold: number,
  isCaseSensitive?: boolean,
  includeScore?: boolean,
  shouldSort?: boolean,
  includeMatches?: boolean,
  findAllMatches?: boolean,
  location?: number,
  distance?: number,
  useExtendedSearch?: boolean,
  ignoreLocation?: boolean,
  ignoreFieldNorm?: boolean,
  mapper?: (searchResults: any[]) => any[]
}

export interface FuseState {
  searchCriteria: string,
  searchResults: Array<any>
}

export interface FuseApi {
  setSearchCriteria: (searchCriteria: string) => void
}
