import {renderHook, act, HookResult} from "@testing-library/react-hooks"
import  useFuseSearch, { defaultOptions } from "./useFuseSearch"
import { FuseApi, FuseOptions, FuseState } from "./Fuse"

const searchData = [{someKey: "someValue", someOtherKey: "someOtherValue"}, {someKey: "someSecondValue", someOtherKey: "someOtherSecondValue"}]
const options: FuseOptions = {keys: ["someKey"], minMatchCharLength: 2, threshold: 0.1}

describe("useFuseHook", () => {

  const getResults = (result: HookResult<[FuseState, FuseApi]>): FuseState => {
    return result.current[0]
  }

  test("WHEN hook is initislised THEN it returns original data", () => {
    const { result } = renderHook(() => useFuseSearch(searchData, options))
    expect(getResults(result).searchResults).toEqual(searchData)
  })

  test("WHEN search criteria is set THEN it returns some search results", () => {
    const { result } = renderHook(() => useFuseSearch(searchData, options))
    const [, api] = result.current

    act(() => {
      api.setSearchCriteria("someValue")
    })

    expect(getResults(result).searchResults).toEqual([{item: searchData[0] , refIndex: 0}])
  })

  test("WHEN search criteria is set and cleared THEN it returns the original data", () => {
    const { result } = renderHook(() => useFuseSearch(searchData, options))
    const [, api] = result.current

    act(() => {
      api.setSearchCriteria("someValue")
    })

    expect(getResults(result).searchResults).toEqual([{item: searchData[0] , refIndex: 0}])

    act(() => {
      api.setSearchCriteria("")
    })

    expect(getResults(result).searchResults).toEqual(searchData)
  })

  test("WHEN a mapper is a passed THEN it returns the search result in the mapper form", () => {
    options.mapper = (searchResults: any) => {
      return searchResults.map((searchResult: {item: any}) => searchResult.item)
    }

    const { result } = renderHook(() => useFuseSearch(searchData, options))
    const [, api] = result.current

    act(() => {
      api.setSearchCriteria("someValue")
    })

    expect(getResults(result).searchResults).toEqual([{someKey: "someValue", someOtherKey: "someOtherValue"}])
  })
})

describe("Default options mapper", () => {
  test("WHEN a fuse result is passed it returns the original data structure", () => {
    const originalData = searchData
    const fuseResult = [
      {
        item: { someKey: "someValue", someOtherKey: "someOtherValue" },
        someOtherFuseData: "test",
      },
      {
        item: { someKey: "someSecondValue", someOtherKey: "someOtherSecondValue" },
        someOtherFuseData: "test",
      },
    ];


    const result = defaultOptions.mapper(fuseResult)
    expect(result).toEqual(originalData)
  })
})
