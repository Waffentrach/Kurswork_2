
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MedicinesPage from './pages/MedicinesPage';
import ReportsPage from './pages/ReportsPage';
import NavBar from './components/NavBar';
import './App.css';

const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/medicines" element={<MedicinesPage />} />
                <Route path="/reports" element={<ReportsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
