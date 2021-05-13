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

import { post_recommandation, get_first_5_as_string } from './service/APIService';
import { MainMenu } from './components/navigation/MainMenu';


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
              call={get_first_5_as_string}>
                 {(data: Array<any>) => { return <TrackScrollableList data={data} onSelect={(trackId) => {console.log(trackId);}}/> }} 
                </SearchBar>

            </Route>
            
            <Route path='/form'>
                <RecommandationForm call={post_recommandation}/>
            </Route>
            
            <Route path="/">
              <MainMenu />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
