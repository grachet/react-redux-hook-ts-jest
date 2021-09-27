import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect
} from "react-router-dom";
import { useAppSelector } from './redux/hooks';
import Home from './app/pages/home/Home';
import Login from './app/pages/login/Login';
import { selectAuth } from './features/auth/authSlice';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF0000',
    },
    secondary: {
      main: '#fff',
    },
  },
});

function App() {

  const account = useAppSelector(selectAuth);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/login">
            {!!account && <Redirect to='/toprated' />}
            <Login />
          </Route>
          <Route path="/search/:searchText">
            {!account && <Redirect to='/login' />}
            <Home />
          </Route>
          <Route path="/toprated">
            {!account && <Redirect to='/login' />}
            <Home />
          </Route>
          <Route path="/nowplaying">
            {!account && <Redirect to='/login' />}
            <Home />
          </Route>
          <Route path="/upcoming">
            {!account && <Redirect to='/login' />}
            <Home />
          </Route>
          <Route path="/">
            <Redirect to='/toprated' />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
