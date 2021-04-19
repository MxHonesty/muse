import logo from './logo.svg';
import './App.css';

import { TestClass } from './components/class_boilerplate';
import { Player } from './components/spotify_player';
import { BrowserRouter as Router,
  Switch,
  Route,
 } from 'react-router-dom';
 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/test">
              <TestClass />
            </Route>
            <Route path="/player">
              <Player uri="spotify:track:1nJE8TEWK9hf9Bl0pekJCi"/>
            </Route>
            <Route path="/">
              <img src={logo} className="App-logo" alt="logo" />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
