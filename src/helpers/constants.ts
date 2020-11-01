export const noResultsText = 'No results found...';
export const noResultsItemText = 'No such item found...';
export const minSearchTermLength = 2;
export const searchTimeout = 1000;
export const tabs = {
  movie: {
    key: 'movie',
    label: 'Movies',
  },
  tv: {
    key: 'tv',
    label: 'TV Shows',
  },
};
export const baseImageURL500 = 'https://image.tmdb.org/t/p/w500';
export const baseImageURL342 = 'https://image.tmdb.org/t/p/w342';
export const isSearchable = (searchTerm: string): boolean =>
  searchTerm.length > minSearchTermLength;
export const mainTitle = 'Top 10 TV Shows/Movies';