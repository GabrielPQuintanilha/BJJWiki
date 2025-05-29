import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
  );
}

export default App;