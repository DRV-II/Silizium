import React from 'react';
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import Inicio from './pages/Inicio';
import Certificados from './pages/Certificados';
import Bookmark from './pages/Bookmark';
import EmpleadoPage from './pages/EmpleadoPage';
import QR from './pages/QR';
import TokenPage from './pages/TokenPage';
import TokenPage2 from './pages/TokenPage2';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/LoginPage" element={<LoginPage/>} />
          <Route path="/Inicio" element={<Inicio/>} />
          <Route path="/" element={<Certificados/>} />
          <Route path="/Bookmark" element={<Bookmark/>} />
          <Route path="/Empleado" element={<EmpleadoPage/>} />
          <Route path="/QR" element={<QR/>} />
          <Route path="/TokenPage" element={<TokenPage/>} />
          <Route path="/TokenPage2" element={<TokenPage2/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
