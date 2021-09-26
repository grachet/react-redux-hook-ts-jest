import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect
} from "react-router-dom";
import './App.css';
import { useAppSelector } from './app/hooks';
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
            {!!account && <Redirect to='/home' />}
            <Login />
          </Route>
          <Route path="/home">
            {!account && <Redirect to='/login' />}
            <Home />
          </Route>
          <Route path="/explore">
            {!account && <Redirect to='/login' />}
            <Home />
          </Route>
          <Route path="/subscription">
            {!account && <Redirect to='/login' />}
            <Home />
          </Route>
          <Route path="/">
            <Redirect to='/home' />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
