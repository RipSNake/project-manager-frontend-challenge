import './App.css';

import { BrowserRouter as Router,
  Route,
  Switch } from 'react-router-dom';

// components
import HomeScreen from './screens/HomeScreen';
import ProjectScreen from './screens/ProjectScreen';
import PageNotFound from './screens/PageNotFoundScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/new" component={ProjectScreen}/>
          <Route path="/edit">
            <ProjectScreen />
          </Route>
          <Route exact path="/" component={HomeScreen}/>
          <Route path='*' component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
