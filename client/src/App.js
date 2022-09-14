import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './components/Landing Page/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Create from './components/CreateGame/Create1';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path='/videogames/:id' component={Detail} />
        <Route path='/createvideogame' component={Create} />
      </div>
    </Router>
  );
}

export default App;
