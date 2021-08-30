import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { About, Footer, Home, Navigation, Upload } from './components';


function App() {
  return (
    <div className="App">
      <Router basename="/epcis">
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/upload" exact component={() => <Upload />} />
          <Route path="/about" exact component={() => <About />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
