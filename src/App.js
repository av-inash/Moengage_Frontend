// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./component/LoginPage";
import SignUpPage from "./component/SignUpPage";
import BreweryPage from './component/BreweryPage';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<BreweryPage />} />


        </Routes>
      </Router>

    </div>
  );
}

export default App;
