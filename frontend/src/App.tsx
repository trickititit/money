import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="assets/stocks" element={<div>Stocks Page</div>} />
              <Route path="assets/real-estate" element={<div>Real Estate Page</div>} />
              <Route path="assets/crypto" element={<div>Crypto Page</div>} />
              <Route path="assets/cash" element={<div>Cash Page</div>} />
              <Route path="assets/precious-metals" element={<div>Precious Metals Page</div>} />
              <Route path="transactions" element={<div>Transactions Page</div>} />
              <Route path="analytics" element={<div>Analytics Page</div>} />
              <Route path="planning" element={<div>Planning Page</div>} />
              <Route path="settings" element={<div>Settings Page</div>} />
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
