import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from 'pages/Main';
import Decision from 'pages/Decision';

const AppRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/decision" element={<Decision />} />
  </Routes>
);

export default AppRouter;
