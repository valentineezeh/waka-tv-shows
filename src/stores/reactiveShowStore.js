import { defineStore } from "pinia";
import { computed, reactive, toRefs } from "vue";
import { debounce } from "throttle-debounce";
import {
  fetchFromAPI,
  cacheData,
  getCachedData,
  isCacheExpired,
} from "@/utils";

const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;
const CACHE_KEY_All_SHOWS = "allShows";
const CACHE_KEY_SELECTED_SHOWS = "selectedShow";
const CACHE_KEY_SELECTED_SEARCH_SHOW = "selectedSearchShow";
const apiUrl = "https://api.tvmaze.com";

const persistedSelectedShow = getCachedData(CACHE_KEY_SELECTED_SHOWS);

export const useShowStoreReactive = defineStore("showStore", () => {
  const state = reactive({
    shows: [],
    searchedShows: [],
    searchQuery: "",
    selectedShow: null,
    isLoading: false,
    error: null,
    selectSearchedShow: null,
    isSearching: false,
    searchError: null,
    showDetailsError: null,
  });

  const fetchShows = async (query = "") => {
    try {
      if (query.trim().length !== 0) {
        state.isSearching = true;
        state.searchError = null;

        const queryInput = query.trim();
        const cachedData = getCachedData(CACHE_KEY_SELECTED_SEARCH_SHOW);
        const checkIfQueryExist =
          cachedData &&
          cachedData.data.some((obj) => obj.name.toLowerCase() === queryInput);

        if (
          cachedData &&
          checkIfQueryExist &&
          !isCacheExpired(cachedData.timestamp, CACHE_EXPIRATION_TIME)
        ) {
          state.searchedShows = cachedData.data;
        } else {
          const searchResults = await fetchFromAPI(
            `${apiUrl}/search/shows?q=${queryInput}`
          );
          const shows = searchResults.map((item) => item.show);
          state.searchedShows = shows;
          cacheData(shows, CACHE_KEY_SELECTED_SEARCH_SHOW);
        }
      } else {
        state.isLoading = true;
        state.error = null;
        const cachedData = getCachedData(CACHE_KEY_All_SHOWS);

        if (
          !cachedData ||
          isCacheExpired(cachedData.timestamp, CACHE_EXPIRATION_TIME)
        ) {
          const allShows = await fetchFromAPI(`${apiUrl}/shows`);
          state.shows = allShows;
          cacheData(allShows, CACHE_KEY_All_SHOWS);
        } else {
          state.shows = cachedData.data;
        }
      }
    } catch (error) {
      state.error = error.message || "Error fetching shows";
      state.searchError = error.message;
    } finally {
      state.isLoading = false;
      state.isSearching = false;
    }
  };

  const debouncedFetchShows = debounce(700, fetchShows);

  const setSearchQuery = (query) => {
    state.searchQuery = query;
  };

  const setSelectedShow = (show) => {
    state.selectedShow = show;
    cacheData(show, CACHE_KEY_SELECTED_SHOWS);
  };

  const filteredAndGroupedShows = computed(() => {
    return state.shows.reduce((grouped, show) => {
      show.genres.forEach((genre) => {
        if (!grouped[genre]) {
          grouped[genre] = [];
        }
        grouped[genre].push(show);
      });
      return grouped;
    }, {});
  });

  const sortedAndGroupedShows = computed(() => {
    const groupedShows = filteredAndGroupedShows.value;

    for (const genre in groupedShows) {
      groupedShows[genre].sort((a, b) => {
        const ratingA = a.rating ? a.rating.average : 0;
        const ratingB = b.rating ? b.rating.average : 0;
        return ratingB - ratingA;
      });
    }

    return groupedShows;
  });

  const hasResults = computed(() =>
    Object.values(sortedAndGroupedShows.value).some(
      (shows) => shows.length > 0
    )
  );

  const setSelectSearchedShow = (show) => {
    state.selectSearchedShow = show;
    cacheData(show, CACHE_KEY_SELECTED_SEARCH_SHOW);
  };

  const getSelectedShow = async (id) => {
    try {
      const checkCachedData =
        persistedSelectedShow?.data?.id === Number(id)
          ? persistedSelectedShow.data
          : null;
      if (checkCachedData) {
        return checkCachedData;
      } else {
        state.isLoading = true
        const res = await fetchFromAPI(`${apiUrl}/shows/${id}`);
        setSelectedShow(res);
        return res;
      }
    } catch (error) {
      state.showDetailsError =
        error.message || "Error fetching show details.";
    } finally{
      state.isLoading = false
    }
  };

  fetchShows("");

  return {
    ...toRefs(state),
    debouncedFetchShows,
    setSearchQuery,
    setSelectedShow,
    hasResults,
    setSelectSearchedShow,
    getSelectedShow,
    sortedAndGroupedShows,
  };
});
