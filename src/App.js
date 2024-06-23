// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./component/LoginPage";
import SignUpPage from "./component/SignUpPage";
import BreweryPage from './component/BreweryPage';
import Layout from './Layout';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<BreweryPage />} />
          </Route>


        </Routes>
      </Router>

    </div>
  );
}

export default App;
