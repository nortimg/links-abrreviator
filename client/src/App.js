import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'materialize-css'
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/auth.context';

function App() {
  const { token, login, logout, userID } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  console.log(isAuthenticated)
  return (
    <AuthContext.Provider value={{
      token, login, logout, userID, isAuthenticated
    }}>
      <Router>
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App
