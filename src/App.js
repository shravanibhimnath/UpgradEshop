import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        {/* Add other routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;
