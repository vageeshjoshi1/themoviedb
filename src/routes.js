import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navigate, Route, Routes } from 'react-router';
import PrivateRoute from './PrivateRoute';
import AllMovies from './components/AllMovies';
import Login from './components/Login';

const ComponentRoutes = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            exact
            element={
              <PrivateRoute>
                <AllMovies />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default ComponentRoutes;
