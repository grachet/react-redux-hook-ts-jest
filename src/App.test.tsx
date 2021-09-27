import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import { getBackdropFullURL, locationToMovieType } from './functions/helperFunctions';
import { IMAGE_URL_TMDB, URL_PLACEHOLDER } from './constantes/constantes';

describe('Render', () => {

  test('renders learn react link', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText(/learn/i)).toBeInTheDocument();
  });

});

describe('Functions', () => {
  const search = "", state = "", hash = "";

  test('locationToMovieType', () => {
    expect(locationToMovieType({ pathname: "/search/sqdkjkdsq", search, state, hash })).toBe("search");
    expect(locationToMovieType({ pathname: "/toprated", search, state, hash })).toBe("toprated");
    expect(locationToMovieType({ pathname: "/nowplaying", search, state, hash })).toBe("nowplaying");
    expect(locationToMovieType({ pathname: "/upcoming", search, state, hash })).toBe("upcoming");
  });

  test('getBackdropFullURL', () => {
    expect(getBackdropFullURL("/testurl.png")).toBe(IMAGE_URL_TMDB + "/testurl.png");
    expect(getBackdropFullURL()).toBe(URL_PLACEHOLDER);
  });
});





