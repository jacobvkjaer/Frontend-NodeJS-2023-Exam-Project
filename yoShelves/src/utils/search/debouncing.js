import { apiRequest } from '../fetching/fetching';

export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// export const booksAPIFetch = async title => {
//   return apiRequest({ endpoint: `books/search/title-or-author/${title}` });
// };
