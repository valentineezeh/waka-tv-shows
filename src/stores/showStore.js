import { defineStore } from "pinia";
import { computed, ref } from "vue";
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

export const useShowStore = defineStore("showStore", () => {
  // refactor note instead of using ref I should use reactive.
  const shows = ref([]);
  const searchedShows = ref([]);
  const searchQuery = ref("");
  const selectedShow = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const selectSearchedShow = ref(null);
  const isSearching = ref(false);
  const searchError = ref(null);
  const isFetchingShowDetails = ref(false);
  const showDetailsError = ref(null);

  const fetchShows = async (query = "") => {
    try {
      if (query.trim().length !== 0) {
        isSearching.value = true;
        searchError.value = null;

        const queryInput = query.trim()
        const cachedData = getCachedData(CACHE_KEY_SELECTED_SEARCH_SHOW);
        const checkIfQueryExist = cachedData && cachedData.data.some(obj => obj.name.toLowerCase() === queryInput);


        if (
          cachedData &&
          checkIfQueryExist &&
          !isCacheExpired(cachedData.timestamp, CACHE_EXPIRATION_TIME)
        ) {
          searchedShows.value = cachedData.data;
        } else {
          const searchResults = await fetchFromAPI(
            `${apiUrl}/search/shows?q=${queryInput}`,
          );
          const shows = searchResults.map((item) => item.show);
          searchedShows.value = shows;
          cacheData(shows, CACHE_KEY_SELECTED_SEARCH_SHOW);
        }
      } else {
        isLoading.value = true;
        error.value = null;
        const cachedData = getCachedData(CACHE_KEY_All_SHOWS);

        if (
          !cachedData ||
          isCacheExpired(cachedData.timestamp, CACHE_EXPIRATION_TIME)
        ) {
          const allShows = await fetchFromAPI(`${apiUrl}/shows`);
          shows.value = allShows;
          cacheData(allShows, CACHE_KEY_All_SHOWS);
        } else {
          shows.value = cachedData.data;
        }
      }
    } catch (error) {
      error.value = error.message || "Error fetching shows";
      searchError.value = error.message;
    } finally {
      isLoading.value = false;
      isSearching.value = false;
    }
  };

  const debouncedFetchShows = debounce(700, fetchShows);

  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  const setSelectedShow = (show) => {
    selectedShow.value = show;
    cacheData(show, CACHE_KEY_SELECTED_SHOWS);
  };

  const filteredAndGroupedShows = computed(() => {
    return shows.value.reduce((grouped, show) => {
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
      (shows) => shows.length > 0,
    ),
  );

  const setSelectSearchedShow = (show) => {
    selectSearchedShow.value = show;
    cacheData(show, CACHE_KEY_SELECTED_SEARCH_SHOW);
  };

  const getSelectedShow = async (id) => {
    try {
      isFetchingShowDetails.value = true;
      const checkCachedData = persistedSelectedShow ? persistedSelectedShow.data.id : 0
      if(checkCachedData === Number(id)){
        return persistedSelectedShow.data
      } else {
        const res = await fetchFromAPI(
          `${apiUrl}/shows/${id}`,
        );

      setSelectedShow(res)
      return res;
      }
    } catch (error) {
      showDetailsError.value = error.message || "Error fetching show details.";
    } finally {
      isFetchingShowDetails.value = false;
    }
  };

  fetchShows("");

  return {
    shows,
    selectedShow,
    isLoading,
    error,
    setSelectedShow,
    hasResults,
    debouncedFetchShows,
    searchQuery,
    setSearchQuery,
    searchedShows,
    setSelectSearchedShow,
    isSearching,
    getSelectedShow,
    isFetchingShowDetails,
    showDetailsError,
    sortedAndGroupedShows,
  };
});
