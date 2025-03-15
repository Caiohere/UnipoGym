import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from './Components/Login/Login';
import Gerador from './Components/Generator/Gerador';
import './App.css'


function App() {
  console.log('Login:', Login);
  console.log('Gerador:', Gerador);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/gerador" element={<Gerador />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
