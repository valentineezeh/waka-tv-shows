import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useShowStore } from "@/stores/showStore";
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
  const store = useShowStore()
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

    const store = useShowStore()
    await store.fetchShows()

    expect(store.shows).toEqual(mockShows)
    expect(store.isLoading).toBe(false)
    expect(utils.cacheData).toHaveBeenCalledWith(mockShows, 'allShows')
   })

   it('fetches shows with query', async () => {
    utils.fetchFromAPI.mockResolvedValue([mockShows[0]])
    utils.getCachedData.mockReturnValue(null)

    const store = useShowStore()
    await store.fetchShows('show1')

    expect(store.searchedShows).toEqual([mockShows[0]])
    expect(store.isSearching).toBe(false)
    // expect(utils.cacheData[0]).toHaveBeenCalledWith([mockShows[0]], 'selectedSearchShow')
   })

  //  it('handles errors when fetching shows', async() => {
  //   utils.fetchFromAPI.mockRejectedValue(new Error('error'))

  //   const store = useShowStore()
  //   await store.fetchShows()

  //   expect(store.error).toBe('error')
  //   expect(store.isLoading).toBe(false)
  //  })

  it('correctly groups and sorts shows', () => {
    const store = useShowStore()
    store.shows = mockShows

    const result = store.sortedAndGroupedShows

    expect(result).toHaveProperty('genre1')
    expect(result).toHaveProperty('genre2')
    expect(result.genre1[0].name).toBe('Show 1')
    expect(result.genre2[0].name).toBe('Show 1')
  })

  it('set search query', () => {
    const store = useShowStore()
    store.setSearchQuery('query')

    expect(store.searchQuery).toBe('query')
  })

  it('set selected show', () => {
    const store = useShowStore()
    store.setSelectedShow(mockShows[0])

    expect(store.selectedShow).toEqual(mockShows[0])
    expect(utils.cacheData).toHaveBeenCalledWith(mockShows[0], 'selectedShow')
  })

  it('get selected show from the cache if available', async () => {
    const store = useShowStore();
    const result = await store.getSelectedShow(1)
    expect(result[0]).toEqual(mockShows[0])
  })

  it('fetches selected show if not in cache', async () => {
    utils.getCachedData.mockReturnValue(null)
    utils.fetchFromAPI.mockResolvedValue(mockShows[1])
    const store = useShowStore()
    const result = await store.getSelectedShow(1)
    expect(result).toEqual(mockShows[1])
  })

  it('correctly show has results', () => {
    const store = useShowStore()
    store.shows = mockShows

    const result = store.hasResults

    expect(result).toBe(true)
  })

});
