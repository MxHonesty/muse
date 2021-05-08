import logo from './logo.svg';
import './App.css';

import { TestClass } from './components/class_boilerplate';
import { Player } from './components/Player';
import { BrowserRouter as Router,
  Switch,
  Route,
 } from 'react-router-dom';
import { SearchBar } from './components/search/SearchBar';
import { TrackScrollableList } from './components/search/TrackScrollableList';
import { RecommandationForm } from './components/RecommandationForm';


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
            <Route path="/search">

              <SearchBar
              call={async (name)=>{
                let res = await fetch(`http://127.0.0.1:8000/api/song/?track_name=${name}&nr=10`);
                let text = await res.text();
                return text;
                }}>
                 {(data: Array<any>) => { return <TrackScrollableList data={data} onSelect={(trackId) => {console.log(trackId);}}/> }} 
                </SearchBar>

            </Route>
            
            <Route path='/form'>
                <RecommandationForm/>
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
