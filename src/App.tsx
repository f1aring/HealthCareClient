import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import DoctorList from './pages/DoctorList';
import Pharmacy from './pages/Pharmacy';
import Doctor from './pages/Doctor';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<PrivateRoute Component={HomePage} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/doctors/:id" element={<Doctor />} />
            <Route path="/pharmacy" element={<Pharmacy />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
