import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import Copyright from './app/components/Copyright';
import MovieCard from './app/components/MovieCard';
import MovieDialogue from './app/components/MovieDialogue';
import Home from './app/pages/Home';
import Login from './app/pages/Login';
import { APP_TITLE, IMAGE_URL_TMDB, LOGIN_TITLE, MY_NAME, URL_PLACEHOLDER_BACKDROP, URL_PLACEHOLDER_POSTER } from './constantes/constantes';
import { GENRE_TEST, MOVIE_TEST } from './constantes/testConstantes';
import { getBackdropFullURL, getPosterFullURL, locationToMovieType } from './functions/helperFunctions';
import { store } from './redux/store';
import { MemoryRouter, Route } from 'react-router-dom';

const RenderWithRouter = ({ children }: { children: JSX.Element }) => (
  <MemoryRouter initialEntries={['search/test']}>
    <Route path="search/:searchText">{children}</Route>
  </MemoryRouter>
);

jest.mock('react-text-truncate', () => {
  return ({ text }: { text: string }) => <div>{text}</div>
})

// jest.mock('react-router', () => ({
//   ...jest.requireActual("react-router") as {},
//   useParams: jest.fn().mockImplementation(() => ({
//     searchText: 'test',
//   })),
//   useLocation: jest.fn().mockImplementation(() => ({
//     pathname: '/toprated',
//   }))
// }));

describe('Render App', () => {

  test('Render <App />', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByText(LOGIN_TITLE)).toBeInTheDocument();
  });

});


describe('Render Components', () => {

  beforeEach(() => {
    // window.gapi = GAPI_MOCK_TEST;
    // window.gapi.auth2 = GAPI_MOCK_TEST.auth2;
    // window.gapi.load = GAPI_MOCK_TEST.load;
    // window.gapi.auth2.init = GAPI_MOCK_TEST.auth2.init; 
  });

  afterEach(() => {
  });

  test('Render <MovieCard/>', () => {
    const { getByText } = render(<MovieCard movie={MOVIE_TEST} genre={GENRE_TEST} />);
    expect(getByText(MOVIE_TEST.title)).toBeInTheDocument();
  });

  test('Render <MovieDialogue/>', () => {
    const { getByText } = render(<MovieDialogue movie={MOVIE_TEST} genre={GENRE_TEST} open={true} onClose={() => { }} />);
    expect(getByText(MOVIE_TEST.title)).toBeInTheDocument();
  });

  test('Render <Copyright/>', () => {
    const { getByText } = render(<Copyright />);
    expect(getByText(MY_NAME)).toBeInTheDocument();
  });

  test('Render <Login/>', () => {
    const { getByText } = render(<Provider store={store}>
      <Login />
    </Provider>);
    expect(getByText(LOGIN_TITLE)).toBeInTheDocument();
  });

  test('Render <Home/>', () => {
    const { getByTestId } = render(<Provider store={store}>
      <RenderWithRouter>
        <Home />
      </RenderWithRouter>
    </Provider>);
    expect(getByTestId("MenuIcon")).toBeInTheDocument();
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
    expect(getBackdropFullURL()).toBe(URL_PLACEHOLDER_BACKDROP);
  });

  test('getPosterFullURL', () => {
    expect(getPosterFullURL("/testurl.png")).toBe(IMAGE_URL_TMDB + "/testurl.png");
    expect(getPosterFullURL()).toBe(URL_PLACEHOLDER_POSTER);
  });

});





