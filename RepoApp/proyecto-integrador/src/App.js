import React from 'react';
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import Inicio from './pages/Inicio';
import Certificados from './pages/Certificados';
import EmpleadoPage from './pages/EmpleadoPage';
import QR from './pages/QR';
import TokenPage from './pages/TokenPage';
import TokenPage2 from './pages/TokenPage2';
import RegistrarUsuario from './pages/RegistrarUsuario';
import DesactivarUsuario from './pages/DesactivarUsuario';
import BookmarkPage from './pages/Bookmark';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/LoginPage" element={<LoginPage/>} />
          <Route path="/Inicio" element={<Inicio/>} />
          <Route path="/" element={<Certificados/>} />
          <Route path="/Bookmark" element={<BookmarkPage/>} />
          <Route path="/Empleado/:id" element={<EmpleadoPage/>} />
          <Route path="/QR" element={<QR/>} />
          <Route path="/TokenPage" element={<TokenPage/>} />
          <Route path="/TokenPage2" element={<TokenPage2/>} />
          <Route path="/UserRegistration" element={<RegistrarUsuario/>} />
          <Route path="/DeactivateUser" element={<DesactivarUsuario/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
