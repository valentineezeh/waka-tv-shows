import { defineStore } from "pinia";
import { computed, ref, nextTick } from "vue";
import { debounce } from "throttle-debounce";
import {
  fetchFromAPI,
  cacheData,
  getCachedData,
  isCacheExpired,
} from "@/utils";

const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;
const CACHE_KEY_All_SHOWS = "allShows";
const CACHE_KEY = "shows";
const CACHE_KEY_SELECTED_SHOWS = "selectedShow";

const persistedSelectedShow = localStorage.getItem(CACHE_KEY_SELECTED_SHOWS);

export const useShowStore = defineStore("showStore", () => {
  const shows = ref([]);
  const searchedShows = ref([]);
  const searchQuery = ref("");
  const selectedSearchedShow = ref(null);
  const selectedShow = ref(
    persistedSelectedShow ? JSON.parse(persistedSelectedShow) : null,
  );
  const isLoading = ref(false);
  const error = ref(null);
  const selectSearchedShow = ref(null);
  const isSearching = ref(false);
  const searchError = ref(null);

  // Fetch shows from the API or localStorage
  const fetchShows = async (query = "") => {
    try {
      if (query) {
        isSearching.value = true;
        searchError.value = null;

        const cachedData = getCachedData("selectedSearchShow");

        if (
          cachedData &&
          cacheData.data === query &&
          !isCacheExpired(cachedData.timestamp, CACHE_EXPIRATION_TIME)
        ) {
          searchedShows.value = cachedData.data;
        } else {
          const searchResults = await fetchFromAPI(
            `https://api.tvmaze.com/search/shows?q=${query}`,
          );
          const shows = searchResults.map((item) => item.show);
          searchedShows.value = shows;
          cacheData(shows, CACHE_KEY);
        }
      } else {
        isLoading.value = true;
        error.value = null;
        const cachedData = getCachedData(CACHE_KEY_All_SHOWS);

        if (
          !cachedData ||
          isCacheExpired(cachedData.timestamp, CACHE_EXPIRATION_TIME)
        ) {
          const allShows = await fetchFromAPI("https://api.tvmaze.com/shows");
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

  // Set selected show and persist to localStorage
  const setSelectedShow = (show) => {
    selectedShow.value = show;
    localStorage.setItem(CACHE_KEY_SELECTED_SHOWS, JSON.stringify(show));
  };

  // Computed property to group shows by genres
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

  // Computed property to check if there are results
  const hasResults = computed(() =>
    Object.values(filteredAndGroupedShows.value).some(
      (shows) => shows.length > 0,
    ),
  );

  const setSelectSearchedShow = (show) => {
    selectSearchedShow.value = show;
    // Store the selected show's ID or URL in local storage
    cacheData(show, "selectedSearchShow");
  };

  const getSelectedShow = async (id) => {
    try {
       const res = await fetchFromAPI(`https://api.tvmaze.com/search/shows/${id}`)
       selectedSearchedShow.value = res
      cacheData(res, CACHE_KEY_SELECTED_SHOWS);
    } catch(error) {
      console.error(error);
    }
  }

  // Automatically fetch shows when the store is created
  fetchShows("");

  // Return state and methods to the component
  return {
    shows,
    selectedShow,
    isLoading,
    error,
    setSelectedShow,
    hasResults,
    filteredAndGroupedShows,
    fetchShows,
    debouncedFetchShows,
    searchQuery,
    setSearchQuery,
    searchedShows,
    setSelectSearchedShow,
    isSearching,
    getSelectedShow
  };
});
