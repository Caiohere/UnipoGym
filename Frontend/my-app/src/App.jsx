import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { useState } from 'react';
import Login from './Components/Login/Login';
import Gerador from './Components/Generator/Gerador';
import './App.css'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

          <Route element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route path="/gerador" element={<Gerador />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
