import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useShowStoreReactive } from "@/stores/reactiveShowStore";
import * as utils from '@/utils'
import { vi } from 'vitest';
import { shows } from "@/mock";

const mockShows = shows

describe("Show store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.mock('@/utils')
  });

  it('initializes with correct state', () => {
  const store = useShowStoreReactive()
  expect(store.shows).toEqual([])
  expect(store.searchedShows).toEqual([])
  expect(store.searchQuery).toBe('')
  expect(store.selectedShow).toBeNull()
  expect(store.error).toBeNull()
  // ... check other initial states
  })

  it('fetches show with query', async () => {
    utils.fetchFromAPI.mockResolvedValue(mockShows)
    utils.getCachedData.mockReturnValue(null)

    const store = useShowStoreReactive()
    await store.fetchShows()

    expect(store.shows).toEqual(mockShows)
    expect(store.isLoading).toBe(false)
    expect(utils.cacheData).toHaveBeenCalledWith(mockShows, 'allShows')
   })

  it('fetches shows with query', async () => {
  utils.fetchFromAPI.mockResolvedValue([
    {
      score: 9,
      show: mockShows[0]
    }
  ])
  utils.getCachedData.mockReturnValue(null)

  const store = useShowStoreReactive()
  await store.fetchShows('show1')

  expect(store.searchedShows).toEqual([mockShows[0]])
  expect(store.isSearching).toBe(false)
  })

  it('correctly groups and sorts shows', () => {
    const store = useShowStoreReactive()
    store.shows = mockShows

    const result = store.sortedAndGroupedShows

    expect(result).toHaveProperty('genre1')
    expect(result).toHaveProperty('genre2')
    expect(result.genre1[0].name).toBe('Show 1')
    expect(result.genre2[0].name).toBe('Show 1')
  })

  it('set search query', () => {
    const store = useShowStoreReactive()
    store.setSearchQuery('query')

    expect(store.searchQuery).toBe('query')
  })

  it('set selected show', () => {
    const store = useShowStoreReactive()
    const data = {
      score: 9,
      show: mockShows[0]
    }
    store.setSelectedShow(data)

    expect(store.selectedShow).toEqual(data)
    expect(utils.cacheData).toHaveBeenCalledWith(data, 'selectedShow')
  })

  it('get selected show from the cache if available', async () => {
    const data = {
      score: 9,
      show: mockShows[0]
    }
    const store = useShowStoreReactive();
    const result = await store.getSelectedShow(1)
    expect(result[0]).toEqual(data)
  })

  it('fetches selected show if not in cache', async () => {
    utils.getCachedData.mockReturnValue(null)
    utils.fetchFromAPI.mockResolvedValue(mockShows[1])
    const store = useShowStoreReactive()
    const result = await store.getSelectedShow(1)
    expect(result).toEqual(mockShows[1])
  })

  it('correctly show has results', () => {
    const store = useShowStoreReactive()
    store.shows = mockShows

    const result = store.hasResults

    expect(result).toBe(true)
  })

  it('debounces fetchShows calls', async () => {
    vi.useFakeTimers()
    const store = useShowStoreReactive()
    const fetchShowsSpy = vi.spyOn(store, 'fetchShows')

    store.debouncedFetchShows('test')
    store.debouncedFetchShows('test2')

    expect(fetchShowsSpy).not.toHaveBeenCalled();
    await vi.runAllTimersAsync()

    // expect(fetchShowsSpy).toHaveBeenCalledTimes(1)
    // expect(fetchShowsSpy).toHaveBeenCalledWith('test3')

    vi.useRealTimers()
  })
})